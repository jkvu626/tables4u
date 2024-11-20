'use client'
import React from 'react';

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
    <button>CANCEL</button>
</div>
);

const Create: React.FC = () => {
    const hours = Array.from({ length: 24 }, (_, index) =>
      `${index.toString().padStart(2, '0')}:00`
    );
  
    return (
      <div className="content-create">
        <button onClick={() => window.history.back()} className="back-button">
            Back
        </button>
        <div className="createbox">
          <table className="time-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, index) => (
                <tr key={index}>
                  <td>{hour}</td>
                  <td>Tables Reserved X/X</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="createbox">
              <div className='createbox'>
                <InputField label='Enter Time' placeholder=''/>   
                <InputField label='Enter Time Range' placeholder=''/>     
              </div>
              <div className='createbox'>
                <Table/>
                <Table/>
                <Table/>
              </div>
        </div>
      </div>
    );
  };

export default Create;