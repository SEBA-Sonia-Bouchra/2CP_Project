import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Routes, Router} from 'react-router-dom'
import LandingPage from './LandingPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import EmailVerification from './pages/EmailVerification.jsx'
import EmailVerificationApproval from './pages/EmailVerificationApproval.jsx';
import AccountRequest from './pages/AccountRequest.jsx';
import RejectRequest from './pages/RejectRequest.jsx';
import ProfileModification from './pages/ProfileModification.jsx';
import ProfileModificationProfessional from './pages/ProfileModificationProfessional.jsx';
import AccountsPage from './pages/AccountsPage.jsx';
import VerifyCode from './pages/verifycode.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import SetNewPassword from './pages/setnewpassword.jsx';
import Signinpage from './pages/signinpage.jsx';
import OpenedProjectPage from './pages/OpenedProjectPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import EditorToolbar from './components/EditorToolbar.jsx';
import EditProject from './components/EditProject.jsx';
import Home_page from "./pages/home_page.jsx";
import Myprojects from "./pages/myprojects.jsx";
import Mycontributions from "./pages/Mycontributions.jsx";
import EditorPage from "./pages/EditorPage.jsx"
import TermsPage from "./pages/termsandpolicypage.jsx";
import SearchPage from './pages/searchpage.jsx';
import GoogleCallback from './components/SideBar/GoogleCallback.jsx';
import OAuthSuccess from './pages/OAuthSuccess';
import AboutUsPage from './pages/AboutUsPage.jsx';
import Profile from './pages/Profile.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
  <>
      {<Route index element={<LandingPage/>}></Route>}
      {<Route path='/signup' element={<SignUpPage/>}></Route>}
      {<Route path='/signin' element={<Signinpage/>}></Route>}
      {<Route path='/forgot-password' element={<ForgotPassword/>}></Route>}
      {<Route path='/verify-code' element={<VerifyCode/>}></Route>}
      {<Route path='/set_new_password' element={<SetNewPassword/>}></Route>}
      {<Route path='/email-verification' element={<EmailVerification/>}></Route>}
      {<Route path='/email-approval' element={<EmailVerificationApproval/>}></Route>}
      {<Route path='/set-new-password' element={<SetNewPassword/>}></Route>}
      {<Route path='/request-review' element={<AccountRequest/>}></Route>}
      {<Route path='/request-rejected' element={<RejectRequest/>}></Route>}
      {<Route path="/new-project" element={<EditorPage />} />}
      {<Route path="/projects/:id/edit" element={<EditorPage />} />}
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      {<Route path="/" element={<MainLayout/>}>
        <Route path="/home_page" element={<Home_page />} />
        <Route path='/accounts' element={<AccountsPage/>} /> 
        <Route path="/My_Projects" element={<Myprojects />} />
        <Route path="/My_contributions" element={<Mycontributions />} /> 
        <Route path="/profile-page" element={<ProfileModification />} />
        <Route path="/profile-page-professional" element={<ProfileModificationProfessional />} />
        <Route path="/projects/:id" element={<OpenedProjectPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/About_Us" element={<AboutUsPage />} />
        <Route path="/see-profile/:id" element={<Profile />} />
      </Route>}
  </>
  )
);

export default function App() {
  return <RouterProvider router={router}/>;
}
