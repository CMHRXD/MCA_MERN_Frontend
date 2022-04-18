import { useContext } from "react";
import PacientContext from "../context/PacientContextProvider";

const usePacients = () => {
    return useContext(PacientContext);
};

export default usePacients;