//Provider for Pacients
import { createContext, useState, useEffect } from 'react';
import AxiosClient from '../config/axios';
import swal from 'sweetalert';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const PacientContext = createContext();

export const PacientContextProvider = ({ children }) => {

    const [pacients, setPacients] = useState([]);
    const [pacient, setPacient] = useState({});
    const [pacientConsults, setPacientConsult] = useState("");
    const navigate = useNavigate();

    //Use Effect to get pacients
    useEffect(() => {
        const getPacients = async () => {
            const userToken = localStorage.getItem('aph_token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                }
            };
            if (!userToken) {
                return;
            }
            try {
                const { data } = await AxiosClient.get('/pacients', config);
                setPacients(data);
            } catch (error) {
                console.log(error.response.data.msg, 'error');
            }
        }
        getPacients();
    }, []);

    const savePacient = async pacient => {
        const userToken = localStorage.getItem('aph_token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };
        if (!pacient._id == "") {
            try {
                const { data } = await AxiosClient.put(`/pacients/${pacient._id}`, pacient, config);
                setPacients(pacients.map(pacient => pacient._id === data._id ? data : pacient));
                swal("Paciente Actualizado", "El paciente se actualizó correctamente", "success");
                navigate('/admin/pacients-table');
            } catch (error) {
                console.log(error.response.data.msg)
            }
            return;
        } else {
            try {
                const { data } = await AxiosClient.post('/pacients', pacient, config);
                const { createdAt, updatedAt, __v, ...newPacient } = data;
                swal("Paciente Creado", "El paciente se creó correctamente", "success");
                setPacients([newPacient, ...pacients]);
                if (pacient.date) {
                    return data;
                };
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

    }

    const editPacient = (id) => {
        pacients.forEach(pacient => {
            if (pacient._id === id) {
                setPacient(pacient);
            }
        })
    }

    const deletePacient = async (id) => {
        const userToken = localStorage.getItem('aph_token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };
        //SweetAlert Delete
        const swalResponse = await swal({
            title: "¿Estas seguro?",
            text: "Una vez eliminado, no podras recuperar este registro",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        });
        if (swalResponse) {
            try {
                await AxiosClient.delete(`/pacients/${id}`, config);
                setPacients(pacients.filter(pacient => pacient._id !== id));
                swal("Eliminado", "El paciente ha sido eliminado", "success");
            } catch (error) {
                swal("Error", "El paciente no ha sido eliminado", "error");
                console.log(error.response.data.msg)
            }
        }
    }

    const dateFormat = (date) => {
        const newDate = new Date(date);
        let month = '' + (newDate.getMonth() + 1);
        let day = '' + newDate.getDate();
        let year = newDate.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    }

    return (
        <PacientContext.Provider
            value={{ pacients, setPacients, pacient, savePacient, editPacient, deletePacient, dateFormat,pacientConsults, setPacientConsult }}>
            {children}
        </PacientContext.Provider>
    )
}

export default PacientContext;
