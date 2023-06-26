import styles from './MovieCardList.module.css'
import React from 'react';
import MovieCard from '../../movieCard/MovieCard';
import { Cinema, Movie } from '@/types/movie';



interface MovieCardListProps {
  movies: Movie[];
  selectedCinema: string;
  selectedGenre: string;
  searchTitle: string;
  cinemas: Cinema[];
  genresMapping: { [key: string]: string };
  showCloseIcon: boolean;
  onClose?: (movieId: string) => void;
}




const MovieCardList: React.FC<MovieCardListProps> = ({
  movies,
  selectedCinema,
  selectedGenre,
  searchTitle,
  cinemas,
  genresMapping,
  showCloseIcon,
  onClose,
}) => {
  const filteredMovies = movies.filter((movie) => {
    const cinemaFilter = selectedCinema.trim();
    const genreFilter = selectedGenre.trim().toLowerCase();
    const titleFilter = searchTitle.trim().toLowerCase();

    return (
      (!cinemaFilter || cinemas.find((cinema) => cinema.id === cinemaFilter)?.movieIds.includes(movie.id)) &&
      (!genreFilter || movie.genre.toLowerCase() === genreFilter) &&
      (!titleFilter || movie.title.toLowerCase().startsWith(titleFilter))
    );
  });

  const sortedMovies = filteredMovies.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className={styles.MovieListContainter}>
      {sortedMovies.map((movie, index) => (
        <MovieCard
          key={index}
          movie={movie}
          quantity={0}
          genresMapping={genresMapping}
          isFullWidth={false}     
   
          showCloseIcon={false||showCloseIcon}
          onClose={(movieId) => {
            if(onClose)
            onClose(movieId)
          }}
        />
      ))}
    </div>
  );
};

export default MovieCardList;
