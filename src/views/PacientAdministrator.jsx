import PacientForm from "../components/PacientForm";
import PacientsList from "../components/pacientsList";
import { useState } from "react";
import {Table} from "../components/Table";

const PacientAdministrator = () => {

  const [showForm,setShowform] = useState(false);
  return (

    <div className=" flex flex-col md:flex-row justify-between">
        <button type="button" 
        className={` bg-slate-700 hover:bg-slate-800 cursor-pointer transition-colors p-3 mx-10 uppercase text-white rounded-md md:hidden`}	
        onClick={()=>setShowform(!showForm)}>
        {`${showForm ? "Ocultar Formulario" : "Mostrar Formulario"}`}
        </button>
        <div className={`${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
            <PacientForm/> 
        </div>


        <div className="md:w-1/2 lg:w-3/5">
            <Table />
        </div>
    </div>
  
  )
}

export default PacientAdministrator