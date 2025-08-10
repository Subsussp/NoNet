import { Fragment, useContext, useEffect, useRef, useState } from "react";
import List from "components/CardsLists/itemsBas";
import { Link, useLocation } from "react-router-dom";
import { Shopcontext } from "pages/Root/Shop/Shop";
import { AlignJustify, ArrowDownNarrowWide, ArrowUpNarrowWide, Grid, Heart, LayoutGrid, ShoppingBasket, SquareTerminal } from "lucide-react";
import DisplayList from "components/Cards/DisplayCard";
import { motion, useScroll, useTransform } from "framer-motion";
const Userpage = ({refetch}) => {
  let data = useContext(Shopcontext)  
  let [Catg,setCatgs] = useState([])
  const [smallsize, setsmallsizw] = useState(false);
  let [BestSeller,setBestSeller] = useState([])
  let location = useLocation()

    useEffect(() => {
        const handleResize = () => {
        if(window.innerWidth <= 768){
          setsmallsizw(true)// Show only if less than md
        }else{
          setsmallsizw(false)// Show only if more than md
        }
      };
      handleResize(); // Run once on mount
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        window.localStorage.setItem('ref',location.pathname)
    },[])
    useEffect(()=>{
        if(data){
            let catg = []
            let BestSeller = []
            // a function to order the highest three orderd items and assign to BestSeller 
            data.map((item,i)=>{if(!catg.includes(item.catg) && item.catg){
                catg.push(item.catg)
            }})
            setCatgs(catg)
        }
    },[data])   
    if(!data){
        return <></>
    }
    return (
        <>
        {/* frame */}
        <div className={`${smallsize ? 'frame-mb':'frame'}`}>
        <article className="Mid"><h2>Store</h2></article>
        {/* <h1 className="text-one ml-2 p-3 text-[length:var(--thirdegreesize2)]">Shop By Category</h1> */}
        {/* <HorizontalScrollCarousel Catg={Catg} smallsize={smallsize} refetch={refetch}/> */}
        {/* <Store smallsize={smallsize} Catg={Catg} BestSellerAndMain={true}/> */}
        <Store smallsize={smallsize} BestSellerAndMain={false} Catg={!data ? [] : data.map((value)=>value.catg)} />
                {/* <div className={`flex flex-row w-full p-4 bg-mainele catsection`}> */}
                {/* <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 justify-center py-1 border text-sm bg-mainele text-one border-mainele focus:outline-none w-fit focus:border-one"
                >
                {categories.map(category => (
                  <option key={category} value={category}>
                  {category}
                  </option>
                  ))}
                  </select>  */}
              {/* </div> */}
        </div>
        <article className="info w-full h-[700px] bg-mainele">
            <h1>Contact us</h1>
        </article>
    </>
    )
}
const Store = ({smallsize,Catg,BestSellerAndMain}) =>{
  
  const categories = [...new Set(Catg)];
  const [selectedCategory, setSelectedCategory] = useState([]); // Store raw data, not JSX
  const [gridlist, setGrid] = useState([true,false]); // Store raw data, not JSX
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
    {BestSellerAndMain ? <>
    {!smallsize &&
      <section className={`lsection`}>
          <div className={`flex flex-col w-full p-4 bg-mainele catsection`}>
              <h1 className="Catg1">Categories</h1>
              {categories.map((catg)=><h2 className="Catg">{catg}</h2>)}
          </div>
      </section>}</> : 
      <section className={`lsection`}>
          <div className={`flex flex-col w-full p-4 bg-mainele catsection`}>
              <h1 className="Catg1">Categories</h1>
              {categories.map((catg)=>
              <div className="accordion-inner">
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
    <div className="group">
      <h2 className="catgroup">BestSeller</h2>
    </div>
    <List smallsize={smallsize} limit={4} /></>}
    {!BestSellerAndMain && <div className="flex flex-row justify-evenly w-[150px] my-[20px] py-1 bg-[var(--sa)]">
      <button onClick={()=>setGrid([true,false])} data-view="grid" data-toggle="tooltip" data-original-title="Grid"><LayoutGrid size={28} style={{'color':"var(--one)"}} /></button>
      <button onClick={()=>setGrid([false,true])} data-view="list" data-toggle="tooltip" data-original-title="List"><AlignJustify size={28} style={{'color':"var(--one)"}}/> </button>      
      <button onClick={()=>setdirection(false)} ><ArrowUpNarrowWide size={28} style={{'color':"var(--one)"}}/></button>
      <button onClick={()=>setdirection(true)}><ArrowDownNarrowWide size={28} style={{'color':"var(--one)"}}/></button>
    </div>}
    {BestSellerAndMain ?
                Catg.slice(0, 2).map((catg)=><> <div className="group">
                    <h2 className="catgroup">{catg}</h2>
                    </div><List smallsize={smallsize} Catg={catg} /> </>) : (gridlist[0] ? (selectedCategory.length > 0 ? <List smallsize={smallsize} Catg={selectedCategory} direction={direction} />: <List smallsize={smallsize} direction={direction} />): (selectedCategory.length > 0 ? <Vlist smallsize={smallsize} Catg={selectedCategory}direction={direction} />: <Vlist smallsize={smallsize} direction={direction} />))}
    </div> 
  </div>
}


const Vitem = ({item})=> {
  return <li className="bg-mainele mb-[30px] overflow-hidden">
        <div className="w-full h-full bg-mainele flex items-center" >
        <Link to={`/items/${item._id}`}>
          <div className="listimg-con flex-shrink-0">
              <img draggable='false'
              src={item.img[0]}
              alt={`${item.name} photo`}
              className={`block object-cover`}
              />
          </div>
        </Link>
      <div className="ml-3 h-full">                               
            <h1 className="font-medium text-one">{item.name}</h1>
            <h1 className="font-medium text-[var(--two)]">{item.price} EGP</h1>
          <Link to={`/items/${item._id}`}>
            <p className="m-0 p-0 box-border">
              <span className="text-[var(--sa)] font-sans text-xl">
                <strong className="font-Main text-gray-500 font-semibold">Material :</strong> {item.material}
              </span>
            </p>
        <p className="m-0 p-0 box-border ">
          <span className=" font-sans text-[var(--sa)] text-lg">
            <strong className="font-sm text-gray-500 overflow-hidden text-ellipsis w-full font-Main font-semibold">Details :</strong> {item.desc}
          </span>
        </p>
        <p className="m-0 p-0 box-border">
          <span className="text-[var(--sa)] font-sans text-xl">
            <strong className="font-Main text-gray-500 font-semibold ">Size :</strong> {item.size}
          </span>
        </p>
        </Link>

        <div>&nbsp;</div>
        <div className="list-block flex items-center space-x-2">
  {/* <!-- Add to Cart Button --> */}
  <Link 
    className="addToCart bg-two hover:bg-[var(--sa)] text-one transition duration-700 ease-in-out p-2" 
    type="button" 
    title="Add to Cart" 
    to={`/cart/add-to-cart?pr_id=${item._id}`}
    >
    <ShoppingBasket/>
  </Link>

  {/* <!-- Add to Wishlist Button --> */}
  <button 
    className="wishlist btn-button bg-mainele transition duration-700 ease-in-out hover:bg-one hover:text-mainele text-one p-2" 
    type="button" 
    title="Add to Wish List" 
    onClick="wishlist.add('841','image/products/1569664820web-template.png');">
    <Heart/>
  </button>

  {/* <!-- Quick View Button (Using Fancybox) --> */}
  <a 
    className="iframe-link btn-button bg-mainele transition duration-700 ease-in-out hover:bg-two text-one p-2" 
    href="q?id=841" 
    title="Quick view" 
    data-fancybox-type="iframe">
    <i className="fa fa-eye"></i>
  </a>
</div>
      </div>
        </div>

</li>
}
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
const HorizontalScrollCarousel = ({Catg,refetch,smallsize}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  return (
    <>
    <section ref={targetRef} className="relative h-[250vh] w-full bg-neutral">
      <div className="sticky top-20 w-full flex items-center overflow-hidden ">
        <motion.div style={{ x }} className="flex gap-8 justify-evenly">
        {Catg.map((value)=> <DisplayList smallsize={smallsize} refetch={refetch} Catg={value} limit={1} />)}
        </motion.div>
      </div>
    </section>
    </>);
};

export {Userpage,Store}