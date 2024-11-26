import React from 'react';
import './components.css'

const Table: React.FC<{tableid: number; seats: number;}> = ({
  tableid,
  seats
}) => (
  <div className="table">
    <label>Table {tableid}</label>
    <label>Seats: {seats}</label>
    <button>REMOVE</button>
  </div>
);

export default Table;
