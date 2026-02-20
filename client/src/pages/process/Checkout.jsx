import React, { memo, useContext, useEffect, useState } from 'react';
import { CreditCard, Truck, User, Package, ArrowRight, ArrowLeft } from 'lucide-react';
import { cahce, Cartcontext } from 'pages/Root/Shop/Shop';
import { useQuery } from '@tanstack/react-query';
import LocationPicker from '../../components/Mapicker';
import { API_BASEURL } from 'Var/URLS';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Brazzaville)",
  "Congo (Kinshasa)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor (Timor-Leste)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
function OrderSuccessCard() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center border border-green-100">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-800">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-500 mt-1">
          Your order has been received. We’ll notify you when it’s on the way.
        </p>
      </div>
    </motion.div>
  );
}
let CheckoutForm = memo(() => {
  const navigate = useNavigate()
  let {cartdata: data,refetchcart} = useContext(Cartcontext)
  const [items, setItems] = useState([]);
  const [step, setStep] = useState(1);
  const [working, setworking] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [Mapop, setMapop] = useState(false);
  const [errors, setErrors] = useState({firstName: undefined,
    lastName: undefined,
    email: undefined,
    phone: undefined,
    address: undefined,
    city: undefined,
    coords: undefined,
    country: undefined,
    zipCode: undefined,
    paymentMethod: undefined,
    cardNumber: undefined,
    cardExpiry: undefined,
    cardCvc: undefined
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    coords: '',
    zipCode: '',
    zipCode2:'',
    country: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  useEffect(()=>{
    if(data){
      setItems(data.data)
    }
  },[data])
  const handleInputChange = (e) => {
    setMapop(false)
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  const handleLocationSelect = (latlng) => {
    setFormData(prev => ({ ...prev, ['coords']: latlng }));
    if (errors['coords']) {
      setErrors(prev => ({ ...prev, ['coords']: undefined }));
    }    
  };
  const HandleZipcode = (code) => {
    setFormData(prev => ({ ...prev, ['zipCode2']: code }));
    if (errors['zipCode2']) {
      setErrors(prev => ({ ...prev, ['zipCode2']: undefined }));
    }    
  };
  const validateStep = (currentStep) => {
    if(Mapop)return false
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    }
    if (currentStep === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.coords) newErrors.state = 'Location is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    }

    if (currentStep === 3 && formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvc) newErrors.cardCvc = 'CVC is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step) && !Mapop) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    setworking(false)
    if (validateStep(step) && !Mapop) {
try {
  let res = await fetch(`${API_BASEURL}/order/process`,{method:'POST',  headers: {
    'Content-Type': 'application/json',
  },body:JSON.stringify(formData),credentials:'include'})
  if(res.ok){
    refetchcart()
    setShowSuccess(true);
    setTimeout(() => navigate('/', { replace: true }), 1400);
  }
} catch (error) {
  alert(error)
} finally{
      setworking(true)
}
}
  };
  if(!data && items){
    return <>Loading...</>
  }   
    let sub = items.length > 0 ? items.reduce((next,item)=> +(item.data.price * item.nun) + +next,0) : 0
    const orderSummary = {
      subtotal: sub,
      shipping: sub ? 9.99 : 0.0,
      tax: 20.00 /100.0 * sub,
    };
    orderSummary.total = orderSummary.subtotal + orderSummary.shipping + orderSummary.tax;
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form */}
          <div className="flex-grow bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
              <div className="flex items-center gap-4">
                <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <User className="w-5 h-5" />
                  <span className="ml-2 hidden sm:inline">Personal</span>
                </div>
                <div className="w-8 h-px bg-gray-300" />
                <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <Truck className="w-5 h-5" />
                  <span className="ml-2 hidden sm:inline">Shipping</span>
                </div>
                <div className="w-8 h-px bg-gray-300" />
                <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <CreditCard className="w-5 h-5" />
                  <span className="ml-2 hidden sm:inline">Payment</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.firstName ? 'border-red-300' : 'border-gray-300'
                        } px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.lastName ? 'border-red-300' : 'border-gray-300'
                        } px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      } px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      } px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.address ? 'border-red-300' : 'border-gray-300'
                      } px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div>
      <label className="block text-sm font-medium text-gray-700">Country</label>
      <select
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        className={`no-arrow mt-1 block w-full rounded-md border ${
          errors.country ? 'border-red-300' : 'border-gray-300'
        } px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
      >
        <option value="">Select</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      {errors.country && (
        <p className="mt-1 text-sm text-red-600">{errors.country}</p>
      )}
    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.city ? 'border-red-300' : 'border-gray-300'
                        } px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                      )}
                     
                    </div>
         
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.zipCode ? 'border-red-300' : 'border-gray-300'
                        } px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                      )}
                    </div>                    
                    </div>
                      <LocationPicker setZipcode={HandleZipcode} onLocationSelected={handleLocationSelect} setMapop={setMapop} coords={formData.coords}/>
                      {errors.coords && (
                        <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                      )}
                </div>
              )}

              {/* Step 3: Payment Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                        className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                          formData.paymentMethod === 'card'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <CreditCard className="w-6 h-6" />
                        <span>Credit Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'paypal' }))}
                        className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                          formData.paymentMethod === 'paypal'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <Package className="w-6 h-6" />
                        <span>PayPal</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'vodafone' }))}
                        className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                          formData.paymentMethod === 'vodafone'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <Package className="w-6 h-6" />
                        <span>Vodafone Cash</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'fawry' }))}
                        className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                          formData.paymentMethod === 'fawry'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <Package className="w-6 h-6" />
                        <span>Fawry</span>
                      </button>
                    </div>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className={`mt-1 block w-full rounded-md border ${
                            errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                          } px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className={`mt-1 block w-full rounded-md border ${
                              errors.cardExpiry ? 'border-red-300' : 'border-gray-300'
                            } px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                          />
                          {errors.cardExpiry && (
                            <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">CVC</label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            placeholder="123"
                            className={`mt-1 block w-full rounded-md border ${
                              errors.cardCvc ? 'border-red-300' : 'border-gray-300'
                            } px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                          />
                          {errors.cardCvc && (
                            <p className="mt-1 text-sm text-red-600">{errors.cardCvc}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={(e)=>{
                      setMapop(false)
                      setTimeout(() => {
                        handleNext()
                      }, 0);
                    }}
                    className="ml-auto flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!working}
                    className="ml-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 bg-white rounded-xl shadow-lg p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3">
                        {items && items.length > 0 ? (
                items.map((item) => (
                    <div key={item.data._id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center space-x-3">
                        <img
                        src={item.data.img[0]} 
                        alt={item.data.name}
                        className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                        <p className="text-sm font-medium text-gray-800">{item.data.name}</p>
                        <p className="text-xs text-gray-600">x{item.nun}</p>
                        </div>
                    </div>
                    <span className="text-sm font-semibold">${(item.data.price * item.nun).toFixed(2)}</span>
                    </div>
                ))
                ) : (
                <p className="text-gray-500 text-sm">Your cart is empty.</p>
                )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${orderSummary.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${orderSummary.tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        {showSuccess && <OrderSuccessCard />}
    </div>
  );
})  

export default CheckoutForm;