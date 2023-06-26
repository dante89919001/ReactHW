import  styles  from "./Loading.module.css";

type Loading = {

}

export const Loading:React.FC<Loading> =()=>{
    return (
      <div className={styles.loadingContainer}>
        <h2>🌀 Loading...</h2>
      </div>  
    )
}