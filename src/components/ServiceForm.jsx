import { useEffect, useState } from 'react'
import swal from 'sweetalert';
import useServices from '../hooks/useServices';

const ServiceForm = () => {

    const { saveService, service } = useServices();

    const [newService, setNewService] = useState({
        name: '',
        description: '',
        price: '',
    });

    useEffect(() => {
        if (service._id) {
            setNewService(service);
        }
    }, [service]);

    const handleSubmit = (e) => {
        e.preventDefault();

        //check empty fields
        if (newService.name === '' || newService.description === '' || newService.price === '') {
            swal('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        saveService(newService);
        //reset form
        setNewService({ name: '', description: '', price: '' });

    }
    return (
        <form className='flex justify-center items-center mt-5 md:mt-32'>
            <div className='bg-gradient-to-t from-[#130e5f] to-[#210c7e] shadow-lg p-5 w-[800px] rounded-lg'>

                <h1 className='text-xl font-bold text-center text-white mb-10 border-b-2 p-3 border-blue-500'>Formulario de Servicios</h1>

                <div className='mb-5 border-b-2 flex border-blue-400'>
                    <input type="text" maxLength={30} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="name" name="name" placeholder="Nombre del Servicio"
                        value={newService.name}
                        onChange={(e) => setNewService({ ...newService, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className='mb-5  border-b-2 flex border-blue-400'>
                    <textarea className='bg-transparent mt-5 text-yellow-50 focus:outline-none w-full text-lg' id="description" name="description" placeholder="Descripción del Servicio"
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, [e.target.name]: e.target.value })}
                    ></textarea>
                </div>

                <div className='mb-5 border-b-2 flex border-blue-400'>
                    <input type="number" maxLength={10} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="price" name="price" placeholder="Precio del Servicio"
                        value={newService.price}
                        onChange={(e) => setNewService({ ...newService, [e.target.name]: e.target.value })}
                    />
                </div>

                <input type="submit" value={!newService._id ? "Agregar Servicio" : "Guardar Cambios"}
                    className=' bg-transparent border-2 rounded-lg w-full hover:bg-blue-900 cursor-pointer transition-colors checked: p-3 mt-5 uppercase text-white'
                    onClick={handleSubmit} />
            </div >
        </form>

    )
}

export default ServiceForm;