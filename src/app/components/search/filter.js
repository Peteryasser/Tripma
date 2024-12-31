import React from 'react';
import styles from "@/app/components/flights/flights.module.css";

const Filter = ({state, handleSelectChange}) => {
    return (
        <div className={styles.search}>
            <select
                name="maxPrice"
                value={state.maxPrice || ""}
                onChange={handleSelectChange}
                className={styles.button}
            >
                <option value="">Max price</option>
                <option value="<500">less than $500</option>
                <option value="500-1000">$500-1000</option>
                <option value=">1000">more than $1000</option>
            </select>
            <select
                name="shop"
                value={""}
                className={styles.button}
                onChange={()=> null}
            >
                <option value="">Shops</option>
            </select>
            <select
                name="time"
                value={state.time || ""}
                onChange={handleSelectChange}
                className={styles.button}
            >
                <option value="">Times</option>
                <option value="0 AM - 6 AM">0 AM - 6 AM</option>
                <option value="6 AM - 0 PM">6 AM - 0 PM</option>
                <option value="6 PM - 6 PM">0 PM - 6 PM</option>
                <option value="6 PM - 0 AM">6 PM - 0 AM</option>

            </select>
            <select
                name="airline"
                value={state.airline || ""}
                onChange={handleSelectChange}
                className={styles.button}
            >
                <option value="">Airlines</option>
                <option value="Hawaiian">Hawaiian</option>
                <option value="Japan">Japan</option>
                <option value="Delta">Delta</option>
            </select>
            <select
                name="flightClass"
                value={state.flightClass || ""}
                onChange={handleSelectChange}
                className={styles.button}
            >
                <option value="">Seat Class</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
            <select
                name="more"
                value={""}
                className={styles.button}
                onChange={()=> null}
            >
                <option value="">More</option>
            </select>
        </div>
    );
};

export default Filter;