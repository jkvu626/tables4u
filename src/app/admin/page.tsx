'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import axios from 'axios';
import AdminRestaurant from '@/components/AdminRestaurant';
import { useAuth } from '@/components/AuthProvider';

const instance = axios.create({
  baseURL:'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/'
})

const Admin: React.FC = () => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0)
  const router = useRouter()
  const refreshTrigger = () => setRefresh(refresh + 1)
  const { credential, loading, admin, setAdmin } = useAuth()

  React.useEffect(() => {
    if(!loading){
      if(!credential || !admin){
        router.replace('/login')
      }else{
        instance.post("/restaurants", {"credential": credential}).then(function (response){
          const status = response.data.statusCode;
          if (status == 200) {
            if(!response.data.restaurants){
              router.replace('/login')
            }else{
              setRestaurants(Object.values(response.data.restaurants))
            }
          }
          else {
            setAdmin(false)
            router.replace('/login')
          }
        })
      }
    }
  }, [refresh, router, credential, loading, admin, setAdmin])
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
      {restaurants?.map(({name, open, close, address, username, active}) => (
        <AdminRestaurant 
        key={name}
        name={name} 
        open={open}
        close={close}
        address={address}
        username={username}
        active={active}
        refresh={refreshTrigger}
        />
      ))}
    </div>
  </div>
);}

export default Admin
