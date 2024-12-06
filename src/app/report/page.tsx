'use client'
import React, { FormEvent } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import InputField from '@/components/InputField';
import AdminReport from '@/components/AdminReport';

const instance = axios.create({
  baseURL: 'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/',
});

const Report: React.FC = () => {
  const searchParams = useSearchParams()
  const username = searchParams.get('username')

  const [selectedDate, setSelectedDate] = React.useState('');

  const [reservations, setReservations] = React.useState([])
  const [tables, setTables] = React.useState([])

  const handleDate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.date.value)
    setSelectedDate(e.currentTarget.date.value)
    console.log(selectedDate)
  }

  React.useEffect(() => {
      const [month, day, year] = selectedDate.split('/')
      console.log("Day: ", day, " Month: ", month, "Year: ", year)
      instance.post("/report", {
        username: username,
        day: day,
        month: month,
        year: year
      }).then(function (response){
        const status = response.data.statusCode;
        if (status == 200) {
          setTables(Object.values(response.data.tables))
          setReservations(Object.values(response.data.reservations))
        } else {
          console.log(response.data.err)
          setReservations([])
          setTables([])
        }
      })
  }, [selectedDate, username])

  React.useEffect(() => {
    console.log("Updated tables:", tables);
    console.log("Updated reservations:", reservations);
    console.log("Tables Length:", tables.length)
  }, [tables, reservations]);

  return (
    <div style={{justifyContent: 'center', width: '100%'}} className="content-create"> 
      <div className="createbox">
        <div style={{alignContent: 'center'}} className='stackbox'>
            <h1>Availabity Report: {username}</h1>
            {selectedDate ? (
                  <h2>Report for: {selectedDate}</h2> // Display the selected date
              ) : (
                  <h2>Input Date</h2> // Show loading while the date is being fetched
            )}
            <form className='dateform' onSubmit={handleDate}>
                <InputField label='Date ' placeholder='XX/XX/XXXX' id='date'/>
                <button type='submit'>Check Availability</button>
            </form>
            {selectedDate && <AdminReport tables={tables} reservations={reservations} />}
        </div>
      </div>
    </div>
  )
}

export default Report;