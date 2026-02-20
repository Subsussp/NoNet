import { API_logoutURL as API_logoutURL} from "Var/URLS";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = ({setAuth,setuserR}) => {
    let navigate = useNavigate()
    useEffect(() => {
        axios.get(API_logoutURL, { withCredentials: true }).then((res) => {
            setuserR('')
            setAuth('')
            window.sessionStorage.binar = 'false'
            return navigate('/');
        })
    }, [])
    return  <></>
}
export default Logout