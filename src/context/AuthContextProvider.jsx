//Provider es la fuente de donde vienen todos los datos.
import { useState, useEffect, createContext } from "react";
import AxiosClient from "../config/axios";
import swal from "sweetalert";

const AuthContext = createContext(); //create a context
export const AuthContextProvider = ({ children }) => { //The function allways have to name AuthContextProvider and have to have children or else it will not work.

    const [auth,setAuth] = useState({});
    const [loading,setLoading] = useState(true);


    useEffect(() => {
        const autenticateUser = async () => {
            const userToken = localStorage.getItem('aph_token');
            if(!userToken){
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                }
            };
            try {
                const {data} = await AxiosClient.get('doctors/profile', config);
                setAuth(data);

            } catch (error) {
                console.log(error.response.data.msg)   
            }
            setLoading(false);
        }
        autenticateUser();
    },[]);

    const updateProfile = async (profile) => {
        const userToken = localStorage.getItem('aph_token');
        if(!userToken){
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };
        try {
            const {data} = await AxiosClient.put(`doctors/profile/${profile._id}`, profile, config);
            setAuth(data);
            swal("Perfil Actualizado", "", "success");
        } catch (error) {
            swal("Error", error.response.data.msg, "error");
        }
    }
    const updatePassword = async (password) => {
        console.log(password);
        const userToken = localStorage.getItem('aph_token');
        if(!userToken){
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };
        try {
            const {data} = await AxiosClient.put(`doctors/password-update`, password, config);
            const msg = data.msg;
            swal(msg, "", "success");
        }
        catch (error) {
            swal("Error", error.response.data.msg, "error");
        }
    }

    const logout = () => {
        localStorage.removeItem('aph_token');
        setAuth({});
    }

    return(
        <AuthContext.Provider value={{auth,setAuth,loading,logout, updateProfile,updatePassword}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
