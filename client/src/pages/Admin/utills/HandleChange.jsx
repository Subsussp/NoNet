import notvalidatedqanandprice from "./validateNumberinpu";

export default function HandleChange (e,setFormData,formData){
    let { name, value } = e.target;
    if(['price','quantity'].includes(name)){
      value = value.replaceAll(' ','')
    }
    if(value == '' && ['price','quantity'].includes(name)){
      setFormData({
        ...formData,
        [name]: ''
      });
      return
    }
    if(notvalidatedqanandprice(name,value)){
      return "";
    }
  setFormData({
      ...formData,
      [name]: value
  });
};
