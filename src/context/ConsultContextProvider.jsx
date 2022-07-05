import { createContext, useEffect, useState } from 'react';
import AxiosClient from '../config/axios';
import { useNavigate } from 'react-router-dom';

const ConsultContext = createContext();
export const ConsultContextProvider = ({ children }) => {
  const [consults, setConsults] = useState([]);
  const [oneConsult, setOneConsult] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getConsults();
  }, []);


  const getConsults = async () => {
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
      const { data } = await AxiosClient.get('/consults', config);
      setConsults(data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  const saveConsult = async consult => {
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

    if (!consult._id == "") {
      try {
        
        const { data } = await AxiosClient.put(`/consults/${consult._id}`, consult, config);
        setConsults(consults.map(consult => consult._id === data._id ? data : consult));
        console.log(data);
        swal("Consulta Actualizada", "La consulta se actualizó correctamente", "success");
        navigate('/admin/consults-table');
      } catch (error) {
        console.log(error);
        console.log(error.response.data.msg);
      }
      
    }
    else {
      try {
        const { data } = await AxiosClient.post('/consults', consult, config);
        const { createdAt, updatedAt, __v, ...newConsult } = data;
        setConsults([...consults, newConsult]);
        swal("Consulta Creada", "La consulta se creó correctamente", "success");
      } catch (error) {
        console.log(error);
        console.log(error.response.data.msg);
      }
    }
  }

  
  const getConsultValues = (id, editable) => {
    consults.forEach(consult => {
        if (consult._id === id) {
            consult.editable = editable;
            //console.log(consult);
            setOneConsult(consult);
        }
    });
}

  const deleteConsult = async id => {
    const userToken = localStorage.getItem('aph_token');
    if (!userToken) {
      return;
    }
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userToken}`,
      }
    }

    const swalResponse = await swal({
      title: "¿Estas seguro?",
      text: "Una vez eliminado, no podras recuperar este registro",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    });
    if (swalResponse) {
      try {
          const {data} = await AxiosClient.delete(`/consults/${id} `, config);
          setConsults(consults.filter(consult => consult._id !== id));
          swal("Consulta Eliminada", "La consulta se eliminó correctamente", "success");
      } catch (error) {
          console.log(error.response.data.msg);
      }
    }
  }

  return (
    <ConsultContext.Provider value={{ consults, saveConsult, deleteConsult, oneConsult, setOneConsult, getConsultValues }}>
      {children}
    </ConsultContext.Provider>

  )
}

export default ConsultContext;