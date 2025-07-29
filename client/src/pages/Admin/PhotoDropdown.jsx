import  { useEffect,useState } from "react";
import axios from "axios";
import { API_BASEURL } from "Var/URLS";
import { X } from "lucide-react";
async function Photodelete(imageUrl ,index,itemId) {
  try {
    let res = await axios.delete(API_BASEURL + '/photos',{
      data: { imageUrl , index,itemId }, // Sending data in the request body
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res
  } catch (error) {
    return error
  }
}
const PhotoDropdown = ({formdata,handleChange,refresh,setFormData2,formData2}) => {
  let [photos,setPhotos] = useState(formdata.img)
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(()=>{
    if(selectedPhoto){
      setSelectedPhoto('')
    }
    setPhotos(formdata.img)
  },[formdata.img])
  useEffect(()=>{
    if(selectedPhoto){
        let answer = photos.indexOf(selectedPhoto)
        let temp = ''
        temp = photos[answer]
        photos[answer] = photos[0]
        photos[0] = temp
        let ob = {target: <input value={photos} name='img'/>}
        handleChange(ob)
    }
  },[selectedPhoto])

    return (
      <div className="relative w-64">
        {/* Selected Item */}
        <div
          className="flex items-center justify-between border p-2 rounded-md cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {
          selectedPhoto ? (
            <img
              src={selectedPhoto}
              alt={formdata.name}
              className="w-10 h-10 rounded-md"
            />
          ) : (
            <span>Select The Main Photo</span>
          )}
          <span>▼</span>
        </div>
  
        {/* Dropdown List */}
        {(isOpen && photos) && (
          <div className="absolute min-w-[500px] bg-white border mt-2 flex flex-wrap flex-row rounded-md shadow-md z-10">
            {photos.map((photo,index) => (
                <>
              <div
              key={index}
              className="flex space-x-2 w-40 items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedPhoto(photo);
                setIsOpen(false);
              }}
              >
                <img src={photo} alt={formdata.name} className="w-40 h-40 rounded-md" />
              </div>
              <button
                      type="button"
                      onClick={async()=>{
                        await Photodelete(photo,index,formdata._id).then(async (res)=>{
                         await refresh()
                         setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
                         setFormData2({ ...formData2 , ['img']: photos.filter((_, i) => i !== index) });
                        })
                      }}
                      className="relative right-50 p-1 -mt-[29 0px] bg-red-500 text-red rounded-full opacity-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
              </>

            ))}
          </div>
        )}
      </div>
    );
  };



export default PhotoDropdown;
