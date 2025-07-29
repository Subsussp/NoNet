import { Outlet, Navigate } from 'react-router'

const PrivateRoutes = ({userR:Auth}) => {
    return Auth == 'admin' ? <Outlet /> : <Navigate to={'/'} /> 
}
export default PrivateRoutes
