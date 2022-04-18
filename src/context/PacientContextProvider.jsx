//Provider for Pacients
import { createContext, useState, useEffect } from 'react';
import AxiosClient from '../config/axios';
import swal from 'sweetalert';
import useAuth from '../hooks/useAuth';

const PacientContext = createContext();

export const PacientContextProvider = ({ children }) => {

    const [pacients, setPacients] = useState([]);
    const [pacient, setPacient] = useState({});

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
                const { data } = await AxiosClient.get('pacients', config);
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
        pacient.consult_date = new Date(pacient.consult_date).setDate(new Date(pacient.consult_date).getDate() + 1);
        if (!pacient.id == "") {
            try {
                const { data } = await AxiosClient.put(`/pacients/${pacient.id}`, pacient, config);
                setPacients(pacients.map(pacient => pacient._id === data._id ? data : pacient));

            } catch (error) {
                console.log(error.response.data.msg)
            }
            return;
        } else {
            try {
                const { data } = await AxiosClient.post('/pacients', pacient, config);
                const { createdAt, updatedAt, __v, ...newPacient } = data;
                setPacients([newPacient, ...pacients]);
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

    }

    const editPacient =  (id) => {
        pacients.forEach(pacient =>{
            if(pacient._id === id) {
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
            value={{pacients,setPacients, pacient, savePacient, editPacient, deletePacient, dateFormat}}>
            {children}
        </PacientContext.Provider>
    )
}

export default PacientContext;
