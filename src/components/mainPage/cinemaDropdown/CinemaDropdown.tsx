import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Cinema.module.css';
import Image from 'next/image';

interface Cinema {
  id: string;
  name: string;
  movieIds: string[];
}

interface CinemaDropdownProps {
  selectedCinema: string;
  cinemas: { id: string; name: string }[];
  onSelectCinema: (cinemaId: string) => void;
  isCinemaDropdownOpen: boolean;
  toggleCinemaDropdown: () => void;
}

const CinemaDropdown: React.FC<CinemaDropdownProps> = ({
  selectedCinema,
  cinemas,
  onSelectCinema,
  isCinemaDropdownOpen,
  toggleCinemaDropdown,
}) => {
    const selectCinema = (genre: string) => {
        onSelectCinema(genre);
        toggleCinemaDropdown();
      };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        cinemaDropdownRef.current &&
        !cinemaDropdownRef.current.contains(target) &&
        !target.classList.contains(styles.dropdownToggle)
      ) {
        toggleCinemaDropdown();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [toggleCinemaDropdown]);

  const renderCinemaDropdown = () => {
    if (!isCinemaDropdownOpen) return null;

    return ReactDOM.createPortal(
      <ul className={styles.dropdownMenu} ref={cinemaDropdownRef}>
        <li onClick={() => selectCinema('')}>
          <span className={!selectedCinema ? styles.grayText : ''}>Все кинотеатры</span>
        </li>
        {cinemas.map((cinema) => (
          <li key={cinema.id} onClick={() => selectCinema(cinema.id)}>
            <span>{cinema.name}</span>
          </li>
        ))}
      </ul>,
      document.getElementById('cinema-dropdown-container')!
    );
  };

  const cinemaDropdownRef = useRef<HTMLUListElement>(null);

  return (
    <div className={styles.select}>
      <label>Кинотеатр</label>
      <div className={styles.dropdown}>
        <div
          className={isCinemaDropdownOpen ? `${styles.dropdownToggle} ${styles.dropdownToggleOn} ` : `${styles.dropdownToggle} ${styles.dropBorder}` }
          onClick={toggleCinemaDropdown}
        >
          {selectedCinema ? cinemas.find((cinema) => cinema.id === selectedCinema)?.name : 'Все кинотеатры'}
          <div className={`${styles.dropdownArrow} ${isCinemaDropdownOpen ? styles.open : ''}`}>
          <Image
            src="./img/arrowDown.svg"
            alt="arrowDown"
            width={20}
            height={20}
            className={`${isCinemaDropdownOpen ? `${styles.rotate}` : ''}`}
          />
          </div>
        </div>
        <div id="cinema-dropdown-container" />
        {renderCinemaDropdown()}
      </div>
    </div>
  );
};

export default CinemaDropdown;
