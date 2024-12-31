import styles from "./flight.module.css"

import Image from "next/image";

export default function Flight({flight}){
    console.log(flight);
    return <div>
    <div className={styles.card}>
            <div className={styles.gap}>
                <Image width={24} height={24} src={flight.img} alt={flight.name} className={styles.size}/>
                <div style={{flexDirection:"column"}} className={styles.start}>
                    <h2 className={styles.h2}>{flight.name}</h2>
                    <p className={styles.p}>{flight.type}</p>
                </div>
            </div>
            
            <div className={styles.tail}>
                <p className={styles.h2}>{flight.duration} (+1d)</p>
                <p className={styles.h2}>{flight.time}</p>

                <p className={styles.p}>{flight.details}</p>
            </div>
        </div>
        
  </div>
}