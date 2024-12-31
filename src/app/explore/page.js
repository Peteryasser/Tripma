"use client";

import React, {Suspense, useEffect, useState} from 'react';
import Image from "next/image";
import Search from "@/app/components/search/search";
import Deals from "@/app/components/deals/deals";
import Hotels from "@/app/components/deals/deals";
import styles from "./page.module.css"
import Flights from "@/app/components/flights/flights";
import priceGrid from "@/assets/priceGrid.png"
import priceHistory from "@/assets/priceHistory.png"
import mapImage from "@/assets/map.png"
import { useSearchParams, useRouter } from 'next/navigation';
import ChosenFlights from '../components/chosenFlight/chosenFlight';
import Link from 'next/link';
import Cookies from 'js-cookie';


const Page = () => {
    const query = useSearchParams();
    const departure = query.get('departure');
    const arrival = query.get('arrival');
    const startDate = query.get('startDate');
    const endDate = query.get('endDate');
    const adults = query.get('adults');
    const minors = query.get('minors');
    Cookies.set("departure", departure, {expires: 7});
    Cookies.set("arrival", arrival, {expires: 7});
    Cookies.set("startDate", startDate, {expires: 7});
    Cookies.set("endDate", endDate, {expires: 7});
    Cookies.set("adults", adults, {expires: 7});
    Cookies.set("minors", minors, {expires: 7});


    const router = useRouter();


    const [reqDate, setReqDate] = useState(() => Cookies.get("chosenFlight")? endDate : startDate);
    const [chosenFlight, setChosenFlight] = useState(() => Cookies.get("chosenFlight") || undefined);
    const [secondChosenFlight, setSecondChosenFlight] = useState(() => Cookies.get("secondChosenFlight") || undefined);
    const [state, setState] = useState(() => (Cookies.get("chosenFlight") ? "returning" : "departing"));
    


    function handleIsChosen(id){
        if(state === "returning"){
            setSecondChosenFlight(id);
            Cookies.set("secondChosenFlight", id, {expires: 7});
        }
        else if(state === "departing"){
            setChosenFlight(id);
            Cookies.set("chosenFlight", id, {expires: 7});

            endDate && setReqDate(endDate);
            endDate && setState("returning");
        } 
    }


    useEffect(()=>{
        setChosenFlight(Cookies.get("chosenFlight") || undefined);
        setReqDate(Cookies.get("chosenFlight")? endDate : startDate);
        setState(Cookies.get("chosenFlight") ? "returning" : "departing");
        setSecondChosenFlight(Cookies.get("secondChosenFlight") || undefined);
    },[departure, arrival, startDate, endDate, adults, minors])


    
    return (
        <>
            <div className={styles.header}>
                <div className={styles.container}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Search />
                    </Suspense>
                </div>

            </div>
                
            <Flights
                departure = {departure}
                arrival = {arrival}
                date = {reqDate}
                seats = {+adults+ +minors}
                onChoseFlight = {handleIsChosen}
                currState = {state}
            /> 
            <button className={styles.buttonS}>Show all flights</button>
            <div className={styles.imageContainer}>
                <Image 
                    src={mapImage}
                    alt='image'
                    className={styles.map}
                />
                <div className={styles.textOverlay}>{departure}</div>
                <div className={styles.textOverlayTwo}>{arrival}</div>
            </div>

            {!chosenFlight && <div>
                <h3 className={styles.priceGridTitle}>
                    Price grid (flexible dates)
                </h3>

                <div className={styles.rating}>
                    <div>
                    <span>
                            Price rating   
                        </span>
                        <span className={styles.bye}>Bye Soon</span> 
                    </div>
                    <div>
                        <span className={styles.firstText}>
                            We recommend booking soon. The average cost of this
                            flight is $750, but could rise 18% to $885 in two
                            weeks.
                        </span>
                        <span className={styles.secondText}>
                            Tripma analyzes thousands of flights, prices, and trends to ensure you get the best deal.

                        </span>
                    </div>
                </div>

                <Image  
                    src={priceGrid}
                    alt="price Grid"
                    className={styles.priceGrid}
                />

                <h3 className={styles.priceHistoryTitle}>
                    Price history
                </h3>
                <Image  
                    src={priceHistory}
                    alt="price History"
                    className={styles.priceHistory}
                />
            </div>}

            {chosenFlight && !secondChosenFlight &&

                <>
                <div className={styles.chosen}>
                    <ChosenFlights ids={[chosenFlight]}/>
                </div>
                <button className={styles.save} onClick={()=> router.push('/')}>Save and close</button>
                </>
            }

            {chosenFlight && secondChosenFlight &&

                <>
                <div className={styles.chosen}>
                    <ChosenFlights ids={[chosenFlight, secondChosenFlight]}/>
                </div>   
                </>
            }

            {
                (secondChosenFlight || !endDate) &&

                <>
                <Link href={'/information'}>

                    <button className={styles.info}>Passinger Information</button>
                </Link>
                </>

            }





            <Deals/>
            <Hotels/>
        </>
    );
};

export default Page;