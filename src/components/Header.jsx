import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import usePacients from '../hooks/usePacients';

//ICONS
import { HiArrowNarrowRight } from 'react-icons/hi'
import { BsPeopleFill } from 'react-icons/bs';
import { VscCalendar } from 'react-icons/vsc';
import { RiMedicineBottleFill } from 'react-icons/ri';
import { FaFileMedicalAlt } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import {BiLogOut} from 'react-icons/bi';

//IMGS
import control from '../assets/img/control.png';
import logo from '../assets/img/logo.png';

const Header = () => {

  const [open, setOpen] = useState(true);
  const [subMenuPacient, setSubMenuPacient] = useState(false);
  const [subMenuProducts, setSubMenuProducts] = useState(false);
  const [subMenuService, setSubMenuService] = useState(false);
  const [subMenuDate, setSubMenuDate] = useState(false);
  const [subMenuConsult, setSubMenuConsult] = useState(false);
  const [subMenuProfile, setSubMenuProfile] = useState(false);


  const {logout} = useAuth();
  const {setPacientConsult} = usePacients();


  return (
    <div className=''>
      <div className={`${open ? "w-80 left-0" : "w-20"} p-5 pt-8 duration-200 h-screen bg-gradient-to-b from-[#130e5f] to-[#210c7e] relative`}>
        <img src={control} alt="" className={`${!open && "rotate-180"} absolute cursor-pointer -right-3 top-12 w-7 border-2 border-[#130e5f] rounded-full`}
          onClick={() => {
            setOpen(!open);
            if (open) {
              setSubMenuPacient(false);
              setSubMenuDate(false);
              setSubMenuProducts(false);
              setSubMenuService(false);
              setSubMenuConsult(false);
              setSubMenuProfile(false);
            }
          }}
        />

        <div className='flex gap-x-4 items-center'>
          <img src={logo} width="40px" className=" cursor-pointer rounded-full bg-transparent" />
          <h1 className={`${!open && "scale-0"} text-white origin-left font-medium text-xl duration-300`}>Panel Administrador</h1>
        </div>

        <div className='pt-10'>
          <hr className=' border-white' />
        </div>

        <div className='pt-8 mx-2'>
          <ul className={`flex flex-col ${open ? "space-y-5" : "space-y-10"} `}>
            <li className=''>
              <div className='relative text-white flex justify-between hover:bg-blue-900 cursor-pointer p-2 rounded-md'>
                <Link to="/admin/dates-table" className="">
                  <div className='absolute inset-y-0 left-0 flex items-center'>
                    <VscCalendar className={`text-3xl`} />
                  </div>
                  <span className={`${!open && "hidden"} ml-8 origin-left duration-200`}>Citas</span>
                </Link>
                <button className='absolute right-0 p-1 flex items-center'><HiArrowNarrowRight className={`${!open && "hidden"} ${subMenuDate ? "rotate-90" : "rotate-180"} duration-200`}
                  onClick={() => setSubMenuDate(!subMenuDate)}
                /></button>
              </div>

              <div className={`${!subMenuDate && "hidden"} pt-2 pl-4 cursor-pointer`}>
                <ul className='flex flex-col pl-2 border-l border-white'>
                  <Link to="/admin/dates-table"><li className='inline-block w-full px-4 py-2 text-white rounded hover:bg-blue-900'>Citas Agendas</li></Link>
                  <Link to="/admin/dates-form"><li className='inline-block w-full px-4 py-2 text-white rounded hover:bg-blue-900'>Agendar Cita</li></Link>
                </ul>
              </div>

            </li>

            <li className=''>
              <div className='relative text-white flex justify-between hover:bg-blue-900 cursor-pointer p-2 rounded-md'>
                <Link to="/admin/pacients-table" className="">
                  <div className='absolute inset-y-0 left-0 flex items-center'>
                    <BsPeopleFill className={`text-3xl`} />
                  </div>
                  <span className={`${!open && "hidden"} ml-8 origin-left duration-200`}>Pacientes</span>
                </Link>
                <button className='absolute right-0 p-1 flex items-center'><HiArrowNarrowRight className={`${!open && "hidden"} ${subMenuPacient ? "rotate-90" : "rotate-180"} duration-200`}
                  onClick={() => setSubMenuPacient(!subMenuPacient)}
                /></button>
              </div>

              <div className={`${!subMenuPacient && "hidden"} pt-2 pl-4 cursor-pointer`}>
                <ul className='flex flex-col pl-2 border-l border-white'>
                  <Link to="/admin/pacients-table"><li className='inline-block w-full px-4 py-2 text-white rounded hover:bg-blue-900'>Listado de Pacientes</li></Link>
                  <Link to="/admin/pacients-form"><li className='inline-block w-full px-4 py-2 text-white rounded hover:bg-blue-900'>Agregar Paciente</li></Link>
                </ul>
              </div>

            </li>

            <li className=''>
              <div className='relative text-white flex justify-between hover:bg-blue-900 cursor-pointer p-2 rounded-md'>
                <Link to="/admin/products-table" className="">
                  <div className='absolute inset-y-0 left-0 flex items-center'>
                    <RiMedicineBottleFill className={`text-3xl`} />
                  </div>
                  <span className={`${!open && "hidden"} ml-8 origin-left duration-200`}>Productos</span>
                </Link>
                <button className='absolute right-0 p-1 flex items-center'><HiArrowNarrowRight className={`${!open && "hidden"} ${subMenuProducts ? "rotate-90" : "rotate-180"} duration-200`}
                  onClick={() => setSubMenuProducts(!subMenuProducts)}
                /></button>
              </div>

              <div className={`${!subMenuProducts && "hidden"} pt-2 pl-4 cursor-pointer`}>
                <ul className='flex flex-col pl-2 border-l border-white'>
                  <Link to="/admin/products-table"><li className='inline-block w-full px-4 py-2 text-white rounded hover:bg-blue-900'>Listado de Productos</li></Link>
                  <Link to="/admin/products-form"><li className='inline-block w-full px-4 py-2 text-white rounded hover:bg-blue-900'>Agregar Productos</li></Link>
                </ul>
              </div>
            </li>

            <li className=''>
              <div className='relative text-white flex justify-between hover:bg-blue-900 cursor-pointer p-2 rounded-md'>
                <Link to="/admin/services-table" className="">
                  <div className='absolute inset-y-0 left-0 flex items-center'>
                    <MdMedicalServices className={`text-3xl`} />
                  </div>
                  <span className={`${!open && "hidden"} ml-8 origin-left duration-200`}>Servicios</span>
                </Link>
                <button className='absolute right-0 p-1 flex items-center'><HiArrowNarrowRight className={`${!open && "hidden"} ${subMenuService ? "rotate-90" : "rotate-180"} duration-200`}
                  onClick={() => setSubMenuService(!subMenuService)}
                /></button>
              </div>

              <div className={`${!subMenuService && "hidden"} pt-2 pl-4 cursor-pointer`}>
                <ul className='flex flex-col pl-2 border-l border-white'>
                  <Link to="/admin/services-table"><li className='inline-block w-full px-4 py-2 text-white rounded hover:bg-blue-900'>Listado de Servicios</li></Link>
                  <Link to="/admin/services-form"><li className='inline-block w-full px-4 py-2 text-white rounded hover:bg-blue-900'>Agregar Servicio</li></Link>
                </ul>
              </div>
            </li>

            <li className=''>
              <div className='relative text-white flex justify-between hover:bg-blue-900 cursor-pointer p-2 rounded-md'>
                <Link to="/admin/consults-table" className="" onClick={()=>setPacientConsult("")}>
                  <div className='absolute inset-y-0 left-0 flex items-center'>
                    <FaFileMedicalAlt className={`text-3xl`} />
                  </div>
                  <span className={`${!open && "hidden"} ml-8 origin-left duration-200`}>Consultas</span>
                </Link>
                <button className='absolute right-0 p-1 flex items-center'><HiArrowNarrowRight className={`${!open && "hidden"} ${subMenuConsult ? "rotate-90" : "rotate-180"} duration-200`}
                  onClick={() => setSubMenuConsult(!subMenuConsult)}
                /></button>
              </div>

              <div className={`${!subMenuConsult && "hidden"} pt-2 pl-4 cursor-pointer`}>
                <ul className='flex flex-col pl-2 border-l border-white'>
                  <Link to="/admin/consults-table"><li className='inline-block w-full px-4 py-2 text-white rounded hover:bg-blue-900'>Listado de Consultas</li></Link>
                  <Link to="/admin/consults-form"><li className='inline-block w-full px-4 py-2 text-white rounded hover:bg-blue-900'>Agregar Consultas</li></Link>
                </ul>
              </div>
            </li>

            <li className=''>
              <div className='relative text-white flex justify-between hover:bg-blue-900 cursor-pointer p-2 rounded-md'>
                <Link to="/admin/profile-edit" className="">
                  <div className='absolute inset-y-0 left-0 flex items-center'>
                    <CgProfile className={`text-3xl`} />
                  </div>
                  <span className={`${!open && "hidden"} ml-8 origin-left duration-200`}>Perfil</span>
                </Link>
                <button className='absolute right-0 p-1 flex items-center'><HiArrowNarrowRight className={`${!open && "hidden"} ${subMenuProfile ? "rotate-90" : "rotate-180"} duration-200`}
                  onClick={() => setSubMenuProfile(!subMenuProfile)}
                /></button>
              </div>

              <div className={`${!subMenuProfile && "hidden"} pt-2 pl-4 cursor-pointer`}>
                <ul className='flex flex-col pl-2 border-l border-white'>
                  <Link to="/admin/profile-edit"><li className='inline-block w-full px-4 py-2 text-white rounded hover:bg-blue-900'>Editar Perfil</li></Link>
                  <Link to="/admin/profile-pswd-edit"><li className='inline-block w-full px-4 py-2 text-white rounded hover:bg-blue-900'>Camibar Password</li></Link>
                </ul>
              </div>

            </li>


            <li className='' onClick={logout}>
              <div className='relative text-white flex justify-between hover:bg-blue-900 cursor-pointer p-2 rounded-md'>
                <Link to="/" className="">
                  <div className='absolute inset-y-0 left-0 flex items-center'>
                    <BiLogOut className={`text-3xl`} />
                  </div>
                  <span className={`${!open && "hidden"} ml-8 origin-left duration-200`}>Cerrar Sesion</span>
                </Link>
              </div>

            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header;