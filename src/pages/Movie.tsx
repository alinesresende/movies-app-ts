import { useEffect, useState } from 'react';
import {
  BsFillFileEarmarkTextFill,
  BsGraphUp,
  BsHourglassSplit,
  BsWallet2
} from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import MovieCard from '../components/MovieCard';
import '../styles/Movie.css';

// @ts-ignore
const moviesURL = import.meta.env.VITE_API;

// @ts-ignore
const apiKey = import.meta.env.VITE_API_KEY;

export interface IMovie {
  poster_path: string
  title: string
  vote_average: string
  id: number
  tagline: string
  budget: number
  revenue: number
  runtime: number
  overview: string
}

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie | null>(null);

  const getMovie = async (url: string) => {

    const response = await fetch(url);
    const data: IMovie = await response.json();

    setMovie(data);
  }

  const formatCurrency = (number) => {
    return number.toLocaleString('en-US', {
      style: "currency",
      currency: "USD"
    })
  }

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieURL);
  }, [id]);

  return (
    <div className="movie-page">
      {movie && (
        <>
        <MovieCard movie={movie} showLink={false} />
        <p className="tagline"> {movie.tagline} </p>
        <div className="info">
          <h3>
            <BsWallet2 /> Orçamento:
          </h3>
          <p>{formatCurrency(movie.budget)}</p>
        </div>
        <div className="info">
          <h3>
            <BsGraphUp /> Faturamento:
          </h3>
          <p>{formatCurrency(movie.revenue)}</p>
        </div>
        <div className="info">
          <h3>
            <BsHourglassSplit /> Duração:
          </h3>
          <p>{movie.runtime} minutos</p>
        </div>
        <div className="info description">
          <h3>
            <BsFillFileEarmarkTextFill /> Descrição:
          </h3>
          <p>{movie.overview}</p>
        </div>
        </>
      )}
    </div>
  )
}

export default Movie;
