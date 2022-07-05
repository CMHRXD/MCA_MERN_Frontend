import { useEffect, useState } from 'react'
import useDates from '../hooks/useDates';
import usePacients from '../hooks/usePacients';

const DateForm = () => {

    const { saveDate, date } = useDates();

    const { pacients, savePacient } = usePacients();

    const [editable, setEditable] = useState(false);

    const [newPacient, setNewPacient] = useState({
        c_i: '',
        name: '',
        phone: '',
    });

    const [newDate, setNewDate] = useState({
        date: '',
        pacient: '',
    });

    useEffect(() => {
        if (date._id) {
            setNewDate({
                _id: date._id,
                date: date.date,
                pacient: date.pacient,
            });
            setNewPacient(pacients.find(pacient => pacient.name === date.pacient));

            setEditable(true); //Make input pacient fields readonly
        }
    }, [date]);



    const handleSubmit = async e => {
        e.preventDefault();

        //Check Empty Fields
        if (newPacient.c_i === '' || newPacient.name === '' || newPacient.phone === '' || newDate.date === '') {
            swal("Error", "Todos los campos son obligatorios", "error");
            return;
        }

        let pacient = pacients.find(pacient => pacient.c_i === newPacient.c_i);
        if (!pacient) {
            newPacient.date = true;
            pacient = await savePacient(newPacient);
        }
        newDate.pacient = pacient._id;

        saveDate(newDate);
        setNewDate({ date: '', pacient: '', });
        setNewPacient({ c_i: '', name: '', phone: '', });
        setEditable(false);

    }

    return (
        <>
            <form className='flex justify-center items-center mt-5 md:mt-32'>
                <div className='bg-gradient-to-t from-[#130e5f] to-[#210c7e] shadow-lg p-5 w-[800px] rounded-lg'>

                    <h1 className='text-xl font-bold text-center text-white mb-10 border-b-2 p-3 border-blue-500'>Formulario de Citas</h1>

                    <div className='mb-5 border-b-2 flex border-blue-500'>
                        <input type="number" className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="c_i" name="c_i" placeholder="Cedula de Identidad"
                            readOnly={editable}
                            value={newPacient.c_i}
                            onChange={(e) => setNewPacient({ ...newPacient, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className='mb-5 border-b-2 flex border-blue-500'>
                        <input type="text" className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="name" name="name" placeholder="Nombre Completo"
                            readOnly={editable}
                            value={newPacient.name}
                            onChange={(e) => setNewPacient({ ...newPacient, [e.target.name]: e.target.value })}
                        />
                    </div>

                    <div className='mb-5 border-b-2 flex border-blue-500'>
                        <input type="text" className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="phone" name="phone" placeholder="Telefono"
                            readOnly={editable}
                            value={newPacient.phone}
                            onChange={(e) => setNewPacient({ ...newPacient, [e.target.name]: e.target.value })}
                        />
                    </div>


                    <div className='mb-5 border-b-2 flex border-blue-400'>
                        <input type="date" className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="date" name="date" placeholder="Stock del Producto"
                            value={newDate.date}
                            onChange={(e) => setNewDate({ ...newDate, [e.target.name]: e.target.value })}
                        />
                    </div>

                    <input type="submit" value={!newDate._id ? "Agendar Cita" : "Guardar Cambios"}
                        className=' bg-transparent border-2 rounded-lg w-full hover:bg-blue-900 cursor-pointer transition-colors checked: p-3 mt-5 uppercase text-white'
                        onClick={handleSubmit} />


                </div >
            </form>
        </>
    )
}

export default DateForm;