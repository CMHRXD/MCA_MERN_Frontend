//User Profile Panel
import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import swal from "sweetalert"

const Profile = () => {
    const { auth , updateProfile, updatePassword} = useAuth();
    const [showFormProfile, setShowFormProfile] = useState(false);
    const [showFormPass, setShowFormPass] = useState(false);
    const [profile, setProfile] = useState({});
    const [password, setPassword] = useState({
        pa:'',
        pn:'',
    });

    const { _id, name, email, cell, web } = auth;

    useEffect(() => {
        setProfile(auth);
    }, [auth]);


    const handleProfileSubmit = (e) => {
        e.preventDefault();
        if(profile === auth){
            swal("No se ha realizado ningun cambio", "", "info");
            return;
        }
        const {_id, name, email, cell, web } = profile;
        if (name === "" || email === "") {
            swal("Error", "Campos Vacios", "error");
            return;
        }
        updateProfile(profile)

        setShowFormProfile(false);
    }

    const handlePassSubmit = (e) => {
        e.preventDefault();
        if(password.pa === "" || password.pn === ""){
            swal("Error", "Campos Vacios", "error");
            return;
        }
        updatePassword(password);
    }

    return (
        <div className='container mx-auto'>
            <div className="bg-white p-3 border-4 border-slate-400 mb-5 flex flex-col items-center">
                <h1 className="text-3xl font-bold uppercase text-slate-700 text-center  border-b-2">Perfil</h1>
                <div className="flex flex-col gap-4 mt-5">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <p className=" text-xl font-bold text-slate-700">Nombre:
                            <span className="font-normal text-lg text-slate-700"> {name}</span>
                        </p>
                        <p className=" text-xl font-bold text-slate-700">Email:
                            <span className=" font-normal text-lg text-slate-700"> {email}</span>
                        </p>
                        <p className=" text-xl font-bold text-slate-700">Cell:
                            <span className=" font-normal text-lg text-slate-700"> {cell}</span>
                        </p>
                        <p className=" text-xl font-bold text-slate-700">Web:
                            <span className=" font-normal text-lg text-slate-700"> {web}</span>
                        </p>

                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between">

                <button type="button"
                    className={` bg-slate-700 hover:bg-slate-800 cursor-pointer transition-colors p-3 mx-10 uppercase text-white rounded-md md:hidden`}
                    onClick={() => { setShowFormProfile(!showFormProfile) }}>
                    {`${showFormProfile ? "Ocultar Formulario" : "Editar Perfil"}`}
                </button>
                <div className={`${showFormProfile ? "block" : "hidden"} mr-0 md:mr-10 mb-5 md:block md:w-1/2 lg:w-3/5`}>
                    <h1 className="text-2xl font-bold uppercase text-slate-700 text-center mb-2">Editar Perfil</h1>
                    <form action="" className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md  border-4 border-slate-400">

                        <label htmlFor="name" className="block text-gray-700 text-base font-bold mb-2 uppercase">Nombre</label>
                        <input type="text" id="name" name="name" className="border border-slate-400 p-2 w-full rounded-lg"
                            value={profile.name || ''}
                            onChange={e => setProfile({ ...profile, [e.target.name]: e.target.value })} />

                        <label htmlFor="email" className="block text-gray-700 text-base font-bold mb-2 uppercase">Email</label>
                        <input type="text" id="email" name="email" className="border border-slate-400 p-2 w-full rounded-lg"
                            value={profile.email || ''}
                            onChange={e => setProfile({ ...profile, [e.target.name]: e.target.value })} />

                        <label htmlFor="cell" className="block text-gray-700 text-base font-bold mb-2 uppercase">Telefono</label>
                        <input type="number" id="cell" name="cell" className="border border-slate-400 p-2 w-full rounded-lg"
                            value={profile.cell || ''}
                            onChange={e => setProfile({ ...profile, [e.target.name]: e.target.value })} />

                        <label htmlFor="web" className="block text-gray-700 text-base font-bold mb-2 uppercase">Web</label>
                        <input type="text" id="web" name="web" className="border border-slate-400 p-2 w-full rounded-lg"
                            value={profile.web || ''}
                            onChange={e => setProfile({ ...profile, [e.target.name]: e.target.value })} />

                        <button id="profileBtn" className=' bg-slate-700 w-full hover:bg-slate-800 cursor-pointer transition-colors checked: p-3 uppercase text-white mt-4'
                            onClick={handleProfileSubmit}>Guardar Cambios</button>

                    </form>
                </div>

                <button type="button"
                    className={` bg-slate-700 hover:bg-slate-800 cursor-pointer transition-colors p-3 mx-10 mt-3 uppercase text-white rounded-md md:hidden`}
                    onClick={() => { setShowFormPass(!showFormPass) }}>
                    {`${showFormPass ? "Ocultar Formulario" : "Cambiar Contraseña"}`}
                </button>
                <div className={`${showFormPass ? "block" : "hidden"} md:block md:w-1/2 lg:w-2/5`}>
                    <h1 className="text-2xl font-bold uppercase text-slate-700 text-center mb-2">Editar Password</h1>
                    <form action="" className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md  border-4 border-slate-400">
                        <label htmlFor="password" className="block text-gray-700 text-base font-bold mb-2 uppercase">Password Actual</label>
                        <input type="password" name="pa" id="password" className="border border-slate-400 p-2 w-full rounded-lg"
                            value={password.pa || ''}
                            onChange={e=> setPassword( {...password, [e.target.name]:e.target.value })} />

                        <label htmlFor="cpassword" className="block text-gray-700 text-base font-bold mb-2 uppercase">Nuevo Passowrd</label>
                        <input type="password" name="pn" id="cpassword" className="border border-slate-400 p-2 w-full rounded-lg"
                            value={password.pn || ''} 
                            onChange={e=> setPassword( {...password, [e.target.name]:e.target.value })}/>

                        <button className=' bg-slate-700 w-full hover:bg-slate-800 cursor-pointer transition-colors checked: p-3 uppercase text-white mt-4'
                            onClick={handlePassSubmit}>Actualizar Contraseña</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Profile