import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Genre.module.css';
import { genresMapping } from '@/services/movies';
import Image from 'next/image';

interface GenreDropdownProps {
  selectedGenre: string;
  genres: string[];
  onSelectGenre: (genre: string) => void;
  isGenreDropdownOpen: boolean;
  toggleGenreDropdown: () => void;
}

const GenreDropdown: React.FC<GenreDropdownProps> = ({
  selectedGenre,
  genres,
  onSelectGenre,
  isGenreDropdownOpen,
  toggleGenreDropdown,
}) => {
  const isAllGenresSelected = selectedGenre === ''

  const genreDropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement; 
      if (
        genreDropdownRef.current &&
        !genreDropdownRef.current.contains(target) &&
        !target.classList.contains(styles.dropdownToggle)
      ) {
        toggleGenreDropdown();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [toggleGenreDropdown]);

  const selectGenre = (genre: string) => {
    onSelectGenre(genre);
    toggleGenreDropdown();
  };

  const renderGenreDropdown = () => {
    if (!isGenreDropdownOpen) return null;

    return ReactDOM.createPortal(
      <ul className={styles.dropdownMenu} ref={genreDropdownRef}>
        <li onClick={() => selectGenre('')}>
          <span className={!selectedGenre ? styles.grayText : ''}>Все жанры</span>
        </li>
        {genres.map((genre) => (
          <li key={genre} onClick={() => selectGenre(genre)}>
            <span className={selectedGenre === genre ? styles.blackText : ''}>
              {genresMapping[genre]}
            </span>
          </li>
        ))}
      </ul>,
      document.getElementById('genre-dropdown-container')!
    );
  };

  return (
    <div className={styles.select}>
      <label>Жанр:</label>
      <div className={styles.dropdown}>
        <div
          className={isGenreDropdownOpen ? `${styles.dropdownToggle} ${styles.dropdownToggleOn} ` : `${styles.dropdownToggle} ${styles.dropBorder}` }
          onClick={toggleGenreDropdown}
        >
          {selectedGenre ? genresMapping[selectedGenre] : 'Все жанры'}
          <div className={`${styles.dropdownArrow}`}>
          <Image
            src="./img/arrowDown.svg"
            alt="arrowDown"
            width={20}
            height={20}
            className={`${isGenreDropdownOpen ? `${styles.rotate}` : ''}`}
          />
      
          </div>
        </div>
        <div id="genre-dropdown-container"></div>
        {renderGenreDropdown()}
      </div>
    </div>
  );
};

export default GenreDropdown;