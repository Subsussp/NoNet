import { useContext } from "react"
import { Shopcontext } from "pages/Root/Shop/Shop";
import Item from 'components/Cards/ProductCard';
import { useEffect, useState } from 'react'

const List = ({role,refetch,Catg,limit,smallsize,direction,BestSeller,textEnter,textLeave}) => {
    let data = useContext(Shopcontext)
    if(!data){
        return
    }
    let items = data 
    items.sort((a, b) => {
  const firstA = a.name[0].toLowerCase();
  const firstB = b.name[0].toLowerCase();

  if (firstA < firstB) return -1;
  if (firstA > firstB) return 1;
  return 0;
});
    let i;
    if(Catg){
        if(Array.isArray(Catg)){
            i = items.filter((item) =>Catg.includes((item.catg))).map((item)=><Item textEnter={textEnter} textLeave={textLeave} deletefromlist={deletefromlist} item={item} key={item._id} ></Item>)
        }else{
            i = items.filter((item) =>(item.catg).replaceAll(' ') == Catg.replaceAll(' ')).map((item)=><Item textEnter={textEnter} textLeave={textLeave} deletefromlist={deletefromlist} item={item} key={item._id} ></Item>)
        }
    }else{
        if(BestSeller){
            i = [...items].sort((a, b) => b.orders - a.orders).map((item)=><Item textEnter={textEnter} textLeave={textLeave} deletefromlist={deletefromlist} item={item} key={item._id}></Item>);
        }else{
            i = items.map((item) => <Item deletefromlist={deletefromlist} item={item} key={item._id} textEnter={textEnter} textLeave={textLeave}></Item>)
        }
    }
    if(!isNaN(+limit))i.length = limit     
    async function deletefromlist(id){
        items = items.filter((item)=> item._id != id)
        let s = items.map((item) => <Item textEnter={textEnter} textLeave={textLeave} deletefromlist={deletefromlist} item={item} key={item._id} ></Item>)
        await refetch()
        return (<div className={`${smallsize ? 'itm-con-mb' : 'itm-con'}`}> {(s != '' ) ? <>{s}</> : <h1>No Products</h1>} </div>)
    }
    if(direction){
        i.reverse()
    }
    return (<div className={`${smallsize ? 'itm-con-mb' : 'itm-con'}`}> {(i != '' ) ? <>{i}</> : <h1>No Products</h1>} </div>)
}

export default List