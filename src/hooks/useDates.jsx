import {useContext} from 'react';
import  DatesContext from '../context/DatesContextProvider';

const useDates = () => {
  return useContext(DatesContext);
}

export default useDates;