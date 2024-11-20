'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation

const Restaurant: React.FC = () => {
    const router = useRouter(); // Use useRouter from next/navigation
  
    const cancelReservation = () => {
      router.push('/cancel'); // Perform navigation to /make
    };
  
    return (
      <div className="searchrest">
        <label>RESTAURANT NAME</label>
        <label>ACTIVE</label>
        <label>AVAILABLE TABLES: X/X</label>
        <label>PERCENT UTILIZATION: XX%</label>
        <button onClick={cancelReservation}>CANCEL RESERVATION</button>
        <button>DELETE RESTAURANT</button>
      </div>
    );
  };

const Search: React.FC = () => (
  <div className='content'>
    <div className="filter">
      <label>Filter</label>
      <label>
        Name: <input type="text" />
      </label>
      <label>
        Date: <input type="text" />
      </label>
      <label>
        Time: <input type="text" />
      </label>
    </div>
    <div className="searchbox">
      <Restaurant />
      <Restaurant />
      <Restaurant />
    </div>
  </div>
);

export default Search;
