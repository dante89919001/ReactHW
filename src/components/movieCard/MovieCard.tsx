import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MovieCard.module.css';
import Link from 'next/link';
import { setTicketQuantity } from '@/redux/features/cart';
import Image from 'next/image'
import { Movie } from '@/types/movie';



interface MovieCardProps {
  movie: Movie;
  genresMapping: { [key: string]: string };
  quantity: number; 
  showCloseIcon: boolean;
  onClose: (movieId: string) => void;
  isFullWidth: boolean;
}



const MovieCard: React.FC<MovieCardProps> = ({ movie, genresMapping, quantity,showCloseIcon, onClose, isFullWidth = false }) => {
  const dispatch = useDispatch();
  const ticketQuantity = useSelector((state:any) => state.cart[movie.id] || 0);
  const isMinusDisabled = ticketQuantity === 0;
  const isPlusDisabled = ticketQuantity === 30;

  const handleTicketIncrement = () => {
    dispatch(setTicketQuantity({ movieId: movie.id, quantity: ticketQuantity + 1 }));
  };

  const handleTicketDecrement = () => {
    if (ticketQuantity > 1) {
      dispatch(setTicketQuantity({ movieId: movie.id, quantity: ticketQuantity - 1 }));
    }
    if(ticketQuantity === 1 ){
      onClose(movie.id); 
    }
  };

  const handleCloseClick = () => {
    if (onClose) {
      onClose(movie.id); 
    }
  };

  
  
  return (
    <div className={`${styles.movieCard}`}>
      <Link href={`/movie/${movie.id}`}>
        <Image src={movie.posterUrl} alt={movie.title}  width ={100} height ={120} className={styles.movieImg}/>
      </Link>
      <div className={styles.movieCardContent}>
        <div className={styles.titleContainer}>
          <Link href={`/movie/${movie.id}`}> <h4 className={styles.movieTitle}>{movie.title}</h4>    </Link>
            <p className={styles.movieSubTitle}>{genresMapping[movie.genre]}</p>
        </div>
        <div className={styles.ticketContent}>
          <button onClick={handleTicketDecrement} disabled={isMinusDisabled} className={`${styles.ticketButton} ${isMinusDisabled ? styles.disabled : ''}`}>
            -
          </button>
          <p>{ticketQuantity}</p>
          <button onClick={handleTicketIncrement} disabled={isPlusDisabled} className={`${styles.ticketButton} ${isPlusDisabled ? styles.disabled : ''}`}>
            +
          </button>
         
        </div>
        {showCloseIcon && (
        <div className={styles.closeButton} onClick={handleCloseClick}>
          <Image src="./img/close.svg" alt="Description of the image" width={12.5} height={12.5} />
        </div>
      )}
      </div>
    </div>
  );
};

export default MovieCard;
