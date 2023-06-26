import { Cinema, Movie, Review } from '@/types/movie';
import axios from 'axios';

const rootApi = 'http://localhost:3001/api'

const api = axios.create({
    baseURL: rootApi,
  });

export const getMovies = () => {
    return axios
        .get<Movie[]>(`${rootApi}/movies`, {})
        .then((res) => res.data)
};

export const getCinemas = () => {
    return axios
        .get<Cinema[]>(`${rootApi}/cinemas`, {})
        .then((res) => res.data)
};

export const getMoviesFromCinema = (cinemaId:string) => {
    return axios
        .get<Movie[]>(`${rootApi}/movies/${cinemaId}`, {})
        .then((res) => res.data)
};

export const  getMovie =  (id:string) => {
    return axios
        .get<Movie>(`${rootApi}/movie?movieId=${id}`, )
        .then((res) => res.data)
};

export const getAllReviews = () => {
    return axios
        .get<Review[]>(`${rootApi}/reviews`, {})
        .then((res) => res.data);
};

export const getReviewForMovie = (id: string) => {
    return axios
        .get<Review[]>(`${rootApi}/reviews?movieId=${id}`, {})
        .then((res) => res.data);
};


export const genresMapping: { [key: string]: string } = {
  action: 'Боевик',
  comedy: 'Комедия',
  fantasy: 'Фэнтези',
  horror: 'Ужасы',
};