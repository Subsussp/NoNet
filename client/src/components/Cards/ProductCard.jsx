import {useState,useEffect, memo} from "react";
import {Update} from 'pages/Admin/EditHandling'; 
import  Delete from "pages/Admin/Delete";
import axios from "axios";
import { Link } from "react-router-dom";
import Mybutton from 'components/ui/Button'
import Add_to_cart from "pages/Root/Shop/Item/ADD_to_cart";
import { API_PRODUCTS } from "Var/URLS";
const Item = ({item, deletefromlist}) => {
  const [formData, setFormData] = useState({
        _id: item._id,
        name: item.name,
        price: item.price,
        catg: item.catg,
        img: item.img,
        material: item.material,
        quantity: item.quantity,
        desc:item.desc
    });
    const [formData2, setFormData2] = useState({
        _id: item._id,
        name: item.name,
        price: item.price,
        catg: item.catg,
        img: item.img,
        material: item.material,
        quantity: item.quantity,
        desc:item.desc
    });
    return (

<div className="item-container">
      <div className="image-container">
        <img draggable='false'
          src={formData2.img[0]}
          alt={`${formData2.name} photo`}
          className={`product-image${formData2.img[1] ? 'opacity-100 group-hover:opacity-0' : ''}`}
        />
          <div> 
          {formData2.img.forEach((img,i)=>{
            if(i === 0){return ''}
            return <img draggable='false'
            src={img}
            alt={`${formData2.name} photo`}
            className={`ghost product-image w-full object-cover opacity-0 group-hover:opacity-100`}
          /> }
          )}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap w-full" >
        <Link to={`/items/${formData2._id}`}>
          <div className="product-card-name">
            <dd className="font-medium">{formData2.name}</dd>
          </div>
        </Link>
        <p className="price">${formData2.price}</p>
          {/* {<h1> InStock: {formData2.quantity}</h1>} */}
      </div>
          {/* <p className="font-medium mat">{formData2.material}</p> */}
          {/* <p className="font-medium catg">{formData2.catg}</p> */}
      {<div className={`add-tocart`}><Add_to_cart text={'Add to Cart'} itemid={item._id}/></div>}
              {/* {<> <Delete  handledeletion={deletefromlist} Config={{url:`${API_PRODUCTS}/${item._id}`}}  /> </>}  */}
      
</div>
)
}

export default Item ;