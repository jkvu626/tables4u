'use client'
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import axios from 'axios';
import AdminReservation from '@/components/AdminReservation';
import { useAuth } from '@/components/AuthProvider';

const instance = axios.create({
  baseURL:'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/'
})

const SuspendedDelete: React.FC = () => {
    const [reservations, setReservations] = React.useState([]);
    const [refresh, setRefresh] = React.useState(0)
    const searchParams = useSearchParams()
    const username = searchParams.get('username')
    const router = useRouter()
    const refreshTrigger = () => setRefresh(refresh + 1)
    const { credential, loading } = useAuth()

    React.useEffect(() => {
        if(!loading){
          if(!credential){
            router.replace('/login')
          }else{
            instance.post("/reservations_get", {"username": username}).then(function (response){
              const status = response.data.statusCode;
              if (status == 200) {
                if(!response.data.reservations){
                  router.replace('/admin')
                }else{
                  setReservations(Object.values(response.data.reservations))
                }
              }
              else {
                router.replace('/admin')
              }
            })
          }
        }
      }, [refresh, router, credential, loading, username])

    return (
        <div>
    <div className="searchbox">
      {reservations?.map(({name, email, time, numguests, day, month, year, code, tableid}) => (
        <AdminReservation 
        key={code}
        restaurantName={name} 
        email={email}
        time={time}
        numguests={numguests}
        day={day}
        month={month}
        year={year}
        code={code}
        tableid={tableid}
        refresh={refreshTrigger}
        />
      ))}
    </div>
  </div>
);}

const Delete = () => (
  <Suspense>
    <SuspendedDelete/>
  </Suspense>
)

export default Delete