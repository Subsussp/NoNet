import axios from "axios"
import { useEffect, useState } from "react"
import {API_ADMIN} from "Var/URLS"

const Users = () => {
    let [load,setLoad] = useState(false)
    let [Users,setUsers] = useState([])
    useEffect(() => {
        axios.get(API_ADMIN + '/Users', { withCredentials: true }).then((res) => {
            setUsers(res.data)
            setLoad(true)
        })
    },[])
    return load ? (
        <>
            design
            {Users.map((user) => {
                user.Phonenumber = user.Phonenumber
            let li = <li style={{ listStyle: 'none' }} key={user._id}> <h4>{user.name}</h4> <h4>{user.Phonenumber}</h4> </li>
            return li
            })}
    </>
    ): <></>
}

export default Users