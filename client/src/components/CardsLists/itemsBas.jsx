import { useContext } from "react"
import { Shopcontext } from "pages/Root/Shop/Shop";
import Item from 'components/Cards/ProductCard';
import { useEffect, useState } from 'react'

const List = ({role,refetch,Catg,limit,smallsize}) => {
    let data = useContext(Shopcontext)
    if(!data){
        return
    }
    let items = data 
    let i;
    if(Catg){
        if(Array.isArray(Catg)){
            i = items.filter((item) =>Catg.includes((item.catg))).map((item)=><Item deletefromlist={deletefromlist} item={item} key={item._id} ></Item>)
        }else{
            i = items.filter((item) =>(item.catg).replaceAll(' ') == Catg.replaceAll(' ')).map((item)=><Item deletefromlist={deletefromlist} item={item} key={item._id} ></Item>)
        }
    }else{
        i = items.map((item) => <Item deletefromlist={deletefromlist} item={item} key={item._id} ></Item>)
    }
    if(!isNaN(+limit))i.length = limit     
    async function deletefromlist(id){
        items = items.filter((item)=> item._id != id)
        let s = items.map((item) => <Item deletefromlist={deletefromlist} item={item} key={item._id} ></Item>)
        await refetch()
        return (<div className={`${smallsize ? 'itm-con-mb' : 'itm-con'}`}> {(s != '' ) ? <>{s}</> : <h1>No Products</h1>} </div>)
    }
    return (<div className={`${smallsize ? 'itm-con-mb' : 'itm-con'}`}> {(i != '' ) ? <>{i}</> : <h1>No Products</h1>} </div>)
}

export default List