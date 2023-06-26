"use client"
import Link from "next/link";
import  styles  from "./Header.module.css";
import Image from "next/image";
import { selectTicketQuantities } from "@/redux/features/cart";
import { useSelector } from "react-redux";


type Header = {

}

export const Header:React.FC<Header> = () =>{

    const ticketQuantities: { [key: string]: number } = useSelector(selectTicketQuantities);
    const totalTicketQuantity = Object.values(ticketQuantities).reduce((acc: number, cur: number) => acc + cur, 0);
    
    return ( 
        <header>
            <div className={styles.headerContainer}>
                <Link href={'/'}><h1 className={styles.headerTitle}>Билетопоиск</h1></Link>
                <div className={styles.cartContainer}>
                   {totalTicketQuantity > 0 &&  <p className={styles.catrCounter}>{totalTicketQuantity}</p>} 
                    <Link href={'/cart'}><Image src={'/img/logo.svg'} alt="корзина" width={28} height={25}/></Link>
                </div>
            </div>
        </header>
    )
} 