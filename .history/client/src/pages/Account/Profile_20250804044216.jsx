import axios from "axios"
import { API_BASEURL } from "Var/URLS"
import { useEffect, useState } from "react"
export default function Profile() {
    async function getProfile(){
        let data = await axios.get((API_BASEURL + '/profile'),{withCredentials:true})
        if(data?.data){
            return (data.data)
        }el
    }
    useEffect(async ()=>{
        let res = await getProfile()
        console.log(res)
    },[])
    return <>{'backend working only you can see the profile in the console'}</>
}