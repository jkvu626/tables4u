'use client'
import React, { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import InputField from '@/components/InputField';

const instance = axios.create({
    baseURL:'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/'
  })

const Login: React.FC = () => {
  const router = useRouter();
  const [load, setLoad] = React.useState({visibility: 'hidden'} as React.CSSProperties)
  const [err, setErr] = React.useState('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    setLoad({visibility: 'visible'})
    instance.post('/login', {"username":username.value, "password":password.value}).then(function (response) {
      const status = response.data.statusCode;
      if (status == 200) {
        document.cookie = response.data.credential;
        if(username.value == 'admin'){
          router.push('/admin')
        }else{
          router.push('/manage');
        }
        
      }else{
        setErr(response.data.error);
        setLoad({visibility: 'hidden'})
      }
    })
    .catch(function (error: React.SetStateAction<string>) {
        setErr('failed to log in: ' + error);
        setLoad({visibility: 'hidden'})
    })
  };

  
  return(
    <div className='content'>
        <h2>Enter Credentials</h2>
        <form onSubmit={handleLogin}>
          <InputField id = 'username' label = 'Username' placeholder=''/>
          <InputField id = 'password' label = 'Password' placeholder='' type='password'/>
          <button type="submit">Log In</button>
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img src='/loading-7528_128.gif' alt="" id='loading' style={load}/>
          <label className="error">{err}</label>
        </form>
    </div>
  );
}


export default Login;