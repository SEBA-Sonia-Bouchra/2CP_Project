import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Routes,
  Router
} from 'react-router-dom'
import LandingPage from './LandingPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import EmailVerification from './pages/EmailVerification.jsx'
import EmailVerificationApproval from './pages/EmailVerificationApproval.jsx';
import AccountRequest from './pages/AccountRequest.jsx';
import RejectRequest from './pages/RejectRequest.jsx';
import ProfileModification from './pages/ProfileModification.jsx';
import ProfileModificationProfessional from './pages/ProfileModificationProfessional.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx'
import AccountsPage from './pages/AccountsPage.jsx';
import VerifyCode from './pages/verifycode.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import SetNewPassword from './pages/setnewpassword.jsx'
import Signinpage from './pages/signinpage.jsx'
import MainLayout from './layouts/MainLayout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
  <>
    <Route path="/" element={<MainLayout/>}>
      { <Route index path='/accounts' element={<AccountsPage />} /> }
    </Route>
    <Route>
      {/*<Route index element={<LandingPage/>}></Route>}
      {<Route path='/signup' element={<SignUpPage/>}></Route>}
      {<Route path='/signin' element={<Signinpage/>}></Route>}
      {<Route path='/forgot-password' element={<ForgotPassword/>}></Route>}
      {<Route path='/email-verification' element={<EmailVerification/>}></Route>}
      {<Route path='/email-approval' element={<EmailVerificationApproval/>}></Route>}
      {<Route path='/request-review' element={<AccountRequest/>}></Route>}
      {<Route path='/request-rejected' element={<RejectRequest/>}></Route>*/}
    </Route>
  </>
  )
  );

export default function App() {
  return <RouterProvider router={router} />;
}
