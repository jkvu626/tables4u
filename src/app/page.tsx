// src/app/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

const Home: React.FC = () => {
  const router = useRouter();
  const { credential, loading, admin} = useAuth()

  React.useEffect(() => {
    if(!loading && credential){
      router.replace(admin ? '/admin' : '/manage')
    }
  }, [credential, loading, router, admin])

  const handleRestaurantSearch = () => {
    router.push('/search');
  };

  return (
    <div className='content'>
      <h1>How can we help you?</h1>
      <form action='/find/' method="get">
        <h2>Find Your Reservation</h2>
        <label>
          Email:
          <input name="email" type="email" placeholder="Enter your email" />
        </label>
        <br />
        <label>
          Confirmation Code:
          <input name="code" type="text" placeholder="Enter your code" />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>
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
