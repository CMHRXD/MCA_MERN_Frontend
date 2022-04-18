import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alert from '../components/alert';
import axios from 'axios';
import AxiosClient from '../config/axios';

export default function PswForgot() {

  const [email,setEmail] = useState();
  const [alert,setAlert] = useState();

  const handleSubmit = async e =>{
      e.preventDefault();
      
      const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!er.test(email)){
        setAlert({msg:"Email no Valido",error: true,})
        return;
      }

      try {
        const {data} =  await AxiosClient.post('/doctors/password-forgot', {email})
        console.log(data)
        setAlert({msg:data.msg, error: false})
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
      document.querySelector("#form").reset();
      
  } 

  return (
    <>
        <div>
            <h1 className=" text-blue-600 font-black text-6xl">Recupera el Acceso a
              <span className=" text-black"> <br></br>tus Pacientes</span>
            </h1>
        </div>
        <div className=" mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white" >
            {alert && <Alert msg={alert}/>}

            <form action="" onSubmit={handleSubmit} id="form">
                <div className="my-5">
                    <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                    <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" placeholder="Ingrese su Email" name={email} id="email" onChange={e => setEmail(e.target.value)}/>
                </div>

                <input type="submit" value="Enviar Email" 
                       className=" bg-blue-600 text-white py-3 px-10 uppercase font-bold w-full rounded-xl mt-5 hover:cursor-pointer hover:bg-indigo-800"/>
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/" className="block my-5 text-blue-500">¿Ya tienes una cuenta? Inicia Sesion</Link>
                    <Link to="/signUp" className="block my-5 text-blue-500">¿No tienes una Cuenta? Registrate</Link>
            </nav>
        </div>
    </>
  )
}
