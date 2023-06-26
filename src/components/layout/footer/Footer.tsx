import Link from "next/link";
import  styles  from "./Footer.module.css";
import Image from "next/image";


type Footer = {

}

export const Footer:React.FC<Footer> = () =>{
    return ( 
        <footer>
            <div className={styles.footerContainer}>
                <Link href={'/qa'}><p className={styles.footerTitle}>Вопросы-ответы</p></Link>
                <Link href={'/about'}><p className={styles.footerTitle}>О нас</p></Link>
            </div>
        </footer>
    )
} 