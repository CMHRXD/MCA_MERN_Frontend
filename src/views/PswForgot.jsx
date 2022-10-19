import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import axios from 'axios';
import AxiosClient from '../config/axios';

export default function PswForgot() {

  const [email, setEmail] = useState();
  const [error, setError] = useState(false);
  const [notification, setNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!er.test(email)) {
      setError(true);
      setNotification(false);
      setErrorMessage('Email no valido');
      return;
    }

    try {
      const { data } = await AxiosClient.post('/doctors/password-forgot', { email })
      setError(false);
      setNotification(true);
      setErrorMessage(data.msg);
    } catch (error) {
      setNotification(false);
      setError(true);
      setErrorMessage(error.response.data.msg);
    }
    //document.querySelector("#form").reset();

  }

  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
        <form method='POST' onSubmit={handleSubmit} className='  bg-sky-700 shadow-lg shadow-blue-500 rounded-lg p-8 w-full max-w-[600px] h-screen md:h-auto'>
          <div>
            <h1 className='text-white text-4xl font-bold uppercase text-center pb-8 mb-5'>Restablecer Password</h1>
          </div>

          {error ? <p className="p-3 flex border-b-2 border-red-500 text-red-500 mb-6"> {errorMessage} </p>
            : null}

          {notification ? <p className="p-3 flex border-b-2 border-white text-white mb-6"> {errorMessage} </p>
            : null}

          <div className='mb-5 border-b-2 flex border-blue-500'>
            <input placeholder="Email" className="bg-transparent text-white focus:outline-none w-full p-2 text-lg font-semibold placeholder-white" type="email" autoComplete='true'
              onChange={e => setEmail(e.target.value)} />
          </div>

          <button className='bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white font-semibold px-4 py-3 mt-6 rounded-2xl w-full'>Enviar</button>

          <div className='flex flex-col md:flex-row justify-between font-semibold  pt-8'>
            <Link to="/signUp" className="block my-3 text-white">¿No tienes una Cuenta? Registrate</Link>
            <Link to="/" className="block my-3 text-white">Ya tienes una cuenta? Inicia Sesion</Link>
          </div>
        </form>
      </div>
    </>
  )
}
