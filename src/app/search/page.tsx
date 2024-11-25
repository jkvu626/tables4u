'use client'
import React from 'react';
import Restaurant from '../../components/Restaurant';
import axios from 'axios';

const instance = axios.create({
  baseURL:'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/'
})


const Search: React.FC = () => {
  const [restaurants, setRestaurants] = React.useState([]);


  React.useEffect(() => {
    instance.get("/restaurants").then(function (response){
      const status = response.data.statusCode;
      if (status == 200) {
        setRestaurants(Object.values(response.data.restaurants))
      }
      else {
        setRestaurants([])
      }
    })
  
  }, [])


  return(

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
      {restaurants?.map(({name, date, address}) => (
        <Restaurant 
        key={name}
        name={name} 
        date={date}
        address={address}/>
      ))}
    </div>
  </div>
);}

export default Search;
