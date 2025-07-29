import { Link } from "react-router-dom"
let Mybutton = ({href,classna,name}) =>{
    return (<Link to={href} className={classna}>{name}</Link>)
}
export default Mybutton