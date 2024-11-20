import React from 'react';
import Restaurant from '../../components/Restaurant';

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
