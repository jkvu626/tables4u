// src/app/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const router = useRouter();

  const handleReservationSearch = () => {
    router.push('/find');
  };

  const handleRestaurantSearch = () => {
    router.push('/search');
  };

  return (
    <div className='content'>
      <h1>How can we help you?</h1>
      <div>
        <h2>Find Your Reservation</h2>
        <label>
          Email:
          <input type="email" placeholder="Enter your email" />
        </label>
        <br />
        <label>
          Confirmation Code:
          <input type="text" placeholder="Enter your code" />
        </label>
        <br />
        <button onClick={handleReservationSearch}>Search</button>
      </div>
      <div>
        <h2>Find Restaurants</h2>
        <label>
          Restaurant Name:
          <input type="text" placeholder="Enter restaurant name" />
        </label>
        <br />
        <label>
          Date:
          <input type="text" placeholder="Enter a date" />
        </label>
        <br />
        <label>
          Time:
          <input type="text" placeholder="Enter a time" />
        </label>
        <br />
        <button onClick={handleRestaurantSearch}>Search</button>
      </div>
    </div>
  );
};

export default Home;
