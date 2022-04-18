import { useContext  } from "react"; //to extract data from context
import  AuthContext  from "../context/AuthContextProvider"; // the context


const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;