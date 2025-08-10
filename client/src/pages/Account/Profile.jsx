import React, { useState, useEffect, useRef } from "react";
import { API_BASEURL } from "Var/URLS";

export default function Profile({ initialData ,setUserData}) {

  const [name, setName] = useState(initialData?.name || "");
  const [phone, setPhone] = useState(initialData?.Phonenumber || "");
  const [email,setemail] = useState(initialData?.email || "");
  const [url, setUrl] = useState(initialData?.url || "");
  const fileInputRef = useRef(null);
  useEffect(()=>{
console.log(initialData)
  setName(initialData?.name || "");
   setPhone(initialData?.Phonenumber || "");
   setemail(initialData?.email || "");
   setUrl(initialData?.url || "");
  },[initialData])
  // PATCH function for updating profile fields
  const patchProfile = async (data) => {
    try {
      const res = await fetch(`${API_BASEURL}/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      }).then((res)=> {res.ok ? alert("Profile updated successfully!") :  alert("Error updating profile.")
        return res
      }).then(async(res)=>await res.json()).then((data)=>setUserData(data.user));
    } catch (err) {
      console.error("Error:", err);
      alert("Error updating profile.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setUrl(event.target.result);
      patchProfile({ url: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = () => {
    setUrl("");
    patchProfile({ url: "" });
  };

  const handleSaveChanges = () => {
    patchProfile({ name, Phonenumber: phone });
  };

return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-lg p-6">
      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        {url ? (
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            src={url}
            alt="Profile"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No Photo
          </div>
        )}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Upload
          </button>
          <button
            onClick={handleDeletePhoto}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Profile Info */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <p className="mt-1 p-2 bg-gray-100 rounded-lg">{email}</p>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          onClick={handleSaveChanges}
          className="w-full py-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
