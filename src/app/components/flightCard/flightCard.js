import styles from "./flightCard.module.css"
import Image from "next/image";
const FlightCard = ({id, img, duration, name, time, stop, trip, price, details, onChoseFlight}) => {

    function handleIsChosen(){
        onChoseFlight(id);
    }

    return (
        <div className={styles.card} onClick={handleIsChosen}>
            <div className={styles.gap}>
            <Image width={24} height={24} src={img} alt={name} className={styles.size}/>
                <div style={{flexDirection:"column"}} className={styles.start}>
                    <h2 className={styles.h2}>{duration}</h2>
                    <p className={styles.p}>{name}</p>
                </div>
            </div>
            <div className={styles.start}>
                <p className={styles.h2}>{time}</p>
            </div>
            <div className={styles.tail}>
                <p className={styles.h2}>{stop}</p>
                <p className={styles.p}>{details}</p>
            </div>
            <div className={styles.tail}>
                <p className={styles.h2}>${price}</p>
                <p className={styles.p}>{trip}</p>
            </div>
        </div>
        

    )
}

export default FlightCard