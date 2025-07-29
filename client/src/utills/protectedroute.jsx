
import { Outlet, Navigate } from 'react-router'


const ProtectedRoutes = () => {
  let Auth =  window.sessionStorage.binar
  return  Auth == 'true' ? <Outlet /> : <Navigate to={'/login'} />
 }

export default ProtectedRoutes