import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import List from "components/CardsLists/itemsBas";
import { AlignJustify, ArrowDownNarrowWide, ArrowUpNarrowWide, LayoutGrid } from "lucide-react";
import Vlist from "./Vlist";
const Store = ({smallsize,Catg,BestSellerAndMain,textEnter,textLeave}) =>{
  
  const categories = [...new Set(Catg)];
  const [selectedCategory, setSelectedCategory] = useState([]); 
  const [gridlist, setGrid] = useState([true,false]); 
  const [direction, setdirection] = useState(false);
  let location = useLocation()
  useEffect(()=>{
    window.localStorage.setItem('ref',location.pathname)
  },[])
  function SetCat(e) {
      if(!e.target.checked){
        let newCa = selectedCategory.filter((value)=>value != e.target.value)
        setSelectedCategory(newCa)
        return
      }
      e = e.target.value
      setSelectedCategory([...selectedCategory,e])
    }
    return <div className={`${smallsize ? 'frame-mb':'frame'}`}>
    {/* Catgo */}
    {/* {BestSellerAndMain ? <> */}
    {!smallsize &&
      // <section className={`lsection`}>
      //      <div className={`flex flex-col w-full p-4 bg-mainele catsection`}>
      //         <h1 className="Catg1">Categories</h1>
      //         {categories.map((catg)=><h2 className="Catg">{catg}</h2>)}
      //     </div> 
      //  </section>}</> :  
      <section className={`lsection `}>
          <div className={`flex flex-col w-full p-4 bg-mainele catsection select-none`}>
              <h1 className="Catg1" onMouseEnter={textEnter} onMouseLeave={textLeave} >Categories</h1>
              {categories.map((catg,i)=>
              <div className="accordion-inner" key={i} onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <input checked={selectedCategory.includes(catg)} type='checkbox' id={catg} className="Catg" onChange={SetCat} value={catg} /> 
                <label htmlFor={catg}>{catg}</label>
              </div>
              )}
    </div>
    </section>
}
    {/* Items displaying */}
    <div className={`${smallsize ? 'div-2-mb' : 'div-2'}`}>
    {BestSellerAndMain && <>
    <div className="group" onMouseEnter={textEnter} onMouseLeave={textLeave}>
      <h2 className="catgroup select-none">BestSeller</h2>
    </div>
    <List smallsize={smallsize} limit={2} BestSeller={true} textEnter={textEnter} textLeave={textLeave}/>
    </>}
    {<div className="flex flex-row justify-evenly w-[150px] my-[20px] py-1 bg-[var(--sa)]" onMouseEnter={textEnter} onMouseLeave={textLeave}>
      <button onClick={()=>setGrid([true,false])} data-view="grid" data-toggle="tooltip" data-original-title="Grid"><LayoutGrid size={28} style={{'color':"var(--one)"}} /></button>
      <button onClick={()=>setGrid([false,true])} data-view="list" data-toggle="tooltip" data-original-title="List"><AlignJustify size={28} style={{'color':"var(--one)"}}/> </button>      
      <button onClick={()=>setdirection(false)} ><ArrowUpNarrowWide size={28} style={{'color':"var(--one)"}}/></button>
      <button onClick={()=>setdirection(true)}><ArrowDownNarrowWide size={28} style={{'color':"var(--one)"}}/></button>
    </div>}
    { (gridlist[0] ? (selectedCategory.length > 0 ? <List textEnter={textEnter} textLeave={textLeave} smallsize={smallsize} Catg={selectedCategory} direction={direction} />: <List textEnter={textEnter} textLeave={textLeave} smallsize={smallsize} direction={direction} />): (selectedCategory.length > 0 ? <Vlist textEnter={textEnter} textLeave={textLeave} smallsize={smallsize} Catg={selectedCategory}direction={direction} />: <Vlist textEnter={textEnter} textLeave={textLeave} smallsize={smallsize} direction={direction} />))}
    </div> 
  </div>
}

export default Store