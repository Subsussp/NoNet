import React from "react";
import { redirect, useLocation, useNavigate } from "react-router";
import { useState,useEffect } from "react";
import axios from "axios";
import { API_BASEURL, API_login_route as login_route,API_logoutURL as API_logoutURL ,API_register_route as register_route } from "Var/URLS";

const loginWithInstagram = () => {
    window.location.href ='https://www.facebook.com/v17.0/dialog/oauth?client_id=1164931302085404&redirect_uri=http://localhost:3001/auth/callback&scope=email,public_profile';
  };

const Account = ({login,setAuth,setuserR}) => {
    let navigate = useNavigate()
    const [formData, setFormData] = useState({});
    const [isLoading,setIsLoading] = useState(true)
    let location = useLocation()
    useEffect(()=>{
        window.localStorage.setItem('ref',location.pathname)
        if (window.sessionStorage.binar == 'true') {
            return navigate('/')
        }
            setIsLoading(false)
        },[])
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        let res = await axios.post(`${login ? login_route : register_route}`, formData, {
            withCredentials: true
        })
        let auth = await res.data
        if (login) {
            if (auth['us-va']) {
                window.sessionStorage.binar = 'true'
                setAuth(auth['us-va'])
                setuserR(auth['us-r'] =='cole' ? 'admin':'user')
                if (auth['us-r'] === 'cole') {
                    return navigate('/dashboard')
                }
                return navigate('/')
            }
   
        }
        alert(auth.msg)
        navigate('/login')
    };
    if (!isLoading) {
        return (
            <div className={`${login ? 'Login' : "Signup"}-container`}>
                <h2>{login ? 'Login' : "Signup"} </h2>
                <form onSubmit={handleSubmit} >
                    <label htmlFor="email" onChange={handleChange}>Email:</label>
                    <input type="email" onChange={handleChange} id="email" name="email" required></input>
                    <label htmlFor="password" onChange={handleChange}>Password:</label>
                    <input type="password" onChange={handleChange} id="password" name="psswd" required></input>
                    {!login ? <>
                <label htmlFor="username">Username:</label>
                <input type="text" onChange={handleChange} id="username" name="username" required/>
                <input type="tel" onChange={handleChange} id="Phonenumber" name="Phonenumber" placeholder="Phonenumber"required/></> : <></> }
                    <button type="submit" >{login ? 'Login' : "Signup"}</button>
                </form>
            </div>
        )
    }
}

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
export {Account ,Logout} 