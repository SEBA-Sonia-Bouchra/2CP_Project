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
import EditorToolbar from './components/EditorToolbar.jsx'
import EditProject from './components/EditProject.jsx'
import Home_page_opened_for_the_first_time from "./pages/home_page_opened_for_the_first_time.jsx";
import Home_page from "./pages/home_page.jsx";
import Myprojects from "./pages/myprojects.jsx";
import Mycontributions from "./pages/Mycontributions.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
  <>
      {<Route index element={<LandingPage/>}></Route>}
      {<Route path='/signup' element={<SignUpPage/>}></Route>}
      {<Route path='/signin' element={<Signinpage/>}></Route>}
      {<Route path='/forgot-password' element={<ForgotPassword/>}></Route>}
      {<Route path='/verify-code' element={<VerifyCode/>}></Route>}
      {<Route path='/email-verification' element={<EmailVerification/>}></Route>}
      {<Route path='/email-approval' element={<EmailVerificationApproval/>}></Route>}
      {<Route path='/set-new-password' element={<SetNewPassword/>}></Route>}
      {<Route path='/request-review' element={<AccountRequest/>}></Route>}
      {<Route path='/request-rejected' element={<RejectRequest/>}></Route>}
      {<Route path="/" element={<MainLayout/>}>
        <Route path="/My_Projects" element={<Myprojects />} />
        <Route path="/profile-page" element={<ProfileModificationProfessional />} />
        <Route path="/home_page" element={<Home_page />} />
        <Route path="/My_contributions" element={<Mycontributions />} />
        <Route path='/accounts' element={<AccountsPage/>} />
       {/* <Route index element={<EditProject/>}/>*/}
      </Route>}
  </>
  )
  );

export default function App() {
  return <RouterProvider router={router} />;
}
