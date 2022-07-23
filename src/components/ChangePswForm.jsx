import {useState} from 'react';
import swal from "sweetalert";
import useAuth from '../hooks/useAuth';

const ChangePswForm = () => {

    const {updatePassword} = useAuth();

    const [password, setPassword] = useState({
        pa: '',
        pn: '',
    });

    const handlePassSubmit = (e) => {
        e.preventDefault();
        if(password.pa === "" || password.pn === ""){
            swal("Error", "Campos Vacios", "error");
            return;
        }
        updatePassword(password);
    }


    return (

        <form className='flex justify-center items-center mt-5 md:mt-32'>
            <div className='bg-gradient-to-t from-[#130e5f] to-[#210c7e] shadow-lg p-5 w-[800px] rounded-lg'>
                <h1 className='text-xl font-bold text-center text-white mb-10 border-b-2 p-3 border-blue-500'>Editar Password</h1>

                <div className='mb-5 border-b-2 flex border-blue-400'>
                    <input type="password" maxLength={30} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="pa" name="pa" placeholder="Password Anterior"
                        value={password.pa}
                        onChange={(e) => setPassword({ ...password, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className='mb-5 border-b-2 flex border-blue-400'>
                    <input type="password" maxLength={30} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="pn" name="pn" placeholder="Nuevo Password"
                        value= {password.pn}
                        onChange={(e) => setPassword({ ...password, [e.target.name]: e.target.value })}
                    />
                </div>

                <input type="submit" value="Cambiar Contraseña"
                    className=' bg-transparent border-2 rounded-lg w-full hover:bg-blue-900 cursor-pointer transition-colors checked: p-3 mt-5 uppercase text-white'
                    onClick={handlePassSubmit} />


            </div >
        </form>
    )
}

export default ChangePswForm