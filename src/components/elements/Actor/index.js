import React from 'react';
import PropTypes from 'prop-types';
import './Actor.css';

const NoImageFound = '/images/no_image.jpg';

const Actor = ({ actor }) => {
    const POSTER_SIZE = 'w154';

    return (
        <div className="rmdb-actor">
            <img
                alt="actorThumb"
                src={
                    actor.profile_path
                        ? `${
                              process.env.REACT_APP_IMAGE_BASE_URL
                          }${POSTER_SIZE}${actor.profile_path}`
                        : NoImageFound
                }
            />
            <span className="rmdb-actor-name">{actor.name}</span>
            <span className="rmdb-actor-character">{actor.character}</span>
        </div>
    );
};

Actor.propTypes = {
    actor: PropTypes.object.isRequired
};

export default Actor;
