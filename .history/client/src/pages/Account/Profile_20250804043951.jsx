import axios from "axios"
import { API_BASEURL } from "Var/URLS"
import { useEffect, useState } from "react"
export default function Profile() {
    let [html,setHtml] = useState()
    async function getProfile(){
        let data = await axios.get((API_BASEURL + '/profile'),{withCredentials:true})
        return (data.data)
    }
    useEffect(async ()=>{
        let res = await getProfile()
        c(res)
    },[])
    return <>{'backend working only you can see the profile in the console'}</>
}