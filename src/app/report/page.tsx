'use client'
import React, { FormEvent, Suspense } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import AdminReport from '@/components/AdminReport';

const instance = axios.create({
  baseURL: 'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/',
});

const SuspendedReport: React.FC = () => {
  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  const name = searchParams.get('name')


  const [reservations, setReservations] = React.useState([])
  const [tables, setTables] = React.useState([])
  const [active, setActive] = React.useState(false)

  const handleDate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement
    const startDate = new Date(form.startDate.value)
    startDate.setDate(startDate.getDate()+1)
    const endDate = new Date(form.endDate.value)
    endDate.setDate(endDate.getDate() + 1)

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const formatStartDate = formatDate(startDate);
    const formatEndDate = formatDate(endDate);
  
    console.log(formatStartDate); 
    console.log(formatEndDate);
    
    instance.post("/report", {
      username: username,
      startDate: formatStartDate,
      endDate: formatEndDate
    }).then(function (response) {
      const status = response.data.statusCode;
      if (status == 200) {
        setTables(Object.values(response.data.tables))
        setReservations(Object.values(response.data.reservations))
        setActive(true)
      } else {
        console.log(response.data.err)
        setReservations([])
        setTables([])
      }
    })
  }

  React.useEffect(() => {
    console.log("Tables:", tables)
    console.log("Reservations:", reservations)
  }, [tables, reservations])


  return (
    <div style={{justifyContent: 'center', width: '100%'}} className="content-create"> 
      <div style={{width: '100%'}} className="createbox">
        <div style={{alignContent: 'center'}} className='stackbox'>
            <h1>Availability Report for {name}</h1>
            {active ? (
                  <h2>Report for Selected Days</h2>
              ) : (
                  <h2>Input Date(s)</h2> 
            )}
            <form className='dateform' onSubmit={handleDate} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex' }}>
                    <label htmlFor="startDate">Start Date:</label>
                    <input 
                        type="date" 
                        id="startDate" 
                        name="startDate" 
                        required 
                        style={{ marginRight: '10px' }}
                    />
                    <label htmlFor="endDate">End Date:</label>
                    <input 
                        type="date" 
                        id="endDate" 
                        name="endDate" 
                        required 
                    />
                </div>
                <button type="submit" style={{ marginLeft: '20px' }}>Check Availability</button>
            </form>
            {active && <AdminReport tables={tables} reservations={reservations}/>}
        </div>
      </div>
    </div>
  )
}

const Report = () => (
  <Suspense>
    <SuspendedReport />
  </Suspense>
)

export default Report;