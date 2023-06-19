import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

// @ts-ignore
const searchURL = import.meta.env.VITE_SEARCH;
// @ts-ignore
const apiKey = import.meta.env.VITE_API_KEY;

import '../styles/MoviesGrid.css';
import { IApiMovie, IMovieObj } from './Home';

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] =  useState<IMovieObj[]>([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url: string) => {

    const response = await fetch(url);
    const {results }:  IApiMovie = await response.json();
    setMovies(results);
  }

  useEffect(() => {
    const searchQueryURL = `${searchURL}?${apiKey}&query=${query}`
    getSearchedMovies(searchQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">Resultads para: 
        <span className="query-text">
          {query}
        </span>
      </h2>
      <div className="movies-container">
      {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Search;