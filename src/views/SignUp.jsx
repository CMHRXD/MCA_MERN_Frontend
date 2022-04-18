import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import AxiosClient from '../config/axios';

import Alert from "../components/alert";

export default function SignUp() {

  const [name, setName] =  useState('');
  const [email, setEmail] =  useState('');
  const [password, setPassword] =  useState('');
  const [rePassword, setRePassword] =  useState('');
  const [cell, setCell] =  useState('');
  const navigate = useNavigate();

  const [alert, setAlert] = useState({})

  const handleSubmit = async e => {
      
    e.preventDefault();
      
      if([name,email,password,rePassword,cell].includes('')){ //Check Empty fields
          setAlert({msg: "Campos Vacios", error: true });
          return;
      }
      if(password !== rePassword){//Check Passwords
        setAlert({msg: "Los Passwords deben ser Iguales", error: true });
        return;
      }
      if(password.length < 7){//Check Passwords length
        setAlert({msg: "El password debe tener mas de 8 caracteres", error: true });
        return;
      }

      try { 
          await AxiosClient.post('/doctors', {name, email, password, cell})
          setAlert({
            msg: "Creado Correctamente, revise su email",
            error:false,
          })
          document.querySelector('#form').reset();
          setTimeout(() => {
            navigate("/");
          }, 2000);
          
          
      } catch (error) {
          setAlert({
            msg: error.response.data.msg,
            error:true,
          })
      }
  }

  return (
    <>
        <div>
            <h1 className=" text-blue-600 font-black text-6xl">Crea una Cuenta y Administra  
              <span className=" text-black"> <br></br>tus Pacientes</span>
            </h1>
        </div>

        <div className=" mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white" >

          {alert.msg && <Alert
            msg={alert}
          />}
          
            <form action="" id='form'>
                <div className="my-5">
                    <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre</label>
                      <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" placeholder="Ingrese su Nombre" name={name} 
                      onChange={e=>setName(e.target.value)} id="nombre"/>
                </div>

                <div className="my-5">
                    <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                      <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" placeholder="Ingrese su Email" name={email}
                      onChange={e=>setEmail(e.target.value)} id="email"/>
                </div>


                <div className="my-5">
                    <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
                      <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" placeholder="Ingrese su Passowrd" name={password}
                      onChange={e=>setPassword(e.target.value)} id="password"/>
                </div>

                <div className="my-5">
                    <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="re-password">Repetir Password</label>
                      <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" placeholder="Repita su Passowrd" name={rePassword}
                      onChange={e=>setRePassword(e.target.value)} id="re-password"/>
                </div>


                <div className="my-5">
                    <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="telefono">Telefono</label>
                      <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" placeholder=" Ingrese su Telefono" name={cell}
                      onChange={e=>setCell(e.target.value)} id="telefono"/>
                </div>

                <input type="submit" value="crear cuenta" 
                       className=" bg-blue-600 text-white py-3 px-10 uppercase font-bold w-full rounded-xl mt-5 hover:cursor-pointer hover:bg-indigo-800"
                       onClick={handleSubmit}/>
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/" className="block my-5 text-blue-500">¿Ya tienes una cuenta? Inicia Sesion</Link>
                    <Link to="/passwordForgot" className="block my-5 text-blue-500">Olvide mis Password</Link>
            </nav>
        </div>
    </>
  )
}
