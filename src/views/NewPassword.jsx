import { useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "../components/alert";
import axios from "axios";
import AxiosClient from "../config/axios";
import { Link,useNavigate} from "react-router-dom";
import { useEffect } from "react";

const NewPassword = () => {

    const [password, setPassord] = useState();
    const [alert, setAlert] = useState();
    const {token} = useParams();
    const [confirm,setConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(async ()=>{
        try {
            const {data} = await AxiosClient.get(`/doctors/password-forgot/${token}`)
            setConfirm(true);
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error:true,
            })
        }
    },[])

    const handleSubmit = async e =>{

        /* ER - Condition
            At least 1 Uppercase
            At least 1 Lowercase
            At least 1 Number
            At least 1 Symbol
            Min 8 chars and Max 12 chars
        */

        e.preventDefault();
        const er = /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g
        if(!er.test(password)){
            setAlert({msg:"Password Invalido",error:true})
        }
        try {
            const {data} = await AxiosClient.post(`/doctors/password-forgot/${token}`,{password})
            setAlert({      msg: data.msg       })

            setTimeout(()=>{
                navigate("/")
            },2000);
            
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error:true,
            })
        }
       document.querySelector("#form").reset();
    } 
  
    return (
      <>
          <div>
              <h1 className=" text-blue-600 font-black text-6xl">Recupera el Acceso a
                <span className=" text-black"> <br></br>tus Pacientes</span>
              </h1>
          </div>
          <div className=" mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white" >
            {alert && <Alert msg={alert}/>}
            {confirm &&(
                <form action="" id="form" onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Nevo Passowrd</label>
                        <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" placeholder="Ingrese su nuevo password" name={password} id="email" 
                        onChange={e => setPassord(e.target.value)}/>
                    </div>
    
                    <input type="submit" value="Guardar nuevo Password" 
                            className=" bg-blue-600 text-white py-3 px-10 uppercase font-bold w-full rounded-xl mt-5 hover:cursor-pointer hover:bg-indigo-800"/>
                </form>
                
            )}
  
              <nav className="mt-10 lg:flex lg:justify-between">
                      <Link to="/" className="block my-5 text-blue-500">¿Ya tienes una cuenta? Inicia Sesion</Link>
                      <Link to="/signUp" className="block my-5 text-blue-500">¿No tienes una Cuenta? Registrate</Link>
              </nav>
          </div>
      </>
    )
}

export default NewPassword;