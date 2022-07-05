import React from 'react';
import DateForm from '../components/DateForm';
import DateTable from '../components/DateTable';

const DatesAdministrator = ({view}) => {
  return (
    <div className=''>
      {view=="form" ? <DateForm /> : <DateTable />}
    </div>
  )
}

export default DatesAdministrator;