"use client"

import React, {useEffect, useState} from 'react';
import styles from "./feedback.module.css"
import Review from "@/app/components/cards/review";
function Feedback(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            // get reviews from API
            const reviewsDate = null;
            setData(reviewsDate)
        }

        fetchReviews();
    }, []);


    return (
        <div className={styles.feedback}>
            <h1 className={styles.h1}>
                What <span style={{color: "#605DEC"}}>Tripma</span> users are
                saying
            </h1>
            <div className={styles.review}>
                {data && data.length > 0 ? (
                    data.map((review) => (
                        <Review key={review._id} review={review}/>
                    ))
                ) : null}
            </div>
        </div>
    );
}

export default Feedback;