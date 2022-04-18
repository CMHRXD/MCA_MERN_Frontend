import React from 'react'
import usePacients from "../hooks/usePacients";

const PacientsList = () => {

  const { pacients,editPacient, deletePacient, dateFormat} = usePacients();

  return (
    <>
      {pacients.length > 0 ?
        (<>
          <h1 className=" text-lg text-slate-700 font-bold uppercase text-center mt-5 md:mt-0">Listado de Pacientes</h1>

          <div className=" container relative overflow-x-auto shadow-md sm:rounded-lg mx-0 md:mx-10 mt-10 hidden md:block">

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">Cedula</th>
                  <th scope="col" className="px-6 py-3">Nombre</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Fecha de Consulta</th>
                  <th scope="col" className="px-6 py-3">Sintomas</th>

                  <th scope="col" className="px-6 py-3">Edicion
                    <span className="sr-only">Editar</span>
                    <span className="sr-only">Eliminar</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pacients.map(pacient => {

                  const { _id, c_i, name, email, consult_date, symptom } = pacient;
                  return (

                    <tr key={_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{c_i}</th>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{name}</th>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{email}</th>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{dateFormat(consult_date)}</th>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{symptom}</th>
                      <td className="px-6 py-4 text-center">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={()=>editPacient(pacient)}>Editar</a><br />
                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=>deletePacient(_id)}>Eliminar</a>
                      </td>
                    </tr>

                  );
                })}
              </tbody>
            </table>
          </div>
          {pacients.map(pacient => {
              const { _id, c_i, name, email, consult_date, symptom } = pacient;
              return (
                  <div className=" bg-white py-10 mx-5 my-10 shadow-md rounded-lg block md:hidden" key={_id}>
                      <p className='font-bold uppercase text-slate-700 mx-3'>Cedula:
                        <span className="font-normal normal-case text-slate-700"> {c_i}</span>
                      </p>
                      <p className='font-bold uppercase text-slate-700 mx-3'>Nombre:
                        <span className="font-normal normal-case text-slate-700"> {name}</span>
                      </p>
                      <p className='font-bold uppercase text-slate-700 mx-3'>Email:
                        <span className="font-normal normal-case text-slate-700"> {email}</span>
                      </p>
                      <p className='font-bold uppercase text-slate-700 mx-3'>Fecha de Consulta:
                        <span className="font-normal normal-case text-slate-700"> {dateFormat(consult_date)}</span>
                      </p>
                      <p className='font-bold uppercase text-slate-700 mx-3'>Sintomas
                        <span className="font-normal normal-case text-slate-700"> {symptom}</span>
                      </p>
                      <div className=' flex justify-between mx-3 my-5'>
                        <button className='  uppercase bg-slate-700 hover:bg-slate-800 py-2 px-10 rounded-lg text-white text-sm' onClick={()=>editPacient(pacient)}>Editar</button>

                        <button className='  uppercase bg-red-700 hover:bg-red-800 py-2 px-10 rounded-lg text-white text-sm' onClick={()=>deletePacient(_id)}>Eliminar</button>
                      </div>
                  </div>

              );
          })}
        </>
        ) : (
          <>
            <h1 className=" text-lg text-slate-700 font-bold uppercase text-center ">No hay pacientes</h1>

          </>
        )}
    </>
  )
}

export default PacientsList;