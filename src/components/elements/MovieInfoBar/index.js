import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { calcTime, convertMoney } from '../../../helpers';
import './MovieInfoBar.css';

const MovieInfoBar = ({ budget, revenue, time }) => {
    return (
        <div className="rmdb-movieinfobar">
            <div className="rmdb-movieinfobar-content">
                <div className="rmdb-movieinfobar-content-col">
                    <FontAwesome className="fa-time" name="clock-o" size="2x" />
                    <span className="rmdb-movieinfobar-info">
                        Running time: {calcTime(time)}
                    </span>
                </div>
                <div className="rmdb-movieinfobar-content-col">
                    <FontAwesome className="fa-budget" name="money" size="2x" />
                    <span className="rmdb-movieinfobar-info">
                        Budget: {convertMoney(budget)}
                    </span>
                </div>
                <div className="rmdb-movieinfobar-content-col">
                    <FontAwesome
                        className="fa-revenue"
                        name="ticket"
                        size="2x"
                    />
                    <span className="rmdb-movieinfobar-info">
                        Revenue: {convertMoney(revenue)}
                    </span>
                </div>
            </div>
        </div>
    );
};

MovieInfoBar.propTypes = {
    budget: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired
};

export default MovieInfoBar;
