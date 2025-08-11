import { useEffect, useState } from "react"
import Add_to_cart from "../Root/Shop/Item/ADD_to_cart"

export default function ProductPage({data,refe}) {
    window.localStorage.setItem('ref',`/items/${refe}`)
    let [photos,setPhotos] = useState([])
    let colors = ['black','#4DA1A9','pink']
    useEffect(()=>{
        let photoarr = []
        if(data.img){
            data.img.forEach((e)=>e ? photoarr.push(e) : '')
        }
        setPhotos(photoarr)
    },[data])
    if(data.img.length < 1){
        return <></>
    }
    return(
        <div className='item-pg'>
            <div className='itemimg-container'><img className="Item-img" src={photos[0]}></img></div>
            <div className="item-details">
                <h1>{data.name} </h1>
                <div className="row1">
                    <h2>Material</h2><span>{data.material}</span>
                </div>
                <div className="row2">
                    <h2>Category</h2><span>{data.catg}</span>
                </div>
                <div>
                <div className="Color">
                    <h3>Colors</h3>
                    {colors.map((color)=><span key={color} onClick={()=>alert(color)} style={{'width':'40px','height':'40px','backgroundColor':`${color}`,'borderRadius':'50%'}}></span>)}
                </div>
                <div className="Description">
                    <h1>Description</h1>
                    <p>{data.desc}This is like shit product and here is the test butcg butch asd ie fa hasdgjas This is like shit product and here is the test butcg butch asd ie fa hasdgjas This is like shit product and here is the test butcg butch asd ie fa hasdgjas This is like shit product and here is the test butcg butch asd ie fa hasdgjas This is like shit product and here is the test butcg butch asd ie fa hasdgjas This is like shit product and here is the test butcg butch asd ie fa hasdgjas This is like shit product and here is the test butcg butch asd ie fa hasdgjas</p>
                </div>
                </div>
                <div className="lastdiv">
                    <div  className="addtocart"> <Add_to_cart text={'Order Now'} className={"w-[20%]"} itemid={data._id}/></div>
                    <h4>{data.price}$</h4>      
                </div>
                </div>
        </div>)
}