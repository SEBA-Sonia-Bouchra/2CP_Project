import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.jsx'
import EmailVerification from './pages/EmailVerification.jsx'
import EmailVerificationApproval from './pages/EmailVerificationApproval.jsx';
import AccountRequest from './pages/AccountRequest.jsx';
import RejectRequest from './pages/RejectRequest.jsx';
import NavbarNormal from './components/NavbarNormal.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<SignUpPage/>}/>
      <Route path='email' element={<EmailVerification/>}/>
      <Route path='access' element={<EmailVerificationApproval/>}/>
      <Route path='account-request' element={<AccountRequest/>}/>
    </Route>
  )
  );


export default function App() {
    return <RouterProvider router={router} />;
}
