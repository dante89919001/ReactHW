"use client"
import React, { useState, useEffect } from 'react';

import styles from './MainPage.module.css';
import { Cinema, Movie } from '@/types/movie';
import SearchInput from './searchInput/SearchInput';
import GenreDropdown from './genreDropdown/GenreDropdown';
import CinemaDropdown from './cinemaDropdown/CinemaDropdown';
import { genresMapping, getCinemas, getMovies } from '@/services/movies';
import MovieCardList from '../movieCard/movieCardList/MovieCardList';
import { Loading } from '../loading/Loading';




const MainPage: React.FC = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [genres, setGenres] = useState<string[]>(Object.keys(genresMapping));
  const [isCinemaDropdownOpen, setIsCinemaDropdownOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  

  useEffect(() => {
    getCinemas().then((res)=>{
      setCinemas(res)
    });
    getMovies().then((res)=>{
      setMovies(res)
    });;
    setIsLoading(false)
  }, []);



  const toggleCinemaDropdown = () => {
    setIsCinemaDropdownOpen(!isCinemaDropdownOpen);
    setIsGenreDropdownOpen(false);
  };

  const toggleGenreDropdown = () => {
    setIsGenreDropdownOpen(!isGenreDropdownOpen);
    setIsCinemaDropdownOpen(false);
  };

  const isAllGenresSelected = selectedGenre === '';
  const isAllCinemasSelected = selectedCinema === '';

  const selectCinema = (cinemaId: string) => {
    setSelectedCinema(cinemaId);
    setIsCinemaDropdownOpen(false);
  };

  const selectGenre = (genre: string) => {
    setSelectedGenre(genre);
    setIsGenreDropdownOpen(false);
  };

  const handleInput = (value:string) =>{

    setSearchTitle(value)

  }
  
  return (
    <div className={`${styles.content}`}>
      <div className={`${styles.filterWrapper} `}>
        <div className={styles.contentSelectWrapper}>
          <h3>Фильтр поиска</h3>
          <div className={styles.selectWrapper}>
            <div className={styles.select}>
              <label>Название</label>
              <SearchInput onChange={handleInput} placeholder="Введите название" />
            </div>
            <div className={styles.select}>
              <GenreDropdown
                selectedGenre={selectedGenre}
                genres={genres}
                onSelectGenre={selectGenre}
                isGenreDropdownOpen={isGenreDropdownOpen}
                toggleGenreDropdown={toggleGenreDropdown}
              />
            </div>
            <div className={styles.select}>
              <CinemaDropdown
                selectedCinema={selectedCinema}
                cinemas={cinemas}
                onSelectCinema={selectCinema}
                isCinemaDropdownOpen={isCinemaDropdownOpen}
                toggleCinemaDropdown={toggleCinemaDropdown}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.movieCardsWrapper}>
        {isLoading ? <Loading/>: <MovieCardList
          movies={movies}
          selectedCinema={selectedCinema}
          selectedGenre={selectedGenre}
          searchTitle={searchTitle}
          cinemas={cinemas}
          genresMapping={genresMapping} showCloseIcon={false}        />}
       
      </div>
    </div>
  );
};

export default MainPage;
