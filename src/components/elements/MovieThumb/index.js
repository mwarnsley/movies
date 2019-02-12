import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieThumb.css';

const MovieThumb = ({ clickable, image, movieId, movieName }) => {
    return (
        <div className="rmdb-moviethumb">
            {clickable ? (
                <Link
                    to={{ pathname: `/${movieId}`, movieName: `${movieName}` }}
                >
                    <img alt="moviethumb" src={image} />
                </Link>
            ) : (
                <img alt="moviethumb" src={image} />
            )}
        </div>
    );
};

MovieThumb.propTypes = {
    clickable: PropTypes.bool,
    image: PropTypes.string.isRequired,
    movieId: PropTypes.number,
    movieName: PropTypes.string
};

export default MovieThumb;
