import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import MovieThumb from '../MovieThumb';
import './MovieInfo.css';

import map from 'lodash/map';

const NoImageFound = '/images/no_image.jpg';

const MovieInfo = ({ directors, movie }) => {
    return (
        <div
            className="rmdb-movieinfo"
            style={{
                background: movie.backdrop_path
                    ? `url('${process.env.REACT_APP_IMAGE_BASE_URL}${
                          process.env.REACT_APP_BACKDROP_SIZE
                      }${movie.backdrop_path})`
                    : '#000000'
            }}
        >
            <div className="rmdb-movieinfo-content">
                <div className="rmdb-movieinfo-thumb">
                    <MovieThumb
                        image={
                            movie.poster_path
                                ? `${process.env.REACT_APP_IMAGE_BASE_URL}${
                                      process.env.REACT_APP_POSTER_SIZE
                                  }${movie.poster_path}`
                                : NoImageFound
                        }
                    />
                </div>
                <div className="rmdb-movieinfo-text">
                    <h1>{movie.title}</h1>
                    <h3>PLIT</h3>
                    <p>{movie.overview}</p>
                    <h3>IMDB RATING</h3>
                    <div className="rmdb-rating">
                        <meter
                            high="70"
                            low="40"
                            max="100"
                            min="0"
                            optimum="100"
                            value={movie.vote_average * 10}
                        />
                        <p className="rmdb-score">{movie.vote_average}</p>
                    </div>
                    {directors.length > 1 ? (
                        <h3>DIRECTORS</h3>
                    ) : (
                        <h3>DIRECTOR</h3>
                    )}
                    {map(directors, (director, i) => (
                        <p className="rmdb-director" key={i}>
                            {director.name}
                        </p>
                    ))}
                </div>
                <FontAwesome className="fa-film" name="film" size="5x" />
            </div>
        </div>
    );
};

MovieInfo.propTypes = {
    directors: PropTypes.arrayOf(PropTypes.object).isRequired,
    movie: PropTypes.object.isRequired
};

export default MovieInfo;
