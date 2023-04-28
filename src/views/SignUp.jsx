import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AxiosClient from '../config/axios';
import swal from 'sweetalert';

export default function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [cell, setCell] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async e => {

    e.preventDefault();

    if ([name, email, password, rePassword, cell].includes('')) { //Check Empty fields
      setError(true);
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }
    if (password !== rePassword) {//Check Passwords
      setError(true);
      setErrorMessage('Los password deben ser iguales');
      return;
    }
    if (password.length < 7) {//Check Passwords length
      setError(true);
      setErrorMessage('El password debe contener un minimo de 8 caracteres');
      return;
    }

    try {
      await AxiosClient.post('/doctors', { name, email, password, cell })
      setError(false);
      swal("Exito", "Registro Exitoso","success").then(()=> navigate("/"));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>

        <form method='POST' onSubmit={handleSubmit} className=' bg-sky-700 shadow-lg shadow-blue-500 rounded-lg p-8 w-full max-w-[600px] h-screen md:h-auto border-0'>
          <div>
            <h1 className='text-white text-4xl font-bold uppercase text-center pb-8'>Registro</h1>
          </div>

          {error ? <p className="p-2 flex border-b-4 border-white text-white font-bold mb-5"> {errorMessage} </p>
                        : null}

          <div className='mb-5 border-b-2 flex border-blue-500'>

            <input className=" bg-transparent text-white focus:outline-none w-full p-2 text-lg font-semibold placeholder-white" type="text" placeholder="Nombre" name={name}
              onChange={e => setName(e.target.value)} id="nombre" />
          </div>

          <div className='mb-5 border-b-2 flex border-blue-500'>

            <input className=" bg-transparent text-white focus:outline-none w-full p-2 text-lg font-semibold placeholder-white" type="text" placeholder="Email" name={email}
              onChange={e => setEmail(e.target.value)} id="email" />
          </div>


          <div className='mb-5 border-b-2 flex border-blue-500'>

            <input className=" bg-transparent text-white focus:outline-none w-full p-2 text-lg font-semibold placeholder-white" type="password" placeholder="Password" name={password}
              onChange={e => setPassword(e.target.value)} id="password" />
          </div>

          <div className='mb-5 border-b-2 flex border-blue-500'>

            <input className=" bg-transparent text-white focus:outline-none w-full p-2 text-lg font-semibold placeholder-white" type="password" placeholder="Repita su Password" name={rePassword}
              onChange={e => setRePassword(e.target.value)} id="re-password" />
          </div>


          <div className='mb-5 border-b-2 flex border-blue-500'>

            <input className=" bg-transparent text-white focus:outline-none w-full p-2 text-lg font-semibold placeholder-white" type="text" placeholder="Telefono" name={cell}
              onChange={e => setCell(e.target.value)} id="telefono" />
          </div>

          <input type="submit" value="Crear Cuenta"
            className=" bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white font-semibold px-4 py-3 mt-6 rounded-2xl w-full"
            onClick={handleSubmit} />


          <nav className="flex flex-col md:flex-row justify-between font-semibold  pt-8">
            <Link to="/" className="block my-5 text-white">¿Ya tienes una cuenta? Inicia Sesion</Link>
            <Link to="/passwordForgot" className="block my-5 text-white">Olvide mis Password</Link>
          </nav>
        </form>
      </div>
    </>
  )
}
