import react from 'react';
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import AxiosClient from '../config/axios';
import Alert from '../components/alert';

export default function ConfirmAccount() { //<> fragment </>
    const param = useParams();
    const [alert, setAlert] = useState({});
    const [confirm, setConfirm] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const sendToken = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/doctors/confirm/${param.token}`
                const { data } = await axios.get(url);
                setConfirm(true);
                setError(true);
                setErrorMessage(data.msg);

            } catch (error) {
                setError(true);
                setErrorMessage(error.response.data.msg);
            }

            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
        sendToken()
    }, []);

    return (
        <>
            <div className='w-full h-screen flex justify-center items-center'>
                <div className=" bg-sky-700 shadow-lg shadow-blue-500 rounded-lg p-8 w-full max-w-[600px] h-screen md:h-auto border-0" >
                    {error ? <p className="p-3 flex border-b-2 border-white text-white mb-5 justify-center items-center font-bold text-2xl"> {errorMessage} </p>
                        : null}

                </div>
            </div>
        </>
    )
}
