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
    fetchItems = endpoint => {
        const { match } = this.props;
        fetch(endpoint)
            .then(response => response.json())
            .then(res => {
                if (res.status_code) {
                    this.setState({ isLoading: false });
                } else {
                    this.setState({ movie: res }, () => {
                        const endpoint = `${
                            process.env.REACT_APP_API_URL
                        }movie/${match.params.movieId}/credits?api_key=${
                            process.env.REACT_APP_API_KEY
                        }`;

                        fetch(endpoint)
                            .then(response => response.json())
                            .then(res => {
                                const directors = filter(
                                    res.crew,
                                    member => member.job === 'Director'
                                );
                                this.setState({
                                    actors: res.cast,
                                    directors,
                                    isLoading: false
                                });
                            })
                            .catch(error =>
                                console.error('Error fetching crew: ', error)
                            );
                    });
                }
            })
            .catch(error => console.error('Error fetching movie: ', error));
    };
    render() {
        console.log(this.state);
        return (
            <div className="rmdb-movie">
                <Navigation />
                <MovieInfo />
                <MovieInfoBar />

                <Spinner />
            </div>
        );
    }
}

Movie.propTypes = {
    match: PropTypes.object.isRequired
};

export default Movie;
