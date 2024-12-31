"use client"
import ChosenFlights from "../components/chosenFlight/chosenFlight";
import styles from './page.module.css';
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";


import {
    AiFillApple,
    AiOutlineCreditCard,
    AiOutlineGoogle,
} from "react-icons/ai";
import { BsPaypal } from "react-icons/bs";
import { SiBitcoin } from "react-icons/si";


export default function Payment(){

    const chosenFlight = Cookies.get("chosenFlight");
    const secondChosenFlight = Cookies.get("secondChosenFlight");
    const [cardData, setCardDate] = useState({
      name: '',
      cardName: '',
      exp:'',
      ccv:''
    });

    const [validForm, setValidForm] = useState(false);

    const handleCardChange = (field, value) => {
        const updatedData = {...cardData};
        updatedData[field] = value;
        setCardDate(updatedData);
        Cookies.set("cardData", JSON.stringify(cardData), { expires: 7});
      };

      useEffect(()=>{
          const storedData = Cookies.get("cardData");
          if (storedData) {
            // Parse stored data from cookies
            setCardDate(JSON.parse(storedData));
          }
        },[]);

        useEffect(()=>{
          const isCardDataValid =
            Boolean(cardData.name?.trim()) &&
            Boolean(cardData.cardName?.trim()) &&
            Boolean(cardData.exp?.trim()) &&
            Boolean(cardData.ccv?.trim());

          setValidForm(isCardDataValid);
        },[cardData]);

    return(
        <div className={styles.container}>
            <p className={styles.pass}> Payment method </p>
            <p className={styles.enter}>Select a payment method below. Tripma processes your payment securely with end-to-end encryption.</p>
            <div className={styles.paymentMethods}>
                <p className={styles.activeMethod}>
                    <AiOutlineCreditCard />
                    <span>Credit card</span>
                </p>
                <p className={styles.paymentOption}>
                    <AiOutlineGoogle />
                    <span>Google pay</span>
                </p>
                <p className={styles.paymentOption}>
                    <AiFillApple />
                    <span>Apple pay</span>
                </p>
                <p className={styles.paymentOption}>
                    <BsPaypal />
                    <span>Pay pal</span>
                </p>
                <p className={styles.paymentOption}>
                    <SiBitcoin />
                    <span>Crypto</span>
                </p>
            </div>
            <h3 className={styles.title}>
                    Credit card details
            </h3>

            <input
            type="checkbox"
            className={styles.check}
            />
            <span className={styles.checkLable}>Billing address is Same as Passenger 1</span>
            <input
              type="text"
              placeholder="Name on card"
              className={styles.field}
              value={cardData.name}

              onChange={(e) =>
                handleCardChange("name", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Card number"
              className={styles.field}
              value={cardData.cardName}

              onChange={(e) =>
                handleCardChange("cardName", e.target.value)
              }
            />
            <div className={styles.rows}>
            <input
              type="text"
              onFocus={(e) => (e.target.type='month')}
              onBlur={(e) => (e.target.type='text')}
              placeholder="Expiration date"
              className={styles.other}
              value={cardData.exp}

              onChange={(e) =>
                handleCardChange("exp", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="CCV"
              className={styles.other}
              value={cardData.ccv}

              onChange={(e) =>
                handleCardChange("ccv", e.target.value)
              }
            />
            </div>
            <p className={styles.canTitle}> Cancellation policy  </p>
            <p className={styles.canDes}>This flight has a flexible cancellation policy. If you cancel or change your flight up to 30 days before the departure date, you are eligible for a free refund. All flights booked on Tripma are backed by our satisfaction guarantee,
                 however cancellation policies vary by airline. See the <span className={styles.policy}>full cancellation policy</span> for this flight.
            </p>

            <div className={styles.buttons}>
              <Link href={'/seats'}>
                <button className={styles.back} >Back to seat select</button>
              </Link>
              <Link href={'/confirmation'}>
                <button className={styles.confirmEnd} /*onClick={handleSubmit}*/ disabled={!validForm} style={{
                  backgroundColor: validForm ? '#605DEC' : '#cbd4e6',
                  cursor: validForm ? 'pointer' : 'not-allowed',
                  color: 'white',
                }} >Confirm and pay</button>
              </Link>
              

            </div>
            
            
            <div className={styles.chosen}>
                <ChosenFlights ids={[String(chosenFlight),String(secondChosenFlight)]}/>
            </div>
            <Link href={'/confirmation'}>
              <button className={styles.confirm} /*onClick={handleSubmit}*/ disabled={!validForm} style={{
                backgroundColor: validForm ? '#605DEC' : '#cbd4e6',
                cursor: validForm ? 'pointer' : 'not-allowed',
                color: 'white',
              }} >Confirm and pay</button>
            </Link>
            

        </div>
        
    )
}