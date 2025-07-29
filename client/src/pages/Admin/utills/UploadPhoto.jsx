import axios from "axios";

const uploadPhoto =async (image,signature,timestamp) =>{
    const formData3 = new FormData();
    formData3.append("file", image);
    formData3.append("api_key", "952224597234553"); // API Key
    formData3.append("timestamp", timestamp);
    formData3.append("signature", signature);
    formData3.append("upload_preset", "ml_default");
    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dydefecdm/image/upload`,
        formData3,
        {
            headers: { "Content-Type": "multipart/form-data" },
        })
    return response.data.secure_url
}
export default uploadPhoto