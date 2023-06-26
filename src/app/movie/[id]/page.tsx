'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTicketQuantity } from '@/redux/features/cart';
import styles from './page.module.css'
import Image from 'next/image'
import { Movie, Review } from '@/types/movie';
import { Loading } from '@/components/loading/Loading';
import {  genresMapping, getMovie, getReviewForMovie } from '@/services/movies';





const MoviePage = ({ params }: { params: { id: number } }) => {
  const [movie, setMovie] = useState<Movie | null>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const id = `${params.id}`;
  const ticketQuantity = useSelector(state => state.cart[id] || 0);
  const dispatch = useDispatch();
  const isMinusDisabled = ticketQuantity === 0;
  const isPlusDisabled = ticketQuantity === 30;
  
  useEffect(() => {
    if (id) {
      getMovie(id)
      .then((res)=>{
        setMovie(res);
      });
    getReviewForMovie(id)
      .then((res)=>{
        setReviews(res);
      });
    

      
    }
  }, [id]);


  const handleTicketIncrement = () => {
    dispatch(setTicketQuantity({ movieId: id, quantity: ticketQuantity + 1 }));
  };

  const handleTicketDecrement = () => {
    if (ticketQuantity > 0) {
      dispatch(setTicketQuantity({ movieId: id, quantity: ticketQuantity - 1 }));
    }
  };

  if (!movie) {
    return <Loading></Loading>;
  }

  return (
    <div className={styles.movieContent}>
      <div className={styles.movieCard}>
        <img src={movie.posterUrl} alt={movie.title} className={styles.moviePoster} />
        <div className={styles.movieDescriptionAll}>
          <div className={styles.movieTitleContent}>
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <div className={styles.ticketContent}>
              <button
                onClick={handleTicketDecrement}
                disabled={isMinusDisabled}
                className={`${styles.ticketButton} ${isMinusDisabled ? styles.disabled : ''}`}
              >
                -
              </button>
              <p>{ticketQuantity}</p>
              <button
                onClick={handleTicketIncrement}
                disabled={isPlusDisabled}
                className={`${styles.ticketButton} ${isPlusDisabled ? styles.disabled : ''}`}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.mainDescription}>
            <p className={styles.mainOption}>Жанр: <span>{genresMapping[movie.genre]}</span></p>
            <p className={styles.mainOption}>Год выпуска: <span>{movie.releaseYear}</span></p>
            <p className={styles.mainOption}>Рейтинг: <span>{movie.rating}</span></p>
            <p className={styles.mainOption}>Режиссер: <span>{movie.director}</span></p>
          </div>
          <div className={styles.movieDescription}>
            <p>Описание</p>
            <span>{movie.description}</span>
          </div>
        </div>
      </div>
    <div className={styles.reviewCard}>
      {reviews.length > 0 ? (
        <ul className={styles.reviewContent}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.review}>
              <div className={styles.reviewAvatar}>
                <Image
                  src="/img/photo.svg"
                  width={32}
                  height={32}
                  alt="Picture of the author"
              />
              </div>
              <div className={styles.reviewText}>
                <div className={styles.reviewTitle}>
                  <h2>{review.name}</h2>
                  <p>Оценка: <span>{review.rating}</span></p>
                </div>
                <span>{review.text}</span>
              </div> 
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет отзывов для этого фильма.</p>
      )}
    </div>
  </div>
  );
};

export default MoviePage;
