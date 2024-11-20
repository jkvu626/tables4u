'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import InputField from '@/components/InputField';

const instance = axios.create({
    baseURL:'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/'
  })

const Login: React.FC = () => {
  const router = useRouter();
  const handleLogin = () => {
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    instance.post('/login', {"username":username.value, "password":password.value}).then(function (response) {
      const status = response.data.statusCode;
      if (status == 200) {
        document.cookie = response.data.credential;
        router.push('/active');
      }else{
        alert(response.data.error);
      }
    })
    .catch(function (error: React.SetStateAction<string>) {
        alert('failed to log in: ' + error);
    })
  };

  
  return(
    <div className='login'>
        <h2>Enter Credentials</h2>
        <InputField id = 'username' label = 'Username' placeholder=''/>
        <InputField id = 'password' label = 'Password' placeholder='' type='password'/>
        <button onClick={handleLogin}>Log In</button>
    </div>
  );
}


export default Login;