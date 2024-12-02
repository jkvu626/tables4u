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
  numguests: number
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
    instance.post("/cancel", {"email": res.email, "code":res.code}).then(function (response){
      const statusCode = response.data.statusCode
      if(statusCode == 200){
        router.push('/')
      }else{
        setErr(response.data.error)
      }
    })
  }

  return(
  <div className='content'>
    <h2>RESTAURANT NAME</h2>
    <div>
      <div className="findbox">
        <h3>Your Reservation</h3>
        <h4>Code: {res.code? res.code : 'XXXXX'}</h4>
        <label>Date: {res.month ? res.month + '/' + res.day + '/' + res.year : 'XX/XX/XXXX'}</label>
        <label>Time: {res.time ? res.time + ':00' : 'XX:XX'}</label>
        <label>Table: {res.tableid ? res.tableid : 'X'}</label>
        <label>Guests: {res.numguests ? res.numguests : 'X'}</label>
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
