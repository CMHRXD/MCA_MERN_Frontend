import { useContext } from 'react';
import  ConsultContext from '../context/ConsultContextProvider';

const useConsult = () => {
    
    return useContext(ConsultContext);
}

export default useConsult;