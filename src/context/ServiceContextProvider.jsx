import {useState,createContext, useEffect} from 'react';
import swal from 'sweetalert';
import AxiosClient from '../config/axios';
import {useNavigate} from 'react-router-dom';


const ServiceContext = createContext();
export const ServiceContextProvider = ({children}) => {
    const [services, setServices] = useState([]);
    const [service, setService] = useState({});
    const [serviceCart, setServiceCart] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        getServices();
    },[]);

    const getServices = async () => {
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
            const { data } = await AxiosClient.get('/services', config);
            setServices(data);
        } catch (error) {
            console.log(error.response.data.msg);
        }
        setServiceCart(JSON.parse(localStorage.getItem('services_cart')) || []);
    }

    const saveService = async service =>{
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

        if(!service._id ==""){
            try {
                const { data } = await AxiosClient.put(`/services/${service._id}`, service, config);
                setServices(services.map(service => service._id === data._id ? data : service));
                swal("Servicio Actualizado", "El servicio se actualizó correctamente", "success");
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }else{
            try {
                const { data } = await AxiosClient.post('/services', service, config);
                const { createdAt, updatedAt, __v, ...newService } = data;
                setServices([newService, ...services]);
                swal("Servicio Creado", "El servicio se creó correctamente", "success");
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    const editService = (id) => {
        services.forEach(service => {
            if (service._id === id) {
                setService(service);
            }
        })
    }


    const deleteService = async id => {
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
                const { data } = await AxiosClient.delete(`/services/${id}`, config);
                setServices(services.filter(service => service._id !== id));
                swal("Servicio Eliminado", "El servicio se eliminó correctamente", "success");
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    const addToCart = async (id) => {
        const tempServices = serviceCart; // to avoid one weird error
        const service = getCartService(id); //get new service
        const existentProduct = serviceCart.find(service => service._id === id); //search service in carrito

        if (existentProduct) { 
            swal('Error', 'Los Servicios solo se añaden una sola vez', 'error');
            return;
        } else { //if service not exist in carrito add product to carrito
            service.cantToSell = 1;
            tempServices.push(service);
            if (service.cantToSell) {
                swal('Exito', 'Producto agregado al carrito', 'success');
            }
        }
        setServiceCart(tempServices);
        localStorage.setItem('services_cart', JSON.stringify(tempServices));   //update localStorage
        
    }
    const getCartService = (id) => {
        return services.find(product => product._id === id);
    }

    const removeFromCart = async (id) => {
        const newCarrito = serviceCart.filter(product => product._id !== id);
        localStorage.setItem('services_cart', JSON.stringify(newCarrito));
        setServiceCart(newCarrito);
     }



  return (
    <ServiceContext.Provider value={{service,services,editService, saveService, deleteService, addToCart, serviceCart, setServiceCart}}>
        {children}
    </ServiceContext.Provider>
  )

}

export default ServiceContext;