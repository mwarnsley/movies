import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css';

class SearchBar extends Component {
    state = {
        searchValue: ''
    };
    timeout = null;
    doSearch = e => {
        const { callback } = this.props;
        const searchValue = e.target.value;

        this.setState({
            searchValue
        });

        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            callback(searchValue);
        }, 500);
    };
    render() {
        const { searchValue } = this.state;
        return (
            <div className="rmdb-searchbar">
                <div className="rmdb-searchbar-content">
                    <FontAwesome
                        className="rmdb-fa-search"
                        name="search"
                        size="2x"
                    />
                    <input
                        className="rmdb-searchbar-input"
                        placeholder="Search"
                        onChange={this.doSearch}
                        type="text"
                        value={searchValue}
                    />
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    callback: PropTypes.func.isRequired
};

export default SearchBar;
