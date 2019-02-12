import React from 'react';
import PropTypes from 'prop-types';
import './MovieThumb.css';

const MovieThumb = ({ image }) => {
    return (
        <div className="rmdb-moviethumb">
            <img alt="moviethumb" src={image} />
        </div>
    );
};

MovieThumb.propTypes = {
    image: PropTypes.string.isRequired
};

export default MovieThumb;
