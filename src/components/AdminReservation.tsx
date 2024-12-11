'use client'
import React from 'react';
import './components.css'
import axios from 'axios';
import { useAuth } from './AuthProvider';

const instance = axios.create({
  baseURL: 'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/',
});

const Reservation: React.FC<{email: string; time: number; numguests : number; restaurantName: string; day: number; month: number; year: number; tableid: number; code: string; refresh: () => void}> = ({
  email,
  time,
  numguests,
  restaurantName,
  day,
  month,
  year,
  code,
  tableid,
  refresh
}) => {
    const [err, setErr] = React.useState('')
    const { credential } = useAuth()

    const deleteReservation = () => {
        if(confirm("Are you sure you want to delete this reservation at " + restaurantName + "?")) {
          instance.post('/cancel', {"code":code, "email":email}).then((response) => {
            const status = response.data.statusCode;
            if(status == 200){
              refresh()
            }else{
              setErr(response.data.error)
            }
          })
        }
    }

    return (
    <div className="adminrestaurant">
        <div className='info'>
            <label style={{ fontWeight: 'bold'}}>Name: {restaurantName}</label>
            <label>Date: {month}/{day}/{year}</label>
            <label>Time: {time}:00</label>
            <label>Table: {tableid}</label>
            <label>Guests: {numguests}</label>
            <label>Email: {email}</label>
        </div>
        <div className='actions'>
            <button onClick={deleteReservation}>DELETE RESERVATION</button>
        </div>
        
      </div>
    );
};

export default Reservation;