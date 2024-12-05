'use client'
import axios from 'axios';
import { useSearchParams, useRouter} from 'next/navigation';
import React, { Suspense } from 'react';

interface reservation {
  tableid: number,
  month: number,
  day: number,
  year: number,
  time: number,
  email: string,
  code: string,
  numguests: number,
  name: string
}

const instance = axios.create({
  baseURL:'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/'
})

const FindSuspended: React.FC = () => {
  const router = useRouter()
  const params = useSearchParams()
  const [res, setRes] = React.useState({} as reservation)
  const [err, setErr] = React.useState('');
  
  React.useEffect(() => {
    instance.post("/findreservation", {"email": params.get('email'), "code":params.get('code')}).then(function (response){
      const statusCode = response.data.statusCode
      if(statusCode == 200){
        setRes(response.data.reservation)
      }else{
        setErr(response.data.error)
      }
    })
  
  })

  const cancelRes = () =>{
    const now = new Date()
    const target = new Date(res.year, res.month-1, res.day, res.time)

    if(target > now){
      instance.post("/cancel", {"email": res.email, "code":res.code}).then(function (response){
        const statusCode = response.data.statusCode
        if(statusCode == 200){
          router.push('/')
        }else{
          setErr(response.data.error)
        }
      })
    }else{
      setErr("cannot cancel a reservation less than a day in advance")
    }

  }

  return(
  <div className='content'>
    <h2>{res.name ? res.name : 'Loading...'}</h2>
    <div>
      <div className="findbox">
        <h3>Your Reservation</h3>
        <label>Confirmation Code: {res.code? res.code : 'Loading...'}</label>
        <label>Date: {res.month ? res.month + '/' + res.day + '/' + res.year : 'Loading...'}</label>
        <label>Time: {res.time ? res.time + ':00' : 'Loading...'}</label>
        <label>Table: {res.tableid ? res.tableid : 'Loading...'}</label>
        <label>Guests: {res.numguests ? res.numguests : 'Loading...'}</label>
        <button onClick={cancelRes}>Cancel Reservation</button>
        <label className="error">{err}</label>
      </div>
    </div>
  </div>
);
}

const Find: React.FC = () => (
  <Suspense>
    <FindSuspended />
  </Suspense>
)
export default Find;
