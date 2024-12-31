"use client"

import React , {useEffect, useState} from "react";
import Card from "@/app/components/cards/card";
import styles from "./page.module.css";

function Page(props) {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        //get hotels from API
        const hotelsData = null;
        setHotels(hotelsData);
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.head}>
                <p className={styles.p}>
                    Find your next adventure with
                    these <span style={{color:"#3bcab0"}}>flight deals</span>
                </p>
            </div>
            <div className={styles.body}>
                {hotels && hotels.length > 0 ? (
                    hotels.map((pack) => (
                        <Card key={pack._id}
                              image={pack.image}
                              title={pack.title}
                              name={pack.name}
                              des={pack.des}
                              color={"#3bcab0"}
                        />
                    ))
                ) : null}
                
            </div>
        </div>
    );
}

export default Page;