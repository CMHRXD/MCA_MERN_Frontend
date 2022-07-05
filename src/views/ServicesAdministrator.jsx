import React from 'react'
import ServiceForm from '../components/ServiceForm'
import ServiceTable from '../components/ServiceTable'

const ServicesAdministrator = ({view}) => {
  return (
    <div className=''>
      {view=="form" ? <ServiceForm /> : <ServiceTable />}
    </div>
  )
}

export default ServicesAdministrator