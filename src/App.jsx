import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Layouts
import Auth_Layout from './views/layout/Auth_Layout';
import Protected_Layout from './views/layout/Protected_Layout';

//publics views
import Login from './views/Login';
import SignUp from './views/SignUp';
import ConfirmAccount from './views/ConfirmAccount';
import PswForgot from './views/PswForgot';
import NewPassword from './views/NewPassword';

//Protected Views
import PacientAdministrator from './views/PacientAdministrator';
import ProductAdministrator from './views/ProductAdministrator';
import DatesAdministrator from './views/DatesAdministrator';
import ServicesAdministrator from './views/ServicesAdministrator';
import ConsultAdministrator from './views/ConsultAdministrator';
//Profile Views
import ProfileAdministrator from './views/ProfileAdministrator';


//Import Context
import { AuthContextProvider } from './context/AuthContextProvider';
import { PacientContextProvider } from './context/PacientContextProvider';
import { ProductContextProvider } from './context/ProductContextProvider';
import { ServiceContextProvider } from './context/ServiceContextProvider';
import { DatesContextProvider } from './context/DatesContextProvider';
import { ConsultContextProvider } from './context/ConsultContextProvider';



//Las variables de entorno en Vite siempre deben iniciar con VITE_VARIABLE_NAME
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <PacientContextProvider>
          <ProductContextProvider>
            <ServiceContextProvider>
              <DatesContextProvider>
                <ConsultContextProvider>

                  <Routes>
                    <Route path="/" element={<Auth_Layout />}>
                      <Route index element={<Login />} />
                      <Route path='signUp' element={<SignUp />} />
                      <Route path='confirmAccount/:token' element={<ConfirmAccount />} />
                      <Route path='passwordForgot' element={<PswForgot />} />
                      <Route path='passwordForgot/:token' element={<NewPassword />} />
                    </Route>


                    <Route path='/admin' element={<Protected_Layout />}>
                      <Route path='dates-table' element={<DatesAdministrator view={"table"} />} />
                      <Route path='dates-form' element={<DatesAdministrator view={"form"} />} />
                      <Route path='pacients-table' element={<PacientAdministrator view={"table"} />} />
                      <Route path='pacients-form' element={<PacientAdministrator view={"form"} />} />
                      <Route path='products-table' element={<ProductAdministrator view={"table"} />} />
                      <Route path='products-form' element={<ProductAdministrator view={"form"} />} />
                      <Route path='services-table' element={<ServicesAdministrator view={"table"} />} />
                      <Route path='services-form' element={<ServicesAdministrator view={"form"} />} />
                      <Route path='consults-table' element={<ConsultAdministrator view={"table"} />} />
                      <Route path='consults-form' element={<ConsultAdministrator view={"form"} />} />
                      <Route path='profile-edit' element={<ProfileAdministrator view={"profile"}/>} />
                      <Route path='profile-pswd-edit' element={<ProfileAdministrator  view={"pswd"} />} />
                    </Route>
                  </Routes>

                </ConsultContextProvider>
              </DatesContextProvider>
            </ServiceContextProvider>
          </ProductContextProvider>
        </PacientContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App;
