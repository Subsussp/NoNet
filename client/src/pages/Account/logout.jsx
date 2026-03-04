import { API_logoutURL as API_logoutURL} from "Var/URLS";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = ({setAuth,setuserR}) => {
    let navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token"); 
        axios.get(API_logoutURL, { withCredentials: true,  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
  },}).then((res) => {
            setuserR('')
            setAuth('')
            localStorage.setItem("token", null);
            window.sessionStorage.binar = 'false'
            return navigate('/');
        })
    }, [])
    return  <></>
}
export default Logout