"use client"
import Image from "next/image";
import plainImage from '@/assets/plane.svg'
import recImage from '@/assets/rec.svg'
import rightLightImage from '@/assets/rightLight.png'
import leftLightImage from '@/assets/leftLight.png'
import seatImage from '@/assets/busSeat.svg'
import noSeatImage from '@/assets/noSeat.svg'
import logo from '@/assets/logo.svg';
import arrow from '@/assets/arrow.png'
import hawaiianImage from '@/assets/hawaiian.png'
import ecoSeatsImage from '@/assets/ecoSeats.png'
import busSeatsImage from '@/assets/busSeats.png'
import ecoAdvImage from '@/assets/ecoAdv.png'
import busAdvImage from '@/assets/busAdv.png'

import selectedSeatImage from '@/assets/selectedSeat.svg'

import ecSeatImage from '@/assets/seat.svg'
import styles from './page.module.css'
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";


export default function Seats(){
    const [seat, setSeat] = useState([]);
    const [seatCode, setSeatCode] = useState();
    const [classType, setClassType] = useState();
    const [message, setMessge] = useState(false);
    const noSeats = [2,3,7,8,9,23];
    const flight = {id: '1', date:'29/12/2024', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '16h 45m', time: "7:00AM - 4:15PM", stop: '1 stop', price: '300', details: '2h 45m in HNL', trip: "round trip", seats: '3', class: 'A'}
    const arrFlight = {id: '1', date:'30/12/2024', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '16h 45m', time: "8:15AM - 4:15PM", stop: '1 stop', price: '300', details: '2h 45m in HNL', trip: "round trip", seats: '3', class: 'A'}

    
    const [newPassengerDate,setNewPassengerDate] = useState(JSON.parse(Cookies.get("passengerData")));
    const [passNumber, setPassNumber] = useState(1);
    const [isDone, setIsDone] = useState(false);
    const [state, setState] = useState('departing');
    const [valid, setValid] = useState(false);

    
    const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jon', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const depFlightLable = monthes[+flight.date.split('/')[1]-1] +" " + flight.date.split('/')[0] + '|' +  ' ' + flight.time.split('-')[0];
    const arrFlightLable = monthes[+arrFlight.date.split('/')[1]-1] +" " + arrFlight.date.split('/')[0] + '|' +  ' ' + arrFlight.time.split('-')[0];
    


    function handleBusSeat(row, col){
        setClassType('Business');
        setMessge(true);
        handleSeat(row, col);
    }

    function handleEcoSeat(row, col){
        setClassType('Economy');
        handleSeat(row, col);
    }
    function handleSeat(row,col){
        const rowLetter = String.fromCharCode(65 + row);
        const colNumber = col+1;
        if(!seatCode || seatCode!=rowLetter+colNumber){
            setSeat([row,col]);
            setSeatCode(rowLetter+colNumber);
            setValid(true);
        }
        else{
            setSeat();
            setSeatCode();
            setClassType();
            setValid(false)
        }   
    }

    function handleAddSeat(){
        const updatedData = [...newPassengerDate];
        updatedData[passNumber-1][state] = seatCode;
        updatedData[passNumber-1][state+'Class'] = classType;

        setNewPassengerDate(updatedData);
        Cookies.set("passengerData", JSON.stringify(newPassengerDate), { expires: 7});
        setPassNumber((prev) => prev+1);
        if(passNumber == newPassengerDate.length-1 && (state == 'arrival' || !arrFlightLable)){
            setIsDone(true);
        } 
        else if(passNumber == newPassengerDate.length){
            setState('arrival');
            setPassNumber(1);
        }
        setSeat();
        setSeatCode();
        setClassType();
    }

    console.log(newPassengerDate)
    
    return (
        <div className={styles.container}>
            {
                message && 
                <div className={styles.upgrade}>
                    <p className={styles.upTitle}>Upgrade seat</p>
                    <p className={styles.upDes}>Upgrade your seat for only $199,
                         and enjoy 45 percent more leg room, and seats that recline 40 percent more than economy.</p>
                    <div className={styles.upButtons}>
                        <button className={styles.cancle} onClick={()=>{setMessge(false); setSeatCode(); setValid(false); setClassType();}}>Cancle</button>
                        <button className={styles.upBut} onClick={()=>setMessge(false)}>Upgrade for $199</button>
                    </div>
                </div>
            }
            <div className={styles.left}>
                <Link href="/" className={styles.logo}>
                    <Image className={styles.logo} src={logo} alt={'Tripma'} />
                </Link>
                <div className={styles.planeContainer}>
                    {/* Plane Shape */}
                    <Image
                    src={plainImage}
                    alt="Plane Shape"
                    layout="fill"
                    className={styles.planeShape}
                    />

                    <Image
                    src={rightLightImage}
                    alt="right Light"
                    className={styles.rightLight}
                    />

                    <Image
                    src={leftLightImage}
                    alt="left Light"
                    className={styles.leftLight}
                    />

                    
                    {/* Gray Layer */}
                    <Image
                    src={recImage}
                    alt="Gray Layer"
                    className={styles.grayLayer}
                    />
                    
            
                    {/* Seat Grid */}
                    <div className={styles.seatGrid}>
                    {[...Array(5)].map((_, row) => (
                        <div key={row} className={styles.row}>
                        {[...Array(4)].map((_, col) => ( 
                            <>
                            {
                            noSeats.includes((row*4)+col+1) ?
                            <>
                                    <Image
                                    key={col}
                                    src={noSeatImage}
                                    alt="Seat"
                                    width={40}
                                    height={40}
                                    className={styles.noSeat}
                                    />
                                    {col==1 && <span className={styles.seatNumber}>{row+1}</span>}
                                    </>
                            :
                            <>
                            <span>
                                <>
                                { seatCode && seat[0]==row && seat[1]==col?
                                <Image
                                    key={col}
                                    src={selectedSeatImage}
                                    alt="Seat"
                                    width={40}
                                    height={40}
                                    className={styles.seat}
                                    onClick={()=> handleBusSeat(row, col)}
                                    />
                                    :
                                    <Image
                                    key={col}
                                    src={seatImage}
                                    alt="Seat"
                                    width={40}
                                    height={40}
                                    className={styles.seat}
                                    onClick={()=> handleBusSeat(row, col)}
                                    />
                                }
                                    </>
                            </span>
                            {col==1 && <span className={styles.seatNumber}>{row+1}</span>}

                            </>
                        }
                            </>
                            
                        ))}
                        
                        </div>
                    ))}
                    
                    </div>
                    <div className={styles.ecSeatGrid}>
                    <span className={styles.exit}>Exit row</span>
                    {[...Array(21)].map((_, row) => (
                        <>
                        <div key={row} className={styles.ecRow}>
                        {[...Array(6)].map((_, col) => (
                            <>
                            {
                            noSeats.includes(((row+5)*4)+col+1) ?
                            <>
                                    <Image
                                    key={col}
                                    src={noSeatImage}
                                    alt="Seat"
                                    width={20}
                                    height={40}
                                    className={styles.ecNoSeat}
                                    />
                                    {col==2 && <span className={styles.ecSeatNumber}>{row+6}</span>}
                                    </>

                            :
                            <>
                            <span>
                                <>
                                { seatCode && seat[0]-5==row && seat[1]==col?
                                <Image
                                    key={col}
                                    src={selectedSeatImage}
                                    alt="Seat"
                                    width={20}
                                    height={40}
                                    className={styles.ecSeat}
                                    onClick={()=> handleEcoSeat(row+5, col)}
                                    />
                                    :
                                    <Image
                                        key={col}
                                        src={ecSeatImage}
                                        alt="Seat"
                                        width={20}
                                        height={40}
                                        className={styles.ecSeat}
                                        onClick={()=> handleEcoSeat(row+5, col)}
                                        />
                                }
                                </>
                            </span>
                            {col==2 && <span className={styles.ecSeatNumber}>{row+6}</span>}

                            </>
                        }
                            </>
                            
                        ))}
                        </div>
                        {(row==7 || row ==12 || row==20) &&<span className={styles.exit}>Exit row</span> }
                        </>
                    ))}
                    
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.header}>
                    
                    <div className={styles.from}>
                        <span>
                            <span className={styles.city}>{flight.departure}</span>
                            <span className={styles.cun}>California, US</span>
                        </span>
                    </div>
                    <Image 
                        src={arrow}
                        alt="arrow"
                    />
                    <div className={styles.to}>
                        <span>
                            <span className={styles.city}>{flight.arrival}</span>
                            <span className={styles.cun}>Tokyo, Japan</span>
                        </span>
                    </div>
                    <>
                    {state =='departing' ? 
                    <div className={styles.depart}>
                        <span>
                            <span className={styles.lable}>{depFlightLable}</span>
                            <span className={styles.cun}>Departing</span>
                        </span>
                    </div>
                    :
                    <div className={styles.to}>
                        <span>
                            <span className={styles.lable}>{depFlightLable}</span>
                            <span className={styles.cun}>Departing</span>
                        </span>
                    </div>
                    }
                    </>
                    { arrFlightLable && state =='arrival' ?
                    <div className={styles.depart}>
                        <span>
                            <span className={styles.lable}>{arrFlightLable}</span>
                            <span className={styles.cun}>Arriving</span>
                        </span>
                    </div>
                    :
                    <div className={styles.to}>
                        <span>
                            <span className={styles.lable}>{arrFlightLable}</span>
                            <span className={styles.cun}>Arriving</span>
                        </span>
                    </div>
                    }
                </div>
                    
                <div className={styles.content}>
                    <div className={styles.ecoSection}>
                        <Image 
                            src={ecoSeatsImage}
                            alt="Eco Seats Image"
                            width={300}
                            height={200}
                            className={styles.image}
                        />
                        <span
                            className={styles.ecoHead}>
                            Economy
                            
                            {
                                classType == 'Economy' &&
                                <span className={styles.ecoBadge}>Selected</span>
                            }
                        
                            
                        </span>
                        <span className={styles.description}>
                        Rest and recharge during your flight with extended leg room, personalized service, 
                        and a multi-course meal service
                        </span>

                        <Image 
                            src={ecoAdvImage}
                            alt="Eco Adv"
                            className={styles.ecoAdv}
                            width={300}
                            height={250}
                        />


                    </div>
                    <div className={styles.busSection}>
                        <Image 
                            src={busSeatsImage}
                            alt="bus Seats Image"
                            width={300}
                            className={styles.image}

                        />
                        <span className={styles.ecoHead}>Business Class {
                                classType == 'Business' &&
                                <span className={styles.busBadge}>Selected</span>
                            }
                            </span>

                        <span className={styles.description}>
                            Rest and recharge during your flight with extended leg room,
                             personalized service, and a multi-course meal service
                        
                        </span>
                        <Image 
                            src={busAdvImage}
                            alt="Eco Adv"
                            width={300}
                            height={200}
                            className={styles.busAdv}
                        />
                    </div>
                    
                    {/* <p>Seat: {seatCode || '- -'}</p>    */}
                </div>
                <div className={styles.footer}>
                    <div className={styles.passInfo}>
                        <p className={styles.title}>Passenger {passNumber}</p>
                        <p className={styles.name}>{newPassengerDate[passNumber-1]['firstName'] + " "+ newPassengerDate[passNumber-1]['lastName'] } </p>
                    </div>
                    <div className={styles.passInfo}>
                        <p className={styles.title}>Seat number</p>
                        <p className={styles.name}>{seatCode || '- -'} </p>
                    </div>
                    
                    <button 
                        className={styles.save}
                        >
                            Save and close
                    </button>
                    {!isDone?
                        <button
                            className={styles.next}
                            onClick={handleAddSeat}
                            disabled={!valid} style={{
                                backgroundColor: valid ? '#605DEC' : '#cbd4e6',
                                cursor: valid ? 'pointer' : 'not-allowed',
                                color: 'white',
                              }} 
                            >
                                Next flight
                        </button>

                    :

                    <Link href={'/payment'} className={styles.link}>
                        <button onClick={handleAddSeat} className={styles.next} >Payment Method</button>
                    </Link>
                    }
                </div>
            </div>
        </div>
      );
    
}