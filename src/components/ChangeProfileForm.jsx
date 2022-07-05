import {useState, useEffect} from 'react';
import useAuth from "../hooks/useAuth";
import swal from "sweetalert";

const ChangeProfileForm = () => {

    const [profile , setProfile] = useState({});
    const { auth , updateProfile} = useAuth();
    
    useEffect(() => {
        setProfile(auth);
    }, [auth]);

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        if (profile === auth) {
            swal("No se ha realizado ningun cambio", "", "info");
            return;
        }
        const { _id, name, email, cell, web } = profile;
        if (name === "" || email === "" || cell === "") {
            swal("Error", "Campos Vacios", "error");
            return;
        }
        updateProfile(profile)
    }


    return (
        <form className='flex justify-center items-center mt-5 md:mt-32'>
            <div className='bg-gradient-to-t from-[#130e5f] to-[#210c7e] shadow-lg p-5 w-[800px] rounded-lg'>
                <h1 className='text-xl font-bold text-center text-white mb-10 border-b-2 p-3 border-blue-500'>Editar Perfil</h1>

                <div className='mb-5 border-b-2 flex border-blue-400'>
                    <input type="text" maxLength={30} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="name" name="name" placeholder="Nombre"
                        value={ profile.name || ''}
                        onChange={ (e) => setProfile({ ...profile, [e.target.name]: e.target.value }) }
                    />
                </div>

                <div className='mb-5 border-b-2 flex border-blue-400'>
                    <input type="email" maxLength={30} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="email" name="email" placeholder="Email"
                        value= { profile.email || '' }
                        onChange={ (e) => setProfile({ ...profile, [e.target.name]: e.target.value }) }
                    />
                </div>

                <div className='mb-5 border-b-2 flex border-blue-400'>
                    <input type="number" maxLength={10} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="telefono" name="telefono" placeholder="Telefono"
                        value={ profile.cell || '' }
                        onChange={ (e) => setProfile({ ...profile, [e.target.name]: e.target.value }) }
                    />
                </div>

                <div className='mb-5 border-b-2 flex border-blue-400'>
                    <input type="text" maxLength={10} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="web" name="web" placeholder="Sitio Web"
                        value={ profile.web || '' }
                        onChange={ (e) => setProfile({ ...profile, [e.target.name]: e.target.value }) }
                    />
                </div>


                <input type="submit" value="Guardar Cambios"
                    className=' bg-transparent border-2 rounded-lg w-full hover:bg-blue-900 cursor-pointer transition-colors checked: p-3 mt-5 uppercase text-white'
                    onClick={handleProfileSubmit} />

            </div >
        </form>
    )
}

export default ChangeProfileForm