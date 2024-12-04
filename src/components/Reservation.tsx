import React from 'react';
import './components.css'

const Reservation: React.FC<{tableid: number; time: number; numguests : number}> = ({
  tableid,
  time,
  numguests
}) => (
  <div className="res">
    <label>Table: {tableid}</label>
    <label>Time: {time}</label>
    <label>Guests: {numguests}</label>
  </div>
);

export default Reservation;