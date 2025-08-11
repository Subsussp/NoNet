import HandleChange from 'pages/Admin/utills/HandleChange';
import notvalidatedqanandprice from 'pages/Admin/utills/validateNumberinpu';
import { createPortal } from "react-dom";
import { update, Update, word } from 'pages/Admin/EditHandling';
import  Delete  from "pages/Admin/Delete";

import { useEffect, useRef, useState } from 'react';
import SideNotification from 'pages/Admin/utills/showNotif';
import { Edit } from 'lucide-react';
import { API_BASEURL, API_PRODUCTS } from 'Var/URLS';
const Aitem = ({item,onClose,refresh,showForm,setShowForm})=>{
    const [state,setstate] = useState([false,'',''])
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
    let [formData,setFormData] = useState(formData2)
    let [ongoing,setOngoing] = useState(false)
    function timest() {
        setTimeout(async ()=>{
            let state = await update(formDataRef.current,word,setFormData2,formData2) 
            if(state)setstate([true,'Updated','success']) 
            setOngoing(false)
        },6000)
        return
    }
    const formDataRef = useRef(formData);
    useEffect(() => {
        formDataRef.current = formData
    }, [formData2]);
    
    const handleChange = (e) => {
        HandleChange(e,setFormData,formData)
        if(e.target.value != '' && e.target.name == 'quantity' && !notvalidatedqanandprice(e.target.name,e.target.value)){
            setFormData2( {
                ...formData2,
                [e.target.name]: e.target.value}
            )
            if(!ongoing) {
              setOngoing(true)
              timest()
          } 
    }
    };
    const handleQuantityChange = (change) => {
            setFormData({
                ...formData,
                quantity: ((+formData.quantity ? +formData.quantity : 1) + (+change)) >= 1 ? (+formData.quantity ? +formData.quantity : 1) + (+change) :  1
            });
            setFormData2({
                ...formData2,
                quantity: ((+formData.quantity ? +formData.quantity : 1) + (+change)) >= 1 ? (+formData.quantity ? +formData.quantity : 1) + (+change) :  1 
            });
            // Handle form submission logic here
            if(!ongoing) {
                setOngoing(true)
                timest()
            } 
    };
    return ( <div className='T'>
        {state[0] && createPortal(
                    <SideNotification type={state[2]} message={state[1]} setState={setstate}/>,
                    document.body) }
        <div className='item-holder'>
                <Delete refresh={refresh} Config={{ url: `${API_PRODUCTS}/${formData2._id}` }} id={formData2._id} />
                {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                        <img draggable='false'
                            src={formData2.img[0]}
                            alt={`${formData2.name} photo`}
                            className={`product-image-small`} 
                        />
                        {/* Overlay Actions */}
                        {formData.img[1] ? formData.img.forEach((img,i)=>{
                            if(i === 0){return ''}
                            return <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 `}>
                            <img draggable='false'
                            src={img}
                            alt={`${formData.name} photo`}
                            className="ghost product-image w-full object-cover opacity-0 group-hover:opacity-100"
                                /> 
                        </div>}
                        ): ''}
                         {/* Category Badge */}
                            <div className="absolute top-3 left-3">
                                <span className="Catbdg">
                                    {formData2.catg}
                                </span>
                            </div>
                </div>
            </div>
            <div className='py-4 px-2'>
                <h3 className="text-xl font-Second text-black mb-2">{formData2.name}</h3>
                <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm font-Second text-gray-600">{formData2.material}</span>
                </div>
        <div className="flex items-center justify-between mb-4">
            <p className="text-gray-900 text-2xl font-bold">${formData2.price}</p>
        <div className='flex-cl'>
        <div style={{'maxWidth':'fit-content'}} className="left flex small items-center rounded border border-two dark:border-two">
                        <label htmlFor="Quantity" className="sr-only"> Quantity </label>
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(formData.quantity <= 1 ? 0 : -1)}
                                className="size-10 text-two transition hover:opacity-100 ">
                                &minus;
                            </button>
                            <input
                                type="text"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="quantity"
                                required
                                id="quantity"
                                className="h-10 w-4 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm dark:bg-gray-900 dark:text-black [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" />
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(1)}
                                className="size-10 leading-10 text-two transition hover:opacity-75 "
                            >
                                +
                            </button>
            </div>  
            </div>
            </div>
                <button onClick={(e) => {
                    e.stopPropagation()
                    setShowForm([true, 'Update',formData._id]);
                } } className="text-black-1500 text-lg font-bold font-Second w-full flex items-center justify-center gap-2 bg-two text-white py-2 px-4 rounded-lg hover:bg-black transition-colors">
                <Edit className="w-4 h-4" />
                    Update Item
                </button>
            </div>
            {state[0] && createPortal(
                    <SideNotification type={state[2]} message={state[1]} setState={setstate}/>,
                    document.body)}
        {(showForm[0] && showForm[1] == 'Update' && showForm[2] == formData._id) ?createPortal(
            <Update setstate={setstate} state={state} refresh={refresh} formData2={formData2} showForm={showForm} onClose={onClose} formData={formData2} setFormData2={setFormData2} /> ,
    document.body): <></>} 
    </div>
        )
    }

export default Aitem