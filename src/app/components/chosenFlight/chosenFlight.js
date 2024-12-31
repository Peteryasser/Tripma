import hawaiianImage from '@/assets/hawaiian.png';
import japanImage from '@/assets/japan.png';
import Flight from './flight';
import styles from "./chosenFlight.module.css"

export default function ChosenFlights({ids}){
    const flights = [
    {id: '1', type: 'FIG4321', date:'30/12/2024', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '16h 45m', time: "7:00AM - 4:15PM", stop: '1 stop', price: '300', details: '2h 45m in HNL', trip: "round trip", seats: '3', class: 'A'},
    {id: '2', type: 'FIG4321', date:'30/12/2024', img:japanImage, name: 'Japan Airlines', departure: 'LAX', arrival: 'JFK', duration: '18h 22m',time: "7:00AM - 4:15PM" , stop: '1 stop', price: '663', details: '50m in HKG', trip: "round trip", seats: '5', class: 'B'},
    {id: '3', type: 'FIG4321', date:'29/12/2024', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '18h 4m', time: "7:00AM - 4:15PM", stop: '1 stop', price: '690', details: '1h 50m in PVG', trip: "round trip", seats: '10', class: 'A'},    
    {id: '7', type: 'FIG4321', date:'29/12/2024', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '15h 4m', time: "7:00AM - 4:15PM", stop: '1 stop', price: '690', details: '1h 50m in PVG', trip: "round trip", seats: '10', class: 'A'},    
    {id: '4', type: 'FIG4321', date:'29/12/2024', img:japanImage, name: 'Delta', duration: '18h 52m', departure: 'LAX', arrival: 'ORD', time: "7:00AM - 4:15PM", stop: '1 stop', price: '756', details: '4h 5m in ICN', trip: "round trip", seats: '5', class: 'B'},
    {id: '5', type: 'FIG4321', date:'30/12/2024', img:hawaiianImage, name: 'Hawaiian Airlines', departure: 'LAX', arrival: 'JFK', duration: '16h 5m', time: "7:00AM - 4:15PM", stop: 'Nonstop', price: '1200', details: '', trip: "round trip",seats: '53', class: 'C' },
    {id: '6', type: 'FIG4321', date:'30/12/2024', img:japanImage, name: 'Delta', duration: '15h 45m', departure: 'DXB', arrival: 'JFK', time: "7:00AM - 4:15PM", stop: 'Nonstop', price: '839', details: '', trip: "round trip", seats: '9', class: 'B' },
  ];

  const flight = flights.filter((flight)=> flight.id === ids[0])[0];
  var secondFlight = {};
  const cost ={
    subtotal: "",
    taxes: Math.round(Number(flight.price)*0.24),
    total: Number(flight.price)
  };

    cost.subtotal= Math.round(Number(flight.price)-cost.taxes);

    if(ids.length == 2){
        secondFlight = flights.filter((flight)=> flight.id === ids[1])[0];
        cost.taxes += Math.round(Number(secondFlight.price)*0.24);
        const secTaxes = Math.round(Number(secondFlight.price)*0.24);
        cost.subtotal += Math.round(Number(secondFlight.price)-secTaxes);
        cost.total += Number(secondFlight.price);

    }
    
  return <div>

    {
        ids.length != 2 ?
            <Flight flight = {flight}/>
        :
        <ul className={styles.ulS}>
            <li>
                <Flight flight = {flight}/>
            </li>
            <li>
                <Flight flight = {secondFlight}/>
            </li>
        </ul>
    }

    <div>
        <span className={styles.lable}>
            <p className={styles.pS}>Subtotal        ${cost.subtotal}</p>
        </span>
        <span className={styles.lable}>
            <p className={styles.pS}>Taxes and Fees        ${cost.taxes}</p>
        </span>
        <span className={styles.lable}>
            <p className={styles.pS}>Total        ${cost.total}</p>
        </span>
    </div>
  </div>
}