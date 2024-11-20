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

const Create: React.FC = () => {
  const router = useRouter();

  const handleEdit = () => {
    router.push('/edit');
  };

  return(
    <div className='content-create'>
        <div className='createbox'>
            <h2>Restaurant Name</h2>
            <div className='createbox'>
                <InputField label = 'Sunday' placeholder='00:00 - 23:00'/>
                <InputField label = 'Monday' placeholder='00:00 - 23:00'/>
                <InputField label = 'Tuesday' placeholder='00:00 - 23:00'/>
                <InputField label = 'Wednesday' placeholder='00:00 - 23:00'/>
                <InputField label = 'Thursday' placeholder='00:00 - 23:00'/>
                <InputField label = 'Friday' placeholder='00:00 - 23:00'/>
                <InputField label = 'Saturday' placeholder='00:00 - 23:00'/>
                <button onClick={handleEdit}>Create Restaurant</button>
            </div>
        </div>
        <div className='createbox'>
            <h2>Set Credentials</h2>
            <InputField label = 'Username' placeholder=''/>
            <InputField label = 'Password' placeholder=''/>
            
        </div>
    </div>
  );
}


export default Create;