import { useState, useEffect } from "react";
import usePacients from "../hooks/usePacients";

const PacientForm = () => {

    const [newPacient, setNewPacient] = useState({
        c_i: '',
        name: '',
        phone: '',
    });
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { savePacient, pacient } = usePacients();

    useEffect(() => {
        if (pacient?.name) {
            setNewPacient(pacient);
        }
    }, [pacient]);

    const handleSubmit = (e) => {
        e.preventDefault();


        //Check Empty Fields
        if (newPacient.c_i === '' || newPacient.name === '' || newPacient.phone === '') {
            setError(true);
            setErrorMessage('Todos los campos son obligatorios');
            return;
        }
        setError(false);
        savePacient(newPacient);
        setNewPacient({ c_i: '', name: '', phone: '' });

    }

    return (
        <>
            <form className='flex justify-center items-center mt-5 md:mt-32'>
                <div className='bg-gradient-to-t from-[#130e5f] to-[#210c7e] shadow-lg p-5 w-[800px] rounded-lg'>
                    <p className='text-lg text-center mb-10 font-bold text-white uppercase'>Formulario de Pacientes</p>

                    {error ? <p className="p-3  flex border-b border-red-500 text-red-500 mb-5"> {errorMessage} </p>
                        : null}

                    <div className='mb-5 border-b-2 flex border-blue-500'>
                        <input type="number" className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="c_i" name="c_i" placeholder="Cedula de Identidad"
                            value={newPacient.c_i}
                            onChange={(e) => setNewPacient({ ...newPacient, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className='mb-5 border-b-2 flex border-blue-500'>
                        <input type="text" className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="name" name="name" placeholder="Nombre Completo"
                            value={newPacient.name}
                            onChange={(e) => setNewPacient({ ...newPacient, [e.target.name]: e.target.value })}
                        />
                    </div>

                    <div className='mb-5 border-b-2 flex border-blue-500'>
                        <input type="text" className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="phone" name="phone" placeholder="Telefono"
                            value={newPacient.phone}
                            onChange={(e) => setNewPacient({ ...newPacient, [e.target.name]: e.target.value })}
                        />
                    </div>

                    <input type="submit" value={!newPacient._id ? "Agregar Paciente" : "Guardar Cambios"}
                        className=' bg-transparent border-white rounded-lg border-2 w-full hover:bg-blue-900 cursor-pointer transition-colors checked: p-3 uppercase text-white'
                        onClick={handleSubmit} />
                </div>
            </form>
        </>
    )
}

export default PacientForm;