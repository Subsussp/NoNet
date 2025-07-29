// const API_BASEURL = `http://192.168.1.6:3001`

const API_BASEURL = process.env.REACT_APP_BEURL;
const API_PRODUCTS = `${API_BASEURL}/items`
const API_ADMIN = `${API_BASEURL}/admin`
// const API_logoutURL = `http://192.168.1.16:3001/logout`
const API_logoutURL = `${API_BASEURL}/logout`
// let API_login_route = `http://192.168.1.16:3001/login`
let API_login_route = `${API_BASEURL}/login`
// let API_register_route = `http://192.168.1.16:3001/register`
let API_register_route = `${API_BASEURL}/register`

export {API_ADMIN,API_BASEURL,API_PRODUCTS,API_login_route,API_logoutURL,API_register_route} 