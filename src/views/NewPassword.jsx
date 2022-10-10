import { useState } from "react";
import { useParams } from "react-router-dom";
import AxiosClient from "../config/axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NewPassword = () => {

    const [password, setPassord] = useState("");
    const [alert, setAlert] = useState();
    const { token } = useParams();

    const [confirm, setConfirm] = useState(false);
    const [error, setError] = useState(false);
    const [notification, setNotification] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(async () => {
        try {
            const { data } = await AxiosClient.get(`/doctors/password-forgot/${token}`)
            setConfirm(true);
        } catch (error) {
            setError(false);
            setNotification(true);
            setErrorMessage(error.response.data.msg);
        }
    }, [])

    const handleSubmit = async e => {

        /* ER - Condition
            At least 1 Uppercase
            At least 1 Lowercase
            At least 1 Number
            At least 1 Symbol
            Min 8 chars and Max 12 chars
        */
        e.preventDefault();

        const er = /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g
        if (!er.test(password)) {
            setError(true);
            setNotification(false);
            setErrorMessage('Password no valido');
            return;
        }
        setError(false);
        try {
            const { data } = await AxiosClient.post(`/doctors/password-forgot/${token}`, { password })
            setNotification(true);
            setErrorMessage(data.msg);
            setTimeout(() => {
                navigate("/")
            }, 2000);

        } catch (error) {
            setError(true);
            setNotification(false);
            setErrorMessage(error.response.data.msg);
        }
        document.querySelector("#form").reset();
    }

    return (
        <>
            <div className=" w-full h-screen flex justify-center items-center" >


                <form action="" id="form" onSubmit={handleSubmit} className=" bg-sky-700 shadow-lg shadow-black  rounded-lg p-8 w-full max-w-[600px] h-screen md:h-auto">
                    <div>
                        <h1 className='text-white text-4xl font-bold uppercase text-center pb-8 mb-5'>Actualizar Contraseña</h1>
                    </div>

                    {error ? <p className="p-3 flex border-b-2 border-red-500 text-red-500 mb-6"> {errorMessage} </p>
                        : null}

                    {notification ? <p className="p-2 flex justify-center items-center border-b-2 border-white text-white mb-6 text-center text-xl"> {errorMessage} </p>
                        : null}

                    {confirm && (
                        <div>
                            <div className='mb-5 border-b-2 flex border-blue-500'>
                                <input placeholder="Nuevo Password" className="bg-transparent text-white focus:outline-none w-full p-2 text-lg font-semibold placeholder-white" type="password" autoComplete='true'
                                    name="password"
                                    value={password || ""}
                                    onChange={e => setPassord(e.target.value)} />
                            </div>
                            <button className='bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white font-semibold px-4 py-3 mt-6 rounded-2xl w-full'>Guardar Password</button>
                        </div>

                    )}


                    <nav className="flex flex-col md:flex-row justify-between font-semibold  pt-8">
                        <Link to="/" className="block my-5 text-white">¿Ya tienes una cuenta? Inicia Sesion</Link>
                        <Link to="/signUp" className="block my-5 text-white">¿No tienes una Cuenta? Registrate</Link>
                    </nav>
                </form>

            </div>
        </>
    )
}

export default NewPassword;