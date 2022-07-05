import React from 'react';
import ConsultTable from '../components/ConsultTable';
import ConsultForm from '../components/ConsultForm';

const ConsultAdministrator = ({view}) => {
  return (
    <div>
      {view === "table" ? <ConsultTable /> : <ConsultForm />}
    </div>
  )
}

export default ConsultAdministrator;