import { createContext, useEffect, useState } from 'react';
import AxiosClient from '../config/axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const DatesContext = createContext();
export const DatesContextProvider = ({ children }) => {

    const [dates, setDates] = useState([]);
    const [date, setDate] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getDates();
    }, []);

    const getDates = async () => {
        const userToken = localStorage.getItem('aph_token');
        if (!userToken) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };
        try {
            let { data } = await AxiosClient.get('/dates', config);

            data = data.filter(data => new Date(data.date) >= new Date());
          
            setDates(data);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    const saveDate = async date => {
        const userToken = localStorage.getItem('aph_token');
        if (!userToken) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };
        if (!date._id == "") {
           
            try {
                const { data } = await AxiosClient.put(`/dates/${date._id}`, date, config);
                setDates(dates.map(date => date._id === data._id ? data : date));
                swal("Cita Actualizada", "La Cita se actualizó correctamente", "success");
                navigate('/admin/dates-table');
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
        else {
            try {
                const { data } = await AxiosClient.post('/dates', date, config);
                const { createdAt, updatedAt, __v, ...newDate } = data;
                setDates([newDate, ...dates]);
                swal("Cita Creada", "La Cita se creó correctamente", "success");
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    const editDate = (id) => {
        dates.forEach(date => {
            if (date._id === id) {
                setDate(date);
            }
        });
    }

    const deleteDate = async id => {
        const userToken = localStorage.getItem('aph_token');
        if (!userToken) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };
        const swalResponse = await swal({
            title: "¿Estas seguro?",
            text: "Una vez eliminado, no podras recuperar este registro",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        });
        if (swalResponse) {
            try {
                await AxiosClient.delete(`/dates/${id}`, config);
                setDates(dates.filter(date => date._id !== id));
                swal("Cita Eliminada", "La Cita se eliminó correctamente", "success");
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    return (
        <DatesContext.Provider value={{ dates, date, saveDate, deleteDate, editDate }}>
            {children}
        </DatesContext.Provider>
    )
}

export default DatesContext;