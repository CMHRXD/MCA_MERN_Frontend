import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const {logout} = useAuth();

  return (
    <header className='py-10 bg-slate-800'>
        <div className=' container mx-auto flex flex-col lg:flex-row justify-between items-center'>
            <h1 className=' font-bold text-2xl text-yellow-50'>Panel de Administrador</h1>
            <nav className=' flex mt-10 lg:mt-0 gap-4'>
              <Link to='/admin' className=' text-white hover:text-yellow-100 font-bold text-base text'>Pacientes</Link>
              <Link to='/admin/profile' className=' text-white hover:text-yellow-100 font-bold text-base'>Perfil</Link>
              <button type='button' className=' text-white hover:text-yellow-100 font-bold text-base' onClick={logout}>Cerrar Sesión</button>
            </nav>          
        </div>
      
    </header>
  )
}

export default Header