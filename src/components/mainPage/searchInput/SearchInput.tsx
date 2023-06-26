import React, { useState, useEffect } from 'react';
import styles from './SearchInput.module.css'
import { useDebounce } from 'use-debounce';
interface SearchInputProps {

  onChange: (value: string) => void;
  placeholder: string;

}

const SearchInput: React.FC<SearchInputProps> = ({  onChange, placeholder}) => {
  const [value, setValue] = useState('');


  //пофиксить поиск
  const [text] = useDebounce(value,100);


  const handleInput = (event:React.ChangeEvent<HTMLInputElement>) =>{
    
      const {value} = event.target as HTMLInputElement
 
      setValue(value); 

      onChange(value);


  }

 


  return <input type="text" value={value} onChange={handleInput} placeholder={placeholder} className={styles.searchInput} />;
};

export default SearchInput;
