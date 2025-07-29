import { Link } from "react-router-dom";

export default function Add_to_cart({text, itemid,classna}) {
    return (<Link className='w-full block' to={`/cart/add-to-cart?pr_id=${itemid}`}>{text}</Link>)
} 





