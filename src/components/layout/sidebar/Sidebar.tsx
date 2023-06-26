'use client'

import { useState } from "react";
import  styles  from "./Sidebar.module.css";
import Image from "next/image";
import { useDebounce } from "use-debounce";


type Sidebar = {

}

export const Sidebar:React.FC<Sidebar> = () =>{
    const [value, setValue] = useState('');
    const [text] = useDebounce(value,100);

    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const {value} = event.target as HTMLInputElement 
        setValue(value); 
    }
    return ( 
        <section className={styles.sidebarContainer}>
            <div className={styles.filterContainer}>
                <h2 className={styles.filterTitle}>Фильтр поиска</h2>
                <div className={`${styles.searchContainer} ${styles.filterBlock}`}>
                    <label htmlFor="search" className={styles.filterLabel}>Название</label>
                    <input type="text" name="search" className={styles.searchInput} onChange={handleInput} value={value} placeholder="Введите название"/>
                </div>
                <div className={`${styles.genreContainer} ${styles.filterBlock}`}>
                    <label className={styles.filterLabel}>Жанр</label>
                    <div className={styles.filter}>
                        <p>Выберите жанр</p>
                        <Image src="/img/arrowDown.svg" alt="Стрелка" width={20} height={20} />
                    </div>
                </div>
                <div className={`${styles.cinemaContainer} ${styles.filterBlock}`}>
                    <label  className={styles.filterLabel}>Кинотеатр</label>
                    <div className={styles.filter} >
                        <p>Выберите кинотеатр</p>
                        <Image src="/img/arrowDown.svg" alt="Стрелка" width={20} height={20} />
                    </div>              
                </div>
            </div>
        </section>
    )
} 