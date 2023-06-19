import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import '../styles/MoviesGrid.css';

// importanto as variaveis de ambiente 
// @ts-ignore
const moviesURL = import.meta.env.VITE_API;
// @ts-ignore
const apiKey = import.meta.env.VITE_API_KEY;

export interface IMovieObj {
  adult: boolean
  backdrop_path: string
  genre_id: number[]
  id: number
  original_languege: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}


export interface IApiMovie {
  results: IMovieObj[]
}


const Home = () => {
  // gerenciamento de estado
  const [topMovies, setTopMovies] =  useState<IMovieObj[]>([]);

  const getTopRatedMovies = async (url) => {

    const response = await fetch(url);
    const { results }: IApiMovie = await response.json();

    setTopMovies(results);
  }

  useEffect(() => {
    const topRatedURL = `${moviesURL}top_rated?${apiKey}`
    getTopRatedMovies(topRatedURL);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        { topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie}/> )}
      </div>
    </div>
  )
}

export default Home;
