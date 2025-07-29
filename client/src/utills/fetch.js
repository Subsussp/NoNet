import axios from 'axios'
import { API_BASEURL, API_PRODUCTS } from 'Var/URLS'


export const fetchitems =async () =>{
  let res = await fetch((API_PRODUCTS), { method: 'get', credentials: 'include' })
  let data = await res.json()
  return data

}