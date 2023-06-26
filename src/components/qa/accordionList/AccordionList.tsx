import Link from "next/link";
import  styles  from "./AccordionList.module.css";
import Image from "next/image";
import { AccordionListItem } from "../accordionListItem/AccordionListItem";


type AccordionList = {

}

const ListItemData = [
    {
        title:'Что такое Билетопоиск?',
        text:'Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.'

    },
    {
        title:'Какой компании принадлежит Билетопоиск?',
        text:'Билетпоиск принадлежит компании Ондекс))'
        
    },
    {
        title:'Как купить билет на Билетопоиск?',
        text:'Нужно заплатить деняк)).'
        
    },
    {
        title:'Как оставить отзыв на Билетопоиск?',
        text:'Обратиться к администратору)).'
        
    }
]

export const AccordionList:React.FC<AccordionList> = () =>{
    return ( 
        <section className={styles.accordion}>
            <div className={styles.accordionTitleContainer}>
            <h2 className={styles.accordionTitle}>Вопросы-ответы</h2>

            </div>
            <div className={styles.accordionListContainer}>
                {ListItemData.map((item,index)=>{
                    return  <AccordionListItem title={item.title} text={item.text} key={index}/>
                })}
                   
            </div>
        </section>
    )
} 