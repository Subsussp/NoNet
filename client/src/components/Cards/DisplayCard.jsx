import { useContext } from "react"
import { Shopcontext } from "pages/Root/Shop/Shop";
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const DisplayList = ({Catg,smallsize}) => {
    let data = useContext(Shopcontext)
    if(!data){
        return
    }
    let items = data 
    let i;
    if(Catg){
        i = items.filter((item) =>(item.catg).replaceAll(' ') == Catg.replaceAll(' ')).map((item)=><DisplayCard item={item} key={item._id} ></DisplayCard>)
        i = i[0]
      }  
    return ((i != '' ) ? <>{i}</> : <h1>No Products</h1>)
}

const DisplayCard = ({item}) => {
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
<div className="h-[450px] w-[450px] relative">
      <div className="w-full h-full">
        <img draggable='false'
          src={formData2.img[0]}
          alt={`${formData2.name} photo`}
          className={`w-full h-full object-cover product-image`}
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
      <Link to={`/Store/?catg=${formData2.catg}`} >
          <p className="font-semibold left-[50%] w-full -translate-x-1/2 -translate-y-1/2 text-[length:var(--thirdegreesize)] font-Main absolute text-center top-[50%] text-one sSh ">{formData2.catg}</p>
          </Link>
</div>
)
}

export default DisplayList ;