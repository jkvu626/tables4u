'use client'
import React, { Suspense } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Reservation from '@/components/Reservation';
import { useAuth } from '@/components/AuthProvider';

const instance = axios.create({
  baseURL: 'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/',
});

const SuspendedAvailability: React.FC = () => {
    const searchParams = useSearchParams(); // Access query parameters
    const date = searchParams.get('date'); // Get the 'date' query parameter
    const [day, setDay] = React.useState<number | null>(null);  // Change type to number
    const [month, setMonth] = React.useState<number | null>(null); // Change type to number
    const [year, setYear] = React.useState<string | null>(null);

    const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
    const [reservations, setReservations] = React.useState([])
    const { credential } = useAuth()

    React.useEffect(() => {
      if (date) {
          setSelectedDate(date); // Set the selected date
          const [month, day, year] = date.split('/'); // Split the date string into day, month, and year

          // Remove leading zeros using parseInt
          setDay(parseInt(day, 10)); // Converts day to integer, removing leading zero if any
          setMonth(parseInt(month, 10)); // Converts month to integer, removing leading zero if any
          setYear(year); // Set the year as it is
      }
  }, [date]);

    React.useEffect(() => {
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
    }, [credential, day, month, year])
  
    return (
      <div style={{justifyContent: 'center'}} className="content-create">
        <div className="column">
          <div className="createbox">
            {selectedDate ? (
                  <h2>Reservations for: {selectedDate}</h2> // Display the selected date
              ) : (
                  <h2>Loading...</h2> // Show loading while the date is being fetched
            )}
            <div className="table-container" style={{ width: '100%' }}>
              <table className="availability-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Table</th>
                    <th>Guests</th>
                  </tr>
                </thead>
                <tbody>
                {reservations?.map(({code, tableid, numguests, time}) => (
                  <Reservation
                  key={code}
                  tableid={tableid}
                  time={time}
                  numguests={numguests}/>
                ))}
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={() => window.history.back()} className="back-button">
              Back
          </button>
        </div>
      </div>
    );
  };

const Availability: React.FC = () => (
  <Suspense>
    <SuspendedAvailability />
  </Suspense>
)

export default Availability;