import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Dashboard from 'pages/Dashboard/dashboard.jsx';
import { Form } from "./Form";
import { Shopcontext } from "pages/Root/Shop/Shop";
import HandleChange from "./utills/HandleChange";
import SideNotification from "./utills/showNotif";
import React from 'react'
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import uploadPhoto from "./utills/UploadPhoto";
import { API_BASEURL, API_PRODUCTS } from "Var/URLS";
import { createPortal } from "react-dom";

export async function Request(url,rmethod = 'get',formData) { 
    const data = formData 
    const config = {
        headers: {
            'Content-Type': 'application/json',},
        withCredentials: true,
        method:rmethod,
        data:JSON.stringify(data)
    }
    
    let res = await axios(url, config)
    return res
}

async function update(formData,word,setFormData2,formData2) {
    const data = {
        _id: formData._id
        , data: {
            name: formData.name,
            price: formData.price,
            catg: formData.catg,
            img: formData.img,
            material: formData.material,
            quantity:formData.quantity,
            desc:formData.desc
        }
    };
    try {
        let res = await Request(API_PRODUCTS, 'patch', data)
        let respondd = res.data
        delete respondd["__v"]
        delete respondd["createdAt"]
        delete respondd["updatedAt"]
        word(respondd,setFormData2,formData2)
        return true
    } catch (error) {
        return error
    }
}


const Update = (props) => {
    let [formData,setFormData] = useState(props.formData)
    let [tempimages, setTempImage] = useState([])
    let [on, setOn] = useState(false)
    let [orginimg, setorginimg] = useState([])
    const handleChange = (e) => {
        HandleChange(e,setFormData,formData)
    };
    const handleQuantityChange = (change) => {
        setFormData({
            ...formData,
            quantity: ((+formData.quantity ? +formData.quantity : 0) + (+change)) >= 0 ? (+formData.quantity ? +formData.quantity : 0) + (+change) :  0
        });
    };
    const handleSubmit =async (e,imglist) => {
        e.preventDefault();
        if(formData == props.formData2 && imglist.length <= 0)return 
        // Handle form submission logic here
        let urls = []
        try {
            // Get secure signature from backend
            const signatureResponse = await axios.post(`${API_BASEURL}/photos`);
            const { signature, timestamp } = signatureResponse.data;
            for(let i =0;i < imglist.length;i++){
                let imgurl = await uploadPhoto(imglist[i].file,signature,timestamp)
                urls.push(imgurl)
            }
        }
        catch (error) {
            console.error("Upload failed:", error);
            props.setstate([true,'Updating Failed','error'])
        }
        if(!on){
                setOn(true)
                update({...formData,img:[...formData.img,...urls]},word,props.setFormData2,props.formData2).then((r)=>{ 
                    setOn(false)
                    props.setstate([true,'Updated Successfully','success'])
                }).catch((err)=>{
                    props.setstate([true,'Updating Failed','error'])
                }).finally(()=>{
                    setOn(false)
                    props.refresh()
                    props.onClose()
                }
            )
        }
        
    };
    const handleImageChange =async (e) => {
        // handle uploding the image and removing the old one and updating
        if (!e.target.files) return;
        let arrayofphotos = Array.from(e.target.files)
            // Convert files to Data URLs
            setorginimg(arrayofphotos)
            arrayofphotos = await Promise.all(
                arrayofphotos.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
                })
            );
            setTempImage(arrayofphotos)
    };

    return (<>
        <Form formData2={props.formData2} refresh={props.refresh} handleImageChange={handleImageChange} showForm={props.showForm} onClose={props.onClose} formData={formData} handleQuantityChange={handleQuantityChange} handleChange={handleChange} handleSubmit={handleSubmit} setFormData2={props.setFormData2}operation={'Update'} />
    </>)
} 

function word(array,setFormData2,formData2) {
    let dnew = formData2
    for (let words in array) {
            if (array[words] != formData2[words]) {
                dnew[words] = array[words]
            }
        }
    setFormData2(dnew);
}
export const Add = ({showForm,onClose,refresh}) => {
    let [formData, setFormData] = useState({quantity:1})
    let [tempimages, setTempImage] = useState([])
    let [state,setstate] = useState([false,'',''])
    let [orginimg, setorginimg] = useState([])
    let [on, setOn] = useState(false)
    const handleChange = (es) => {
        HandleChange(es,setFormData,formData)
    };
    const handleImageChange =async (e) => {
            if (!e.target.files) return;
            let arrayofphotos = Array.from(e.target.files)
            // Convert files to Data URLs
            setorginimg(arrayofphotos)
            arrayofphotos = await Promise.all(
                arrayofphotos.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
                })
            );
            setFormData({...formData,img:arrayofphotos})
            setTempImage(arrayofphotos)
    };
    const handleQuantityChange = (change) => {
        setFormData({
            ...formData,
            quantity: ((+formData.quantity ? +formData.quantity : 0) + (+change)) > 0 ? (+formData.quantity ? +formData.quantity : 1) + (+change) : 1
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        let urls = []
        try {
            // Get secure signature from backend
            const signatureResponse = await axios.post(`${API_BASEURL}/photos`);
            const { signature, timestamp } = signatureResponse.data;
            for(let i =0;i < orginimg.length;i++){
                let imgurl = await uploadPhoto(orginimg[i],signature,timestamp)
                urls.push(imgurl)
            }
        }
        catch (error) {
            console.error("Upload failed:", error);
            setstate([true,'Adding failed','error'])
        }
        if(!on){
                setOn(true)
                Request(`${API_PRODUCTS}`,'post',{...formData,img:urls}).then((r)=>{ 
                    setstate([true,'Added Successfully','success'])
                }).catch((err)=>{
                    setstate([true,'Adding failed','error'])
                }).finally(()=>{
                    setOn(false)
                    refresh()
                    onClose()
                }
                )
        }
    };
    return (<>
        {state[0] && createPortal(
            <SideNotification type={state[2]} message={state[1]} setState={setstate}/>,
            document.body)}
    <Form handleImageChange={handleImageChange} onClose={onClose} showForm={showForm} handleQuantityChange={handleQuantityChange} handleChange={handleChange} formData={formData} operation={'Add'} handleSubmit={handleSubmit} /></>)
} 
export {Update,update,word}
