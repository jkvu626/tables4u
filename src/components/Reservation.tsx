import React from 'react';
import './components.css'

const Reservation: React.FC<{tableid: number; time: number; numguests : number}> = ({
  tableid,
  time,
  numguests
}) => (
  <tr className="res">
    <td>{tableid}</td>
    <td>{time}</td>
    <td>{numguests}</td>
  </tr>
);

export default Reservation;