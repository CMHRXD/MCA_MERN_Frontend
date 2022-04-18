import react from 'react';
import { useEffect } from 'react'; 
import { useParams, Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import AxiosClient from '../config/axios';
import Alert from '../components/alert';

export default  function ConfirmAccount() { //<> fragment </>
    const param= useParams();
    const [alert, setAlert] = useState({});
    const [confirm, setConfirm] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        const sendToken = async()=>{
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/doctors/confirm/${param.token}`
                const {data} = await axios.get(url);
                setConfirm(true);
                setAlert({
                    msg: data.msg,
                    error:false,
                })
                setTimeout(() => {
                    navigate("/");
                }, 2000);

            } catch (error) {
                
                setAlert({
                    msg: error.response.data.msg,
                    error:true,
                })
            }

        }
        sendToken()
    }, []);

    return (
      <>
          <div>
              <h1 className=" text-blue-600 font-black text-6xl">Confirma tu cuenta y Administra
                <span className=" text-black"> <br></br>tus Pacientes</span>
              </h1>
          </div>

          <div className=" mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white" >
            {alert.msg!=undefined && <Alert
               msg={alert} 
            />}

            {confirm && (<Link to="/" className="block my-5 text-center text-blue-500">Inicia Sesion</Link>)}
          </div>
      </>
    )
}
