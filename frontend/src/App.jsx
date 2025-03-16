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
import ProfileModification from './pages/ProfileModification.jsx';
import ProfileModificationProfessional from './pages/ProfileModificationProfessional.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<ProfileModification/>}/>
    </Route>
  )
  );

export default function App() {
  return <RouterProvider router={router} />;
}
