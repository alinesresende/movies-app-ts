import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IMovieObj } from 'src/pages/Home';
import { IMovie } from 'src/pages/Movie';

// @ts-ignore
const imageURL = import.meta.env.VITE_IMG;

interface IMovieCard {
  showLink?: boolean
  movie: IMovieObj | IMovie
}

const MovieCard = ({movie, showLink = true}: IMovieCard) => {
  return (
    <div className="movie-card">
      <img 
        src={`${imageURL}${movie.poster_path}`} 
        alt={movie.title} 
      />
      <h2>
        {movie.title}
      </h2>
      <p> 
        <FaStar /> {movie.vote_average}
      </p>
        {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  )
}



export default MovieCard;