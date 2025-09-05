import React from 'react';

const ShippingStep = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          required
          value={formData.address}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          placeholder="Street address"
        />
      </div>
      
      <div>
        <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
          Apartment, suite, etc. (optional)
        </label>
        <input
          type="text"
          id="apartment"
          name="apartment"
          value={formData.apartment}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            value={formData.city}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP / Postal code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            required
            value={formData.zipCode}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            name="country"
            required
            value={formData.country}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
            <option>United Kingdom</option>
            <option>Australia</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State / Province <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            required
            value={formData.state}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="saveInfo"
            name="saveInfo"
            type="checkbox"
            checked={formData.saveInfo}
            onChange={handleInputChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="saveInfo" className="font-medium text-gray-700">
            Save this information for next time
          </label>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Shipping Method</h3>
        <div className="space-y-4">
          <div className={`flex items-center p-4 border rounded-md cursor-pointer ${formData.shippingMethod === 'standard' ? 'border-primary bg-blue-50' : 'border-gray-300'}`}>
            <input
              id="standard-shipping"
              name="shippingMethod"
              type="radio"
              value="standard"
              checked={formData.shippingMethod === 'standard'}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <div className="ml-3 flex-1">
              <div className="flex justify-between">
                <span className="block text-sm font-medium text-gray-900">Standard</span>
                <span className="text-sm font-medium text-gray-900">$5.99</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">3-5 business days</p>
            </div>
          </div>
          
          <div className={`flex items-center p-4 border rounded-md cursor-pointer ${formData.shippingMethod === 'express' ? 'border-primary bg-blue-50' : 'border-gray-300'}`}>
            <input
              id="express-shipping"
              name="shippingMethod"
              type="radio"
              value="express"
              checked={formData.shippingMethod === 'express'}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <div className="ml-3 flex-1">
              <div className="flex justify-between">
                <span className="block text-sm font-medium text-gray-900">Express</span>
                <span className="text-sm font-medium text-gray-900">$14.99</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">1-2 business days</p>
            </div>
          </div>
          
          <div className={`flex items-center p-4 border rounded-md cursor-pointer ${formData.shippingMethod === 'overnight' ? 'border-primary bg-blue-50' : 'border-gray-300'}`}>
            <input
              id="overnight-shipping"
              name="shippingMethod"
              type="radio"
              value="overnight"
              checked={formData.shippingMethod === 'overnight'}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <div className="ml-3 flex-1">
              <div className="flex justify-between">
                <span className="block text-sm font-medium text-gray-900">Overnight</span>
                <span className="text-sm font-medium text-gray-900">$24.99</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Next business day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingStep;
