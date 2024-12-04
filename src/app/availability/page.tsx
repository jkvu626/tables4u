'use client'
import React from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import Reservation from '@/components/Reservation';

const instance = axios.create({
  baseURL: 'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/',
});

const Table: React.FC = () => (
<div className="makeres">
    <label>Table X</label>
    <label>RESERVED</label>
</div>
);

const Availability: React.FC = () => {
    const searchParams = useSearchParams(); // Access query parameters
    const date = searchParams.get('date'); // Get the 'date' query parameter
    const [day, setDay] = React.useState<number | null>(null);  // Change type to number
    const [month, setMonth] = React.useState<number | null>(null); // Change type to number
    const [year, setYear] = React.useState<string | null>(null);

    const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
    const [reservations, setReservations] = React.useState([])


    React.useEffect(() => {
      const credential = document.cookie.split("; ").find((row) => row.startsWith("credential="))?.split("=")[1];
      instance.post("/finddate", {
        cred: credential,
        day: day,
        month: month,
        year: year
      }).then(function (response){
        const status = response.data.statusCode;
        if (status == 200) {
          console.log("Reservations Changed")
          setReservations(Object.values(response.data.reservations))
        } else {
          console.log(response.data.err)
          setReservations([])
        }
      })
    }, [reservations])

    React.useEffect(() => {
      if (date) {
          setSelectedDate(date); // Set the selected date
          const [day, month, year] = date.split('/'); // Split the date string into day, month, and year

          // Remove leading zeros using parseInt
          setDay(parseInt(day, 10)); // Converts day to integer, removing leading zero if any
          setMonth(parseInt(month, 10)); // Converts month to integer, removing leading zero if any
          setYear(year); // Set the year as it is
      }
  }, [date]);
  
    return (
      <div style={{justifyContent: 'center'}} className="content-create">
        <div className="column">
          <div className="createbox">
            {selectedDate ? (
                  <h2>Reservations for: {selectedDate}</h2> // Display the selected date
              ) : (
                  <h2>Loading...</h2> // Show loading while the date is being fetched
            )}
            {reservations?.map(({code, tableid, numguests, time}) => (
              <Reservation
              key={code}
              tableid={tableid}
              time={time}
              numguests={numguests}/>
            ))}
          </div>
          <button onClick={() => window.history.back()} className="back-button">
              Back
          </button>
        </div>
      </div>
    );
  };

export default Availability;