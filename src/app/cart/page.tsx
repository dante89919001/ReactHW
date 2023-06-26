'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { selectTicketQuantities, setTicketQuantity } from '@/redux/features/cart';
import MovieCard from '@/components/movieCard/MovieCard';
import { StoreProvider } from '@/redux/services/StoreProvider';
import styles from './page.module.css';
import Image from 'next/image';
import { genresMapping, getMovies } from '@/services/movies';
import { Movie } from '@/types/movie';
import { Loading } from '@/components/loading/Loading';
import { Modal } from '@/components/modal/Modal';
import MovieCardList from '@/components/movieCard/movieCardList/MovieCardList';


const CartPage: React.FC = () => {
  const ticketQuantities: { [key: string]: number } = useSelector(selectTicketQuantities);
  const totalTicketQuantity = Object.values(ticketQuantities).reduce((acc: number, cur: number) => acc + cur, 0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const dispatch = useDispatch();

  const handleCloseMovieCard = (movieId: string) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getMovies().then((res=>{
      setMovies(res)
      setIsLoading(false)
    }));
  }, []);
  


  const handleDeleteMovie = (movieId: string) => {
      setSelectedMovieId(movieId);
  };

  const handleDeleteMovieConfirmed = () => {
    dispatch(setTicketQuantity({ movieId: selectedMovieId, quantity: 0 }));
    setSelectedMovieId(null);
    setIsModalOpen(false);
  };

  const moviesWithTickets = movies.filter((movie) => ticketQuantities[movie.id] > 0);


  return (
    <div className={styles.cartWrapper}>
      {isLoading ? (<Loading /> ) : moviesWithTickets.length === 0 ? (<p>Ваша корзина пуста</p>) : (
        <div className={styles.cardsAndTotal}>
          <div className={styles.cartContent}>
            <MovieCardList movies={moviesWithTickets} selectedCinema={''} selectedGenre={''} searchTitle={''}  cinemas={[]} genresMapping={genresMapping} onClose={handleCloseMovieCard} showCloseIcon={true}   />
          </div>
          <div className={styles.totalTicketQuantity}>
            <h2>Итого билетов:</h2>
            <p>{totalTicketQuantity}</p>
          </div>
        </div>
      )}
      {isModalOpen && selectedMovieId && (
        <Modal onClose={() => setIsModalOpen(false)} onConfirm={handleDeleteMovieConfirmed} />
      )}
    </div>
  );
};

const CartPageWrapper: React.FC = () => (
  <StoreProvider>
    <CartPage />
  </StoreProvider>
);

export default CartPageWrapper;
