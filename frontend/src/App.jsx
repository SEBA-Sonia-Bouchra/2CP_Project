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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/*  <Route index element={<AccountsPage />} /> */}
      {/* <Route index element={<LandingPage />} /> */} 
      {/* <Route path="/verify-code" element={<VerifyCode />} /> */}
      {/* <Route path="/signup" element={<SignUpPage/>} /> */}
      {/* <Route path="/signin" element={<Signinpage/>} /> */}
      {/* <Route path="/landin_gpage" element={<LandingPage />} /> */}
      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      {/* <Route path="/set_new_password" element={<SetNewPassword />} /> */}
      {/* <Route path="/Email_verify" element={<EmailVerification />} /> */}
      {/* <Route path="/Email_approved" element={<EmailVerificationApproval />} /> */}
      {/* <Route path="/account-request" element={<AccountRequest />} />     */}
      <Route index element={<ProfileModificationProfessional/>}/>
      </Route>
  )
  );

export default function App() {
  return <RouterProvider router={router} />;
}
