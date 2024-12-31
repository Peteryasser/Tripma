"use client"

import { useEffect, useState } from "react";
import ChosenFlights from '../components/chosenFlight/chosenFlight';
import styles from './page.module.css';
import bagImage from '@/assets/bag.png'
import Image from "next/image";
import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function PassengerInformation() {

  
  const [passengerData, setPassengerData] = useState([]);
  const [emergencyContact, setEmergencyContact] = useState({});
  const [useFirstPassenger, setUseFirstPassenger] = useState(false);
  const chosenFlight = Cookies.get("chosenFlight");
  const secondChosenFlight = Cookies.get("secondChosenFlight");

  const router = useRouter();
  
  const handlePassengerChange = (index, field, value) => {
    const updatedData = [...passengerData];
    updatedData[index][field] = value;
    setPassengerData(updatedData);
    Cookies.set("passengerData", JSON.stringify(passengerData), { expires: 7});
  };

  useEffect(()=>{
    const handleEmergencyContact = () => {
        if (useFirstPassenger && passengerData[0]) {
        setEmergencyContact({
            firstName: passengerData[0].firstName,
            lastName: passengerData[0].lastName,
            email: passengerData[0].email,
            phone: passengerData[0].phone,
        });
      }
    };

    handleEmergencyContact();
  },[useFirstPassenger]);

  const handleCheckedBagChange = (index, delta) => {
    const updatedData = [...passengerData];
    updatedData[index].checkedBags =
      Math.max(0, (updatedData[index].checkedBags || 1) + delta); // Prevent negative values
    setPassengerData(updatedData);
    Cookies.set("passengerData", JSON.stringify(passengerData), { expires: 7});

  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ passengerData, emergencyContact });
  };

  const adults = Number(Cookies.get("adults"));
  const minors = Number(Cookies.get("minors"));

  useEffect(()=>{
    const storedData = Cookies.get("passengerData");
    if (storedData) {
      // Parse stored data from cookies
      setPassengerData(JSON.parse(storedData));
    } else {
    setPassengerData(
        Array(adults + minors)
          .fill(0)
          .map((_, idx) => ({
            passengerType: idx < adults ? "Adult" : "Minor",
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            dateOfBirth: "",
            email: "",
            phone: "",
            redressNumber: "",
            travelerNumber: "",
            checkedBags: 1
          }))
      )
    }
  },[]);

  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form when passengerData changes
  useEffect(() => {
    const isPassengerDataValid = passengerData.every(
      (passenger) =>
        passenger.firstName.trim() &&
        passenger.lastName.trim() &&
        passenger.dateOfBirth.trim() &&
        passenger.email.trim() &&
        passenger.phone.trim() &&
        passenger.travelerNumber.trim()
    );
    const isEmergencyContactValid =
      Boolean(emergencyContact.firstName?.trim()) &&
      Boolean(emergencyContact.lastName?.trim()) &&
      Boolean(emergencyContact.email?.trim()) &&
      Boolean(emergencyContact.phone?.trim());
      

      const isValid = isPassengerDataValid && isEmergencyContactValid;
      setIsFormValid(isValid);
  }, [passengerData, emergencyContact]);

  console.log(isFormValid)

  return (
    <>
    <div className={styles.container}>
        
    
    <div className={styles.content}>      
    <p className={styles.pass}> Passenger Information </p>
    <p className={styles.enter}>Enter the required information for each traveler and be sure that it exactly matches <br/> the government-issued ID presented at the airport.</p>
      {passengerData.map((passenger, idx) => (
        <div key={idx} className={styles.form}>
          <h3 className={styles.title}>
            Passenger {idx + 1} ({passenger.passengerType})
          </h3>
          <div className={styles.rows}>
            <input
              type="text"
              placeholder="First Name*"
              className={styles.field}
              value={passenger.firstName}
              onChange={(e) =>
                handlePassengerChange(idx, "firstName", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Middle Name"
              className={styles.field}

              value={passenger.middleName}
              onChange={(e) =>
                handlePassengerChange(idx, "middleName", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Last Name*"
              className={styles.field}

              value={passenger.lastName}
              onChange={(e) =>
                handlePassengerChange(idx, "lastName", e.target.value)
              }
            />
          </div>
          <div className={styles.rows}>
            <input
              type="text"
              placeholder="Suffix"
              className={styles.field}
              value={passenger.suffix}
              onChange={(e) =>
                handlePassengerChange(idx, "suffix", e.target.value)
              }
            />
            <input
              type="text"
              onFocus={(e) => (e.target.type='date')}
              onBlur={(e) => (e.target.type='text')}
              placeholder="Date of Birth*"
              className={styles.dob}
              value={passenger.dateOfBirth}
              onChange={(e) =>
                handlePassengerChange(idx, "dateOfBirth", e.target.value)
              }
            />
          </div>
          <div className={styles.rows}>
            <input
              type="email"
              placeholder="Email address*"
              className={styles.otherFields}

              value={passenger.email}
              onChange={(e) =>
                handlePassengerChange(idx, "email", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Phone number*"
              className={styles.otherFields}

              value={passenger.phone}
              onChange={(e) =>
                handlePassengerChange(idx, "phone", e.target.value)
              }
            />
          </div>
          <div className={styles.rows}>
            <input
              type="number"
              placeholder="Redress Number"
              className={styles.otherFields}

              value={passenger.redressNumber}
              onChange={(e) =>
                handlePassengerChange(idx, "redressNumber", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Known traveler number*"
              className={styles.otherFields}

              value={passenger.travelerNumber}
              onChange={(e) =>
                handlePassengerChange(idx, "travelerNumber", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <div className={styles.emer}>
        <h3 className={styles.title}>Emergency Contact Information</h3>
        <input
          type="checkbox"
          checked={useFirstPassenger}
          className={styles.check}
          onChange={(e) => {
            setUseFirstPassenger(e.target.checked);
          }}
        />
        
        <span className={styles.checkLable}>Same as Passenger 1</span>
        <div className={styles.rows}>
        <input
            type="text"
            placeholder="First Name*"
            className={styles.otherFields}

            value={emergencyContact.firstName || ""}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                firstName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Last Name*"
            className={styles.otherFields}

            value={emergencyContact.lastName || ""}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                lastName: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.rows}>
        <input
            type="email"
            placeholder="Email address*"
            className={styles.otherFields}

            value={emergencyContact.email || ""}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                email: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Phone number*"
            className={styles.otherFields}

            value={emergencyContact.phone || ""}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                phone: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* Checked Bags Form */}
      <div className={styles.bagsForm}>
        <p className={styles.bagTitle}>Bag information</p>
        <p className={styles.bagInfo}>
          Each passenger is allowed one free carry-on bag and one personal item. First
          <br/>
          checked bag for each passenger is also free. Second bag check fees are waived for
          <br/>
          loyalty program members. See the <span className={styles.policy}>full bag policy</span>.
        </p>
        {passengerData.map((passenger, idx) => (
          <div key={idx} >
            <div className={styles.firstRow}>
              <span className={styles.margins}>
                Passenger {idx + 1}
              </span>
              <span>
                Checked Bags
              </span>
            </div>
            <div>
              <span>
              <span className={styles.margins}>
                  {passenger.firstName || "First"}{" "}
                  {passenger.lastName || "Last"}
                </span>

                <button className={styles.counter}
                  onClick={() => handleCheckedBagChange(idx, -1)}
                >
                  -
                </button>

                {passenger.checkedBags || 1}

                <button className={styles.counter}
                  onClick={() => handleCheckedBagChange(idx, 1)}
                >
                  +
                </button>
              </span>
            </div>
            
            
          </div>
        ))}


      </div>

      <button hidden={true}>Submit</button>

      <div className={styles.buttons}>
        <button className={styles.save} onClick={()=> router.push('/')}>Save and close</button>
        <Link href={'/seats'} className={styles.link}>
          <button className={styles.select2} /*onClick={handleSubmit}*/ disabled={!isFormValid} style={{
          backgroundColor: isFormValid ? '#605DEC' : '#cbd4e6',
          cursor: isFormValid ? 'pointer' : 'not-allowed',
          color: 'white',
        }} >Select Seats</button>
        </Link>
      </div>
    </div>
    
    </div>
    <div className={styles.chosen}>
        <ChosenFlights ids={[String(chosenFlight),String(secondChosenFlight)]}/>
    </div>

    <Link href={'/seats'} className={styles.link}>
          <button className={styles.select1} /*onClick={handleSubmit}*/ disabled={!isFormValid} style={{
          backgroundColor: isFormValid ? '#605DEC' : '#cbd4e6',
          cursor: isFormValid ? 'pointer' : 'not-allowed',
          color: 'white',
        }} >Select Seats</button>
        </Link>
    

    <Image src={bagImage} alt={'Bag information'} className={styles.bag} />
    </>
  );
}
