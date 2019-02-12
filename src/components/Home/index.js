import React, { Component } from 'react';
import HeroImage from '../elements/HeroImage';
import SearchBar from '../elements/SearchBar';
import FourColGrid from '../elements/FourColGrid';
import MovieThumb from '../elements/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn';
import Spinner from '../elements/Spinner';

import './Home.css';

import map from 'lodash/map';

const popularEndpoint = `${
    process.env.REACT_APP_API_URL
}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

const NoImageFound = '/images/no_image.jpg';

class Home extends Component {
    state = {
        currentPage: 0,
        heroImage: null,
        isLoading: false,
        movies: [],
        searchTerm: '',
        totalPages: 0
    };
    componentDidMount = () => {
        this.setState({ isLoading: true });
        this.fetchItems(popularEndpoint);
    };
    searchItems = searchTerm => {
        let endpoint = '';
        this.setState({
            isLoading: true,
            movies: [],
            searchTerm
        });

        if (searchTerm === '') {
            endpoint = popularEndpoint;
        } else {
            endpoint = `${process.env.REACT_APP_API_URL}search/movie?api_key=${
                process.env.REACT_APP_API_KEY
            }&language=en-US&query=${searchTerm}`;
        }
        this.fetchItems(endpoint);
    };
    loadMoreItems = () => {
        const { currentPage, searchTerm } = this.state;
        let endpoint = '';

        this.setState({ isLoading: true });

        if (searchTerm === '') {
            endpoint = `${process.env.REACT_APP_API_URL}movie/popular?api_key=${
                process.env.REACT_APP_API_KEY
            }&language=en-US&page=${currentPage + 1}`;
        } else {
            endpoint = `${process.env.REACT_APP_API_URL}search/movi?api_key=${
                process.env.REACT_APP_API_KEY
            }&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
        }
        this.fetchItems(endpoint);
    };
    fetchItems = endpoint => {
        fetch(endpoint)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    currentPage: res.page,
                    heroImage: this.state.heroImage || res.results[0],
                    isLoading: false,
                    movies: [...this.state.movies, ...res.results],
                    totalPages: res.total_pages
                });
            })
            .catch(error => console.error(error));
    };
    render() {
        const {
            currentPage,
            heroImage,
            isLoading,
            movies,
            searchTerm,
            totalPages
        } = this.state;
        return (
            <div className="rmdb-home">
                {heroImage && (
                    <div>
                        <HeroImage
                            image={`${process.env.REACT_APP_IMAGE_BASE_URL}${
                                process.env.REACT_APP_BACKDROP_SIZE
                            }${heroImage.backdrop_path}`}
                            text={heroImage.overview}
                            title={heroImage.original_title}
                        />
                        <SearchBar callback={this.searchItems} />
                    </div>
                )}
                <div className="rmdb-home-grid">
                    <FourColGrid
                        header={searchTerm ? 'Search Result' : 'Popular Movies'}
                        isLoading={isLoading}
                    >
                        {map(movies, movie => {
                            return (
                                <MovieThumb
                                    clickable
                                    image={
                                        movie.poster_path
                                            ? `${
                                                  process.env
                                                      .REACT_APP_IMAGE_BASE_URL
                                              }${
                                                  process.env
                                                      .REACT_APP_POSTER_SIZE
                                              }${movie.poster_path}`
                                            : NoImageFound
                                    }
                                    key={movie.id}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            );
                        })}
                    </FourColGrid>
                    {isLoading && <Spinner />}
                    {currentPage <= totalPages && !isLoading && (
                        <LoadMoreBtn
                            onClick={this.loadMoreItems}
                            text="Load More"
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
