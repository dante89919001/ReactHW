import { Review } from "@/types/movie"
import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery ({
        baseUrl: 'http://localhost:3001/api/'
    }),
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: () => 'movies'
        }),
        getMoviesFromCinema:builder.query({
            query: (cinemaId) => `movies/${cinemaId}`
        }),
        getMovie: builder.query({
            query: (movieId) => `movie?movieId=${movieId}`
        }),

        getAllReviews:builder.query({
            query: () => `/reviews`,
        }),
        

        getReviewForMovie: builder.query<Review[], string>({
            query: (movieId) => `/reviews?movieId=${movieId}`,
        }),
    })
})

export const {useGetMoviesQuery, useGetMovieQuery, useGetAllReviewsQuery , useGetMoviesFromCinemaQuery, useGetReviewForMovieQuery} = movieApi