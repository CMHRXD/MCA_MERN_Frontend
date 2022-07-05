import PacientForm from "../components/PacientForm";
import { useState } from "react";
import { PacientTable } from "../components/PacientTable";

const PacientAdministrator = ({view}) => {
  
  return (
      <div className=" flex flex-col ">
        {view=="form" ? <PacientForm/> :<PacientTable />}
      </div>
  )
}

export default PacientAdministrator;