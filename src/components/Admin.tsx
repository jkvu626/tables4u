'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation

const AdminRestaurants: React.FC<{name: string; open: number; close: number; address: string}> = ({
  name, 
  address,
  open,
  close
 }) => {
  const router = useRouter(); // Use useRouter from next/navigation

  const makeReservation = () => {
    router.push('/make'); // Perform navigation to /make
  };

  const deleteRestaurant = () => {
    router.push('/delete');
  }

  const deleteReservation = () => {
    router.push('/delete');
  }

  return (
    <div className="adminRestaurants">
      <label>{name}</label>
      <label>{address}</label>
      <label>{open}</label>
      <label>{close}</label>
      <button onClick={makeReservation}>MAKE RESERVATION</button>
      <button> DELETE RESERVATION </button>
      <button onClick={deleteRestaurant}>DELETE RESTAURANT</button>
    </div>
  );
};

export default AdminRestaurants;
