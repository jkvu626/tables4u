// src/app/page.tsx
'use client';

import React from 'react';
import Restaurant from '@/components/Restaurant';
import axios from 'axios';
import InputField from '@/components/InputField'

const instance = axios.create({
  baseURL:'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/'
})

interface IClosedDate{
  username: string,
  month: number,
  day: number,
  year: number
}

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [filterDate, setDate] = React.useState(new Date(0));
  const [closedates, setClosedDates] = React.useState<IClosedDate[]>([]);
  const [filterName, setFilterName] = React.useState('')
  const [filterTime, setFilterTime] = React.useState(0)

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

  const handleFilter = () => {
    const name = document.getElementById("name") as HTMLInputElement
    const time = document.getElementById("time") as HTMLInputElement
    const date = document.getElementById("date") as HTMLInputElement
    const newDate = new Date(date.value)
    if(name && time && date) {
      setFilterName(name.value)
      setFilterTime(parseInt(time.value))
      setDate(newDate)
    }
  }

  React.useEffect(() => {
    instance.get("/get_closed", {})
    .then(function (response){
        console.log(response.data.dates)
        const status = response.data.statusCode;
        if (status == 200) {
            setClosedDates(response.data.dates)
        } else {
            console.log(response.data.err)
            console.log("TABLE ERROR")
            setClosedDates([])
        }
    })
  }, [])

  const Filter = (
    restaurants: Array<{ name: string; open: number; close: number; address: string; username: string }>,
    name: string,
    currentTime: number,
    date: Date | undefined
  ) => {
    return restaurants.filter((restaurant) => {
      const matchesName = name ? restaurant.name.toLowerCase().includes(name.toLowerCase()) : true;
      const isOpen = currentTime ? currentTime >= restaurant.open && currentTime <= restaurant.close : true;
      const checkDate = date
      ? !closedates.some((closedate) => 
        closedate.username === restaurant.username && 
        closedate.month === date.getMonth() + 1 &&
        closedate.day === date.getDate() + 1 && 
        closedate.year === date.getFullYear())
      : true;
      return matchesName && isOpen && checkDate
    });
  };

  return (
    <div className='content'>
      <h1>  How can we help you?</h1>
      <div className='content-flex'>
        <div className='quarterblock'>
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
        </div>
        <div className='threequarterblock'>
          <h2>Find a Restaurant</h2>
          <div className="filter">
            <label>Filter</label>
            <InputField label="Name:" placeholder='' id='name'/>
            <label>
              Date: <input type="date" id='date'/>
            </label>
            <InputField label="Time:" placeholder='23:00' id='time'  pattern='[0-2]?[0-9]:00'/>
            <button onClick={handleFilter}>Filter</button>
          </div>
          <div className="searchbox">
            {Filter(restaurants, filterName, filterTime, filterDate)?.map(({name, open, close, address, username}) => (
              <Restaurant
              key={name}
              name={name}
              open={open}
              close={close}
              address={address}
              username={username}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
