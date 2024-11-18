'use client'
import axios from 'axios'
import React from 'react'
const instance = axios.create({
  baseURL:'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/'
})

export default function Home() {
  const [restName, setName] = React.useState("None")
  const login = () => {
    const username = document.getElementById("username") as HTMLInputElement
    const password = document.getElementById("password") as HTMLInputElement
    instance.post('/login', {"username":username.value, "password":password.value}).then(function (response) {
      const status = response.data.statusCode
      const ret = response.data

      if (status == 200) {
        setName(ret.restaurant)
      }else{
        setName(ret.error)
      }
    })
    .catch(function (error) {
      setName(error.error)
    })
  }
  return (
    <main>
      <h1>{restName}</h1>
      <div>Username: <input id="username"/></div>
      <div>Password: <input id="password"/></div>
      <button onClick={() => {login()}}>Log In</button>
    </main>
  );
}
