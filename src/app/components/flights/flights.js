import React, { useEffect, useState } from "react";
import styles from "./flights.module.css";
import Filter from "@/app/components/search/filter";
import FlightCard from "../flightCard/flightCard";
import hawaiianImage from '@/assets/hawaiian.png'
import japanImage from '@/assets/japan.png'

const Flights = ({departure, arrival, date, seats, onChoseFlight, currState}) => {
    const [state, setState] = useState({
        maxPrice: null,
        time: null,
        airline: null,
        flightClass: null,
    });
    
    function handleIsChosen(id){
        onChoseFlight(id);
    }


    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    const flights = [
    {id: '1', date:'03/01/2025', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '16h 45m', time: "7:00AM - 4:15PM", stop: '1 stop', price: '300', details: '2h 45m in HNL', trip: "round trip", seats: '3', class: 'A'},
    {id: '2', date:'03/01/2025', img:japanImage, name: 'Japan Airlines', departure: 'LAX', arrival: 'JFK', duration: '18h 22m',time: "7:00AM - 4:15PM" , stop: '1 stop', price: '663', details: '50m in HKG', trip: "round trip", seats: '5', class: 'B'},
    {id: '3', date:'04/01/2025', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '18h 4m', time: "7:00AM - 4:15PM", stop: '1 stop', price: '690', details: '1h 50m in PVG', trip: "round trip", seats: '10', class: 'A'},    
    {id: '7', date:'04/01/2025', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '15h 4m', time: "7:00AM - 4:15PM", stop: '1 stop', price: '690', details: '1h 50m in PVG', trip: "round trip", seats: '10', class: 'A'},    
    {id: '4', date:'04/01/2025', img:japanImage, name: 'Delta', duration: '18h 52m', departure: 'LAX', arrival: 'ORD', time: "7:00AM - 4:15PM", stop: '1 stop', price: '756', details: '4h 5m in ICN', trip: "round trip", seats: '5', class: 'B'},
    {id: '5', date:'03/01/2025', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '16h 5m', time: "7:00AM - 4:15PM", stop: 'Nonstop', price: '1200', details: '', trip: "round trip",seats: '53', class: 'C' },
    {id: '6', date:'03/01/2025', img:japanImage, name: 'Delta', duration: '15h 45m', departure: 'DXB', arrival: 'JFK', time: "7:00AM - 4:15PM", stop: 'Nonstop', price: '839', details: '', trip: "round trip", seats: '9', class: 'B' },
    {id: '7', date:'03/01/2025', img:japanImage, name: 'Delta', duration: '15h 45m', departure: 'LAX', arrival: 'JFK', time: "7:00AM - 4:15PM", stop: 'Nonstop', price: '839', details: '', trip: "round trip", seats: '9', class: 'B' },
  ];

    const [filteredFlights, setFilteredFlights] = useState([]);

    useEffect(() => {
        const updated = flights.filter((flight) => {
            return (
                (!seats || Number(flight.seats) >= Number(seats)) &&
                (!state.airline || flight.name.includes(state.airline)) &&
                (!state.flightClass || flight.class === state.flightClass) &&
                (!departure || flight.departure === departure) &&
                (!arrival || flight.arrival === arrival) &&
                ((!state.maxPrice || state.maxPrice === "<500" && Number(flight.price) <= Number(500)) ||
                (!state.maxPrice || state.maxPrice === "500-1000" && (Number(flight.price) >= Number(500) && Number(flight.price) <= Number(1000))) ||
                (!state.maxPrice || state.maxPrice === ">1000" && Number(flight.price) >= Number(1000)))&&
                (!date || date === flight.date)
            );
        });
        setFilteredFlights(updated);
    }, [state, departure, arrival, date, seats]);


    return (
        <>
            <Filter state={state} handleSelectChange={handleSelectChange}/>
            <div className={styles.container}>
                <div className={styles.flights}>
                    <div className={styles.header}>
                        <h1 className={styles.h1}>
                            Choose a <span style={{color:"#605DEC"}} >{currState} </span> flight
                        </h1>
                    </div>
                    <div>
                        <ul className={styles.ulS}>
                        {filteredFlights.map((flight) => (
                            <li key={flight.id} className={styles.liS}>
                                <FlightCard
                                id={flight.id}
                                img={flight.img}
                                duration={flight.duration}
                                name={flight.name}
                                time={flight.time}
                                stop={flight.stop}
                                trip={flight.trip}
                                price={flight.price}
                                details={flight.details}
                                onChoseFlight={handleIsChosen}
                                />
                            </li>
                        
                         ))}
                        </ul>
                    
                    </div>
                </div>

            </div>
        </>
    );
};

export default Flights;