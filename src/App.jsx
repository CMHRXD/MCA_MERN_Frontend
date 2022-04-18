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
import NewPassword  from './views/NewPassword';

//Protected Views
import PacientAdministrator from './views/PacientAdministrator';
//Profile Views
import Profile from './views/Profile';

//Import Context
import {AuthContextProvider} from './context/AuthContextProvider';
import { PacientContextProvider } from './context/PacientContextProvider';



//Las variables de entorno en Vite siempre deben iniciar con VITE_VARIABLE_NAME
function App() {
  return (
    <BrowserRouter>
        <AuthContextProvider>
            <PacientContextProvider>
                <Routes>
                    <Route  path="/" element={ <Auth_Layout/> }>
                            <Route index element={ <Login/> }/>
                            <Route path='signUp' element={ <SignUp/> }/>
                            <Route path='confirmAccount/:token' element={<ConfirmAccount/>}/>
                            <Route path='passwordForgot' element={ <PswForgot/> }/>
                            <Route path='passwordForgot/:token' element={ <NewPassword/> }/>
                    </Route>

                    
                      <Route  path='/admin' element={<Protected_Layout/>}>
                          <Route index element= { <PacientAdministrator/> }/>
                          <Route path='profile' element= {<Profile/>} />
                      </Route>
                </Routes>
            </PacientContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App;
