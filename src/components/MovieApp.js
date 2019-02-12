import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './elements/Header';
import Home from './Home';
import Movie from './Movie';
import NotFound from './elements/NotFound';

const MovieApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Header />
                <Switch>
                    <Route component={Home} exact path="/" />
                    <Route component={Movie} exact path="/:movieId" />
                    <Route component={NotFound} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default MovieApp;
