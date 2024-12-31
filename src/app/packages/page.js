"use client"

import {useEffect, useState} from "react";
import React from 'react';
import Card from "@/app/components/cards/card";
import styles from "./page.module.css";

function Page(props) {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        async function fetchPackages() {
            //get Packages from API
            const packageData = null;
            setPackages(packageData);
        }

        fetchPackages();
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.head}>
                <p className={styles.p}>
                    Explore unique
                    <span style={{color:"#01e41c"}}>Place to stay</span>
                </p>
            </div>
            <div className={styles.body}>
                {packages && packages.length > 0 ? (
                    packages.map((pack) => (
                        <Card key={pack._id}
                            image={pack.image}
                            title={pack.title}
                            name={pack.name}
                            price={pack.price}
                            des={pack.des}
                            color={"#605DEC"}
                        />
                    ))
                ) : null}
            </div>
        </div>
    );
}

export default Page;