
import { useEffect } from 'react';
import { Outlet, Navigate, data } from 'react-router'
import { API_BASEURL } from 'Var/URLS';

const ProtectedRoutes = () => {
  let Auth =  window.sessionStorage.binar
  return  Auth == 'true' ? <Outlet /> : <Navigate to={'/login'} />
 }

export default ProtectedRoutes