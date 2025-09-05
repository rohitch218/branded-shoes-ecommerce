import React from 'react';

const ReviewStep = ({ formData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Contact Information</h3>
        <p className="text-sm text-gray-700">{formData.email}</p>
        <p className="text-sm text-gray-700">{formData.phone}</p>
        <button
          type="button"
          onClick={() => {}}
          className="mt-2 text-sm font-medium text-primary hover:text-primary-dark"
        >
          Edit
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium text-gray-900">Shipping Address</h3>
          <button
            type="button"
            onClick={() => {}}
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            Edit
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          <p>{formData.firstName} {formData.lastName}</p>
          <p>{formData.address}</p>
          {formData.apartment && <p>{formData.apartment}</p>}
          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
          <p>{formData.country}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium text-gray-900">Shipping Method</h3>
          <button
            type="button"
            onClick={() => {}}
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            Edit
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          {formData.shippingMethod === 'standard' && 'Standard Shipping (3-5 business days)'}
          {formData.shippingMethod === 'express' && 'Express Shipping (1-2 business days)'}
          {formData.shippingMethod === 'overnight' && 'Overnight Shipping (Next business day)'}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium text-gray-900">Payment Method</h3>
          <button
            type="button"
            onClick={() => {}}
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            Edit
          </button>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-700">
            {formData.cardNumber ? `•••• •••• •••• ${formData.cardNumber.slice(-4)}` : 'No payment method selected'}
          </p>
          <p className="text-sm text-gray-700">{formData.cardName}</p>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-700">
              I have read and agree to the website <a href="#" className="text-primary hover:text-primary-dark">terms and conditions</a> and <a href="#" className="text-primary hover:text-primary-dark">privacy policy</a>.
            </label>
          </div>
        </div>
        
        <div className="mt-4 flex items-start">
          <div className="flex items-center h-5">
            <input
              id="newsletter"
              name="newsletter"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="newsletter" className="text-gray-700">
              Sign up for our newsletter to receive updates and exclusive offers.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
