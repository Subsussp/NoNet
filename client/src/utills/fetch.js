import axios from 'axios'
import { API_BASEURL, API_PRODUCTS } from 'Var/URLS'


export const fetchitems =async () =>{
  const token = localStorage.getItem("token"); 
  let res = await fetch((API_PRODUCTS), { method: 'get', credentials: 'include' ,
      ...(token && { Authorization: `Bearer ${token}` }),
    })
  let data = await res.json()
  return data

}