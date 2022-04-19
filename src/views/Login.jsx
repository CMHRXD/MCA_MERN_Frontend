import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AxiosClient from "../config/axios";
import Alert from "../components/alert";
import useAuth from "../hooks/useAuth";
import usePacients from "../hooks/usePacients";

export default function Login() {

    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [alert,setAlert] = useState({})
    const navigate = useNavigate();

    const {setAuth} = useAuth();
    const {setPacients} = usePacients();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Regular Expression for Email
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //Email Regex

        if([email,password].includes("")){// Check Empty fields
          setAlert({msg:"Campos Vacios",error:true})
          return;
        }
        if(!re.test(String(email).toLowerCase())){//Check Email
          setAlert({msg:"Email Invalido",error:true})
          return;
        }
        try {
            const {data} = await AxiosClient.post("/doctors/login",{email,password})
            setAuth(data);
            localStorage.setItem("aph_token",data.token);
            try {
                const token = localStorage.getItem("aph_token");
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                };
                const {data} = await AxiosClient.get("/pacients",config);
                setPacients(data);
                navigate("/admin");
            } catch (error) {
                console.log(error.response.data.msg)
            }
            
        } catch (error) {
            setAlert({msg:error.response.data.msg,error:true})
        }

        
    }
    return (
      <>
          <div>
              <h1 className=" text-blue-600 font-black text-6xl">Incicia Sesion y Administra tus 
                <span className=" text-black"> <br></br> Pacientes</span>
              </h1>
          </div>

          <div className=" mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white" >
            {alert.msg && <Alert
            msg={alert} />}
              <form action="" id="form">
                  <div className="my-5">
                      <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                        <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" placeholder="Ingrese su Email" name="email" id="email" 
                        onChange={e => setEmail(e.target.value)}/>
                  </div>

                  <div className="my-5">
                      <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
                        <input type="password" className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" placeholder="Ingrese su Passowrd" name="password" id="password"
                        onChange={e => setPassword(e.target.value)}/>
                  </div>

                  <input type="submit" value="Iniciar Sesion" 
                        className=" bg-blue-600 text-white py-3 px-10 uppercase font-bold w-full rounded-xl mt-5 hover:cursor-pointer hover:bg-indigo-800"
                        onClick={handleSubmit}/>
              </form>  
                  <nav className="mt-10 lg:flex lg:justify-between">
                      <Link to="/signUp" className="block my-5 text-blue-500">¿No tienes una Cuenta? Registrate</Link>
                      <Link to="/passwordForgot" className="block my-5 text-blue-500">Olvide mis Password</Link>
                  </nav>
          
          </div>
      </>
    )
}
