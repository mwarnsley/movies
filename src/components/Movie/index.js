import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../elements/Navigation';
import MovieInfo from '../elements/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid';
import Actor from '../elements/Actor';
import Spinner from '../elements/Spinner';
import './Movie.css';

import filter from 'lodash/filter';
import map from 'lodash/map';

class Movie extends Component {
    state = {
        actors: [],
        directors: [],
        isLoading: false,
        movie: null
    };
    componentDidMount = () => {
        this.setState({ isLoading: true });

        const { match } = this.props;
        const endpoint = `${process.env.REACT_APP_API_URL}movie/${
            match.params.movieId
        }?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

        this.fetchItems(endpoint);
    };
    fetchItems = async endpoint => {
        const { match } = this.props;
        try {
            const results = await (await fetch(endpoint)).json();

            if (results.status_code) {
                this.setState({ isLoading: false });
            } else {
                this.setState({ movie: results });

                const creditsEndpoint = `${
                    process.env.REACT_APP_API_URL
                }movie/${match.params.movieId}/credits?api_key=${
                    process.env.REACT_APP_API_KEY
                }`;

                const creditsResults = await (await fetch(
                    creditsEndpoint
                )).json();

                const directors = filter(
                    creditsResults.crew,
                    member => member.job === 'Director'
                );
                this.setState({
                    actors: creditsResults.cast,
                    directors,
                    isLoading: false
                });
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    render() {
        const { actors, directors, isLoading, movie } = this.state;
        const { location } = this.props;
        return (
            <div className="rmdb-movie">
                {movie && (
                    <div>
                        <Navigation movie={location.movieName} />
                        <MovieInfo directors={directors} movie={movie} />
                        <MovieInfoBar
                            budget={movie.budget}
                            revenue={movie.revenue}
                            time={movie.runtime}
                        />
                    </div>
                )}
                {actors && (
                    <div className="rmdb-movie-grid">
                        <FourColGrid header="Actors">
                            {map(actors, (actor, i) => (
                                <Actor actor={actor} key={i} />
                            ))}
                        </FourColGrid>
                    </div>
                )}
                {!actors && !isLoading && <h1>No Movie Found!</h1>}
                {isLoading && <Spinner />}
            </div>
        );
    }
}

Movie.propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

export default Movie;
