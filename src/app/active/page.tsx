'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const InputField: React.FC<{ label: string; placeholder: string; type?: string }> = ({ 
    label, 
    placeholder, 
    type = "text" 
  }) => (
    <div className="input-field">
      <label>
        {label}
        <input type={type} placeholder={placeholder} />
      </label>
    </div>
  );

const Table: React.FC = () => (
<div className="makeres">
    <label>Table X</label>
    <label>Seats: X</label>
</div>
);

const Active: React.FC = () => {
  const router = useRouter();

  const handleAvailability = () => {
    router.push('/availability');
  };

  return (
      <div className='content-create'>
      <div className='createbox'>
          <h2>{document.cookie}</h2>
          <div className='createbox'>
              <Table/>
              <Table/>
          </div>
      </div>
      <div className='createbox'>
          <h2>Enter Date</h2>
          <InputField label = 'Date' placeholder=''/>
          <button>Open Day</button>
          <button>Close Day</button>
          <button onClick={handleAvailability}>View Availability</button>
      </div>
  </div>
  )
};

export default Active;