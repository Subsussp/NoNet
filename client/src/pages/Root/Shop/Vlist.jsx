import { Shopcontext } from "pages/Root/Shop/Shop";
import Vitem from "./Vitem";
import { useContext } from "react";
const Vlist = ({role,deletefromlist,Catg,direction})=> {
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
          i = items.filter((item) =>Catg.includes(item.catg)).map((item)=> <Vitem item={item} key={item._id} deletefromlist={deletefromlist}/>)
      }else{
          i = items.filter((item) =>(item.catg).replaceAll(' ') == Catg.replaceAll(' ')).map((item)=><Vitem deletefromlist={deletefromlist} item={item} key={item._id} />)
      }
  }else{
      i = items.map((item) => <Vitem deletefromlist={deletefromlist} role={role == 'admin'} item={item} key={item._id} />)
  }

  if(direction){
        i.reverse()
  }
  return <div className={`block w-full h-full`}> {(i != '' ) ? <>{i}</> : <h1>No Products</h1>}</div>
}
export default Vlist