import { useContext, useEffect, useState } from "react";
import { Shopcontext } from "pages/Root/Shop/Shop";

export default function Options({handleChange}) {
  // State to manage the options in the dropdown
  let data = useContext(Shopcontext)
  let items = data    
  const [Catg, setCatg] = useState([]);
  const [Selected, setSelected] = useState('');
  useEffect(()=>{
    let catg = []
    items.map((item,i)=>{if(!catg.includes(item.catg) && item.catg){
      catg.push(item.catg)
    }})
    setCatg(catg)
  },[items])
  return (
  <div className="input-container" >
    <div className="mt-1 block w-full catgo">
        <label className="floating-label" htmlFor="Cat">
          {Selected ? Selected : 'Select a Category'}</label>
        <select id="Cat" name="catg" onChange={(e)=>{
            setSelected(e.target.value)
            handleChange(e)
          }}>
            <option value="" disabled selected>
              Menu
            </option>
          {Catg.map((option, index) => (
            <option className="input-field" key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
          </div>
        </div>
  )
 
}