import React from 'react';
import Table from '../../components/Table';

const Make: React.FC = () => (
  <div className='content'>
    <div className="findbox">
      <h3>Make Reservation</h3>
      <label>
        Date: <input type="text" />
      </label>
      <label>
        Time: <input type="text" />
      </label>
    </div>
    <div className="findbox">
      <Table />
      <Table />
      <Table />
    </div>
  </div>
);

export default Make;
