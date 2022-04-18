import { useState, useEffect } from "react";
import Alert from './alert';
import usePacients from "../hooks/usePacients";

const PacientForm = () => {

    const [c_i,setC_i] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [consult_date, setConsult_date] = useState('');
    const [symptom, setSymptom] = useState('');
    const [id, setId] = useState('');

    const [alert, setAlert] = useState({});

    const {savePacient, pacient, dateFormat} = usePacients();

    useEffect(() => {

        if(pacient?.name) {
            const {_id,c_i, name, email, consult_date, symptom} = pacient;
            setC_i(c_i);
            setName(name);
            setEmail(email);
            setConsult_date(dateFormat(consult_date));
            setSymptom(symptom);
            setId(_id);
        }

    },[pacient]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //Check Empty Fields
        if([c_i,name,email,consult_date,symptom].includes('')){
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        //Regular Expression for Email
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //Email Regex
        if(!re.test(String(email).toLowerCase())){//Check Email
            setAlert({msg:"Email Invalido",error:true})
            return;
          }
        //Delet Alert
        setAlert({});
        //Add data to the database
        savePacient({c_i,name,email,consult_date,symptom,id});
        //resetForm
        [setC_i,setName,setEmail,setConsult_date,setSymptom].forEach(Element => Element(''));
        
    }

  return (
    <>
        <p className='text-lg text-center mb-10 font-bold text-slate-700 uppercase mt-3'>Formulario de Pacientes</p>
        <form action="" className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md md:mt-14'>
            {alert.msg && <Alert
                msg = {alert}
                />
            } 
            <div className='mb-5'>
                <label htmlFor="c_i" className='block text-gray-700 text-base font-bold mb-2 uppercase'>Cedula de Identidad</label>
                <input type="number" className='w-full p-2 border-2  text-gray-700 rounded-md' id="c_i" name="c_i" placeholder="Cedula de Identidad"
                value={c_i}
                onChange={(e)=>setC_i(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="name" className='block text-gray-700 text-base font-bold mb-2 uppercase'>Nombre</label>
                <input type="text" className='w-full p-2 border-2 text-gray-700 rounded-md' id="name" name="name" placeholder="Nombre"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label htmlFor="email" className='block text-gray-700 text-base font-bold mb-2 uppercase'>Email</label>
                <input type="email" className='w-full p-2 border-2 text-gray-700 rounded-md' id="email" name="email" placeholder="Email"
                value={email}
                onChange= {(e)=> setEmail(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label htmlFor="consult_date" className='block text-gray-700 text-base font-bold mb-2 uppercase'>Fecha de Consulta</label>
                <input type="date" className='w-full p-2 border-2 text-gray-700 rounded-md' id="consultDate" name="consult_date"
                value={consult_date}
                onChange = {(e)=> setConsult_date(e.target.value)}
                
                />
            </div>

            <div className='mb-5'>
                <label htmlFor="symptom" className='block text-gray-700 text-base font-bold mb-2 uppercase'>Sintomas</label>
                <textarea name="symptom" id="symptom" rows="3" className='w-full p-2 border-2 text-gray-700 rounded-md' placeholder='Describe los sintomas'
                value={symptom}
                onChange = {(e)=> setSymptom(e.target.value)}
                ></textarea>
            </div>

            <input type="submit" value={!id?"Agregar Paciente": "Guardar Cambios"} 
            className=' bg-slate-700 w-full hover:bg-slate-800 cursor-pointer transition-colors checked: p-3 uppercase text-white'
            onClick={handleSubmit}/>
            
        </form>
      
    </>
  )
}

export default PacientForm;