
import Options from "./utills/Options";
import { useState } from "react";
import { Upload, X } from 'lucide-react';
import PhotoDropdown from './PhotoDropdown'
const filePreview = {
  url: "", // String URL of the file preview
  file: null, // File object
};
export function Form({onClose,formData2,setFormData2,showForm,handleQuantityChange,handleImageChange, handleChange, formData, operation, handleSubmit ,refresh}) {
  const [fileList, setFileList] = useState([]);
  const handleFileChange = (e) => {
    handleImageChange(e)
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        file
      }));
      setFileList(prev => [...prev, ...newFiles]);
    }
  };
  const handleForSubmit = (e) =>{
    handleSubmit(e,fileList)
  }
  const removeFile = (index) => {
    setFileList(prev => {
      const newList = [...prev];
      URL.revokeObjectURL(newList[index].url);
      newList.splice(index, 1);
      return newList;
    });
  };

  return (
<div className="py-12 px-4 sm:px-6 lg:px-8 top-0 z-50 w-full fixed inset-0 flex items-center justify-center p-4">
<div className="max-w-3xl mx-auto w-full h-full">
  <div className="bg-white shadow-xl rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto px-8">
    <div className="px-6 py-8 ">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
        {operation} Product 
      </h2>
      {operation == 'Update' && <PhotoDropdown formData2={formData2} setFormData2={setFormData2} onClose={onClose} refresh={refresh} handleChange={handleChange} formdata={formData}/>}

      <form onSubmit={handleForSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
      
          <div className="input-container ">
                    <input id={'name'} className="input-field mt-1 block w-full"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required />
                <label htmlFor="name" className="floating-label">Name</label>
            </div>
        </div>

        {/* Category and Material Row */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
                {operation == 'Add' && <Options handleChange={handleChange}/>}
                {operation == 'Update' && <div className="input-container">
                 <input id={'catg'} className="input-field mt-1 block w-full"
                    type="text"
                    name="catg"
                    value={formData.catg}
                    onChange={handleChange}
                    required />
                    <label htmlFor="catg" className="floating-label">Category</label></div> }
            {/* <select
              id="category"
              name="category"
              value={formData.category}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            > */}
              {/* <option value="">Select a category</option> */}
            {/* </select> */}
          </div>
          <div>
          <div className="input-container mt-1 block w-full ">
                    <input id={'material'} className="input-field mt-1 block w-full"
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        required />     
                <label htmlFor="material" className="floating-label">Material</label></div>
                </div></div>

        {/* Description */}
        <div>
          <div className="input-container">
                        <input id={'Description'} className="input-field mt-1 block w-full "
                        type="text"
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        required />
                    <label htmlFor="Description" className="floating-label">Description</label>
                    </div>
        </div>

        {/* Price and Quantity Row */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 items-center">
          <div>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="input-container">
                    <input id={'price'} className="input-field pl-7 block w-full"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}              
                        required />
                <label htmlFor="price" className="floating-label ">Price</label>
                        </div>
            </div>
          </div>
          {/* <div className="last"> */}
                     <div className="left flex items-center -mb-4 h-12 rounded border border-gray-200 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={() => handleQuantityChange((formData.quantity - 1) <= 0 ? 0 : -1)}
                                className="size-10 text-black transition hover:opacity-100 ">
                                &minus;
                            </button>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="quantity"
                                required
                                id="quantity"
                                className="h-5 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" />
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(1)}
                                className="size-10 text-black opacity-100 transition hover:opacity-80 "
                            >
                                +
                            </button>
                    {/* </div> */}
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Photos
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          {/* Image Preview */}
          {fileList.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {fileList.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={file.url}
                      alt={`Preview ${index + 1}`}
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 place-self-end">
          <button
            type="submit"
            className="justify-center py-3 mx-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-two hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            style={{'width':'140px',padding:'0.5rem 1rem'}}
          >
            {operation} Product
          </button>
          {showForm ? <button className="justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-two hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors" style={{'width':'140px',padding:'0.5rem 1rem'}}  onClick={onClose}>Close Panel</button> : ''} 
        </div>
      </form>
    </div>
  </div>
</div>
</div>
    ) 
  }