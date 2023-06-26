import Link from "next/link";
import  styles  from "./Header.module.css";
import Image from "next/image";


type Header = {

}

export const Header:React.FC<Header> = () =>{
    return ( 
        <header>
            <div className={styles.headerContainer}>
                <Link href={'/'}><h1 className={styles.headerTitle}>Билетопоиск</h1></Link>
                <div className={styles.cartContainer}>
                    <p className={styles.catrCounter}>10</p>
                    <Link href={'/cart'}><Image src={'/img/logo.svg'} alt="корзина" width={28} height={25}/></Link>
                </div>
            </div>
        </header>
    )
} 