"use client"

import Cookies from "js-cookie";
import hawaiianImage from '@/assets/hawaiian.png'
import japanImage from '@/assets/japan.png'
import {useState} from "react";
import { MdOutlineClose } from "react-icons/md";
import FlightCard from "@/app/components/flightCard/flightCard";
import creditCard from "@/assets/creditCard.png";
import map from "@/assets/map2.png";
import styles from "./page.module.css";
import Image from "next/image"


export default function Page (){
    const [close, setClose] = useState(true);

    

    const flights = [
        {id: '1', type: 'FIG4321', date:'3/1/2025', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '16h 45m', time: "7:00AM - 4:15PM", stop: '1 stop', price: '300', details: '2h 45m in HNL', trip: "round trip", seats: '3', class: 'A'},
        {id: '2', type: 'FIG4321', date:'3/1/2025', img:japanImage, name: 'Japan Airlines', departure: 'LAX', arrival: 'JFK', duration: '18h 22m',time: "7:00AM - 4:15PM" , stop: '1 stop', price: '663', details: '50m in HKG', trip: "round trip", seats: '5', class: 'B'},
        {id: '3', type: 'FIG4321', date:'4/1/2025', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '18h 4m', time: "7:00AM - 4:15PM", stop: '1 stop', price: '690', details: '1h 50m in PVG', trip: "round trip", seats: '10', class: 'A'},    
        {id: '7', type: 'FIG4321', date:'4/1/2025', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '15h 4m', time: "7:00AM - 4:15PM", stop: '1 stop', price: '690', details: '1h 50m in PVG', trip: "round trip", seats: '10', class: 'A'},    
        {id: '4', type: 'FIG4321', date:'4/1/2025', img:japanImage, name: 'Delta', duration: '18h 52m', departure: 'LAX', arrival: 'ORD', time: "7:00AM - 4:15PM", stop: '1 stop', price: '756', details: '4h 5m in ICN', trip: "round trip", seats: '5', class: 'B'},
        {id: '5', type: 'FIG4321', date:'3/1/2025', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '16h 5m', time: "7:00AM - 4:15PM", stop: 'Nonstop', price: '1200', details: '', trip: "round trip",seats: '53', class: 'C' },
        {id: '6', type: 'FIG4321', date:'3/1/2025', img:japanImage, name: 'Delta', duration: '15h 45m', departure: 'DXB', arrival: 'JFK', time: "7:00AM - 4:15PM", stop: 'Nonstop', price: '839', details: '', trip: "round trip", seats: '9', class: 'B' },
      ];
      const firstFlight = flights.filter((flight)=> flight.id === Cookies.get("chosenFlight"))[0];
      const secondFlight = flights.filter((flight)=> flight.id === Cookies.get("secondChosenFlight"))[0];
      const passengerData =JSON.parse(Cookies.get('passengerData'));
      const startDate = Cookies.get('startDate');
      const endDate = Cookies.get('endDate');
      const cardData = JSON.parse(Cookies.get('cardData'));


      function formatDate(inputDate) {
        // Split the input date into parts
        const [day, month, year] = inputDate.split('/').map(Number);
      
        // Month names array
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
      
        // Get the appropriate suffix for the day
        const getOrdinalSuffix = (day) => {
          if (day % 10 === 1 && day !== 11) return "st";
          if (day % 10 === 2 && day !== 12) return "nd";
          if (day % 10 === 3 && day !== 13) return "rd";
          return "th";
        };
      
        // Format the date
        const formattedDate = `${monthNames[month - 1]} ${day}${getOrdinalSuffix(day)}, ${year}`;
        return formattedDate;
      }

      function calculateTotals(passengerData) {
        return passengerData.reduce(
            (totals, user) => {
            // Add to total checkedBags
            totals.checkedBags += user.checkedBags;
        
            // Count departingClass and arrivalClass as "Business"
            if (user.departingClass === "Business") totals.departingBusinessCount++;
            if (user.arrivalClass === "Business") totals.arrivalBusinessCount++;
        
            return totals;
            },
            {
            checkedBags: 0, // Initialize total checkedBags
            departingBusinessCount: 0, // Initialize departing class Business count
            arrivalBusinessCount: 0, // Initialize arrival class Business count
            }
        );
    }

    const totals = calculateTotals(passengerData);

    const costs = {
        departion: Number(firstFlight.price),
        arrival: Number(secondFlight.price),
        bags: Number((+totals.checkedBags-2)*100),
        seats: Number((+totals.departingBusinessCount + totals.arrivalBusinessCount)*199)
    }

    costs.subtotal = Number(costs.departion+costs.arrival+costs.bags+costs.seats);
    costs.taxes = Math.round(Number(costs.subtotal * 9.4/100));
    costs.total = +costs.subtotal + costs.taxes;

    const expDate = cardData.exp.split('-')[1]+"/"+cardData.exp.split('-')[0]




    return (
        <div className={styles.container}>
            <div className={styles.leftContent}>
                {close && (
                    <div className={styles.notification}>
                        <p className={styles.notificationText}>
                            Your flight has been booked successfully! Your confirmation number is #381029404387
                        </p>
                        <MdOutlineClose
                            className={styles.closeIcon}
                            onClick={() => setClose(false)}
                        />
                    </div>
                )}

                <div>
                    <h1 className={styles.title}>Bon voyage, {passengerData[0]['firstName']}!</h1>
                    <p className={styles.subtitle}>Confirmation number: #381029404387</p>
                    <p className={styles.description}>
                        Thank you for booking your travel with Tripma! Below is a summary of your trip to Narita airport in Tokyo, Japan. We’ve sent a copy of your booking confirmation to your email address. You can also find this page again in <span className={styles.highlight}>My trips.</span>
                    </p>
                </div>

                <div className={styles.flightSummary}>
                    <h2 className={styles.sectionTitle}>Flight summary</h2>
                    <div className={styles.flightDetails}>
                        <p className={styles.text}>Departing {formatDate(startDate)}</p>
                        {firstFlight &&
                            <div className={styles.flightCard}>
                                <FlightCard
                                    id={firstFlight.id}
                                    img={firstFlight.img}
                                    duration={firstFlight.duration}
                                    name={firstFlight.name}
                                    time={firstFlight.time}
                                    stop={firstFlight.stop}
                                    trip={firstFlight.trip}
                                    price={firstFlight.price}
                                    details={firstFlight.details}

                                />
                            </div>
                        }
                        {passengerData.map((passenger, idx) => (
                            <p className={styles.text} key={idx}>Seat {passenger.departing} ({passenger.departingClass
                            }, window), {passenger.checkedBags} checked bag</p>
                        ))}

                        

                        <p className={styles.text} style={{marginTop:'32px'}}>Departing {formatDate(endDate)}</p>
                        {secondFlight &&
                            <div className={styles.flightCard}>
                                <FlightCard
                                    id={secondFlight.id}
                                    img={secondFlight.img}
                                    duration={secondFlight.duration}
                                    name={secondFlight.name}
                                    time={secondFlight.time}
                                    stop={secondFlight.stop}
                                    trip={secondFlight.trip}
                                    price={secondFlight.price}
                                    details={secondFlight.details}
                                />
                            </div>
                        }

                        {passengerData.map((passenger, idx) => (
                            <p className={styles.text} key={idx}>Seat {passenger.arrival} ({passenger.arrivalClass
                            }, window), {passenger.checkedBags} checked bag</p>
                        ))}
                    </div>
                </div>

                <div className={styles.priceBreakdown}>
                    <h2 className={styles.sectionTitle}>Price breakdown</h2>
                    <div className={styles.priceDetails}>
                        <div className={styles.priceLabels}>
                            <p className={styles.text}>Departing Flight:</p>
                            <p className={styles.text}>Arriving Flight:</p>
                            <p className={styles.text}>Baggage fees:</p>
                            <p className={styles.text}>Seat upgrade (business):</p>
                            <p className={styles.text}>Subtotal:</p>
                            <p className={styles.text}>Taxes (9.4%):</p>
                        </div>
                        <div className={styles.price}>
                            <p className={styles.text}>${costs.departion}</p>
                            <p className={styles.text}>${costs.arrival}</p>
                            <p className={styles.text}>${costs.bags}</p>
                            <p className={styles.text}>${costs.seats}</p>
                            <p className={styles.text}>${costs.subtotal}</p>
                            <p className={styles.text}>${costs.taxes}</p>
                        </div>
                    </div>
                    <hr/>
                    <p className={styles.total}>Amount paid:<span style={{flex:'1'}}>{' '}</span> ${costs.total}</p>
                </div>

                <div className={styles.paymentMethod}>
                    <h2 className={styles.sectionTitle}>Payment method</h2>
                    <div className={styles.paymentCard}>
                        <p className={styles.name}>{cardData.name}</p>
                        <p className={styles.cardNumber}>{cardData.cardName.slice(-5,-1)}</p>
                        <p className={styles.exp}>{expDate}</p>

                        <Image src={creditCard} alt="Credit Card" />
                    </div>
                    
                </div>

                <div className={styles.itinerarySharing}>
                    <h2 className={styles.sectionTitle}>Share your travel itinerary</h2>
                    <p className={styles.sectionText}>You can email your itinerary to anyone by entering their email address here.</p>
                    <form className={styles.itineraryDetails} style={{marginTop:'16px'}}>
                        <input
                            type="text"
                            placeholder="Email address"
                            className={styles.input}
                        />
                        <button className={styles.button}>Email itinerary</button>
                    </form>
                </div>

                <div className={styles.flightRoute}>
                    <h2 className={styles.sectionTitle}>Flight Route</h2>
                    <p className={styles.from}>{firstFlight.departure}</p>
                    <p className={styles.to}>{firstFlight.arrival}</p>
                    <Image src={map} alt="Flight Map" className={styles.map} />
                </div>
            </div>

            
        </div>
    );
};
