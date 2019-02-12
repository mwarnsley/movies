import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import ReactMovieLogo from '../../../images/reactMovie_logo.png';
import RMDBLogo from '../../../images/tmdb_logo.png';

const Header = () => {
    return (
        <div className="rmdb-header">
            <div className="rmdb-header-content">
                <Link to="/">
                    <img
                        alt="rmdb-logo"
                        className="rmdb-logo"
                        src={ReactMovieLogo}
                    />
                </Link>
                <img
                    alt="tmdb-logo"
                    className="rmdb-tmdb-logo"
                    src={RMDBLogo}
                />
            </div>
        </div>
    );
};

export default Header;
