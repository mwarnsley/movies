import React from 'react';
import PropTypes from 'prop-types';
import './FourColGrid.css';

import map from 'lodash/map';

const FourColGrid = ({ children, header, isLoading }) => {
    const renderElements = () => {
        return map(children, (element, i) => {
            return (
                <div className="rmdb-grid-element" key={i}>
                    {element}
                </div>
            );
        });
    };

    return (
        <div className="rmdb-grid">
            {header && !isLoading && <h1>{header}</h1>}
            <div className="rmdb-grid-content">{renderElements()}</div>
        </div>
    );
};

FourColGrid.propTypes = {
    children: PropTypes.array.isRequired,
    header: PropTypes.string,
    isLoading: PropTypes.bool
};

export default FourColGrid;
