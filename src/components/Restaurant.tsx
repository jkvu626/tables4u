'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation

const Restaurant: React.FC = () => {
  const router = useRouter(); // Use useRouter from next/navigation

  const makeReservation = () => {
    router.push('/make'); // Perform navigation to /make
  };

  return (
    <div className="searchrest">
      <label>RESTAURANT NAME</label>
      <label>OPEN RESERVATIONS: X/X</label>
      <button onClick={makeReservation}>MAKE RESERVATION</button>
    </div>
  );
};

export default Restaurant;
