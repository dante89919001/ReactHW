'use client'
import Link from "next/link";
import  styles  from "./AccordionListItem.module.css";
import Image from "next/image";
import { useState } from "react";


type AccordionListItem = {
    title:string;
    text:string;

}

export const AccordionListItem:React.FC<AccordionListItem> = ({title,text}) =>{
    const [isActive, setIsActive] = useState(false)

    const handleOpen = () =>{
        setIsActive(!isActive)
        
    }

    return ( 
        <div className={styles.itemContainer} onClick={handleOpen}>
             <div className={styles.itemTitleContainer} >
                <h2 className={styles.itemTitle}>{title}</h2>
                <Image src="./img/arrowDown.svg" alt="стрелка" width={32} height={32} className={isActive ? `${styles.arrowActive}`: `${styles.arrow}`} />

            </div>
            {isActive &&<p className={styles.itemText}>{text}</p>}

        </div>
    )
} 