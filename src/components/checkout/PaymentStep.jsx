import React from 'react';

const PaymentStep = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">Payment Method</h3>
          <div className="flex space-x-2">
            <img src="/visa.svg" alt="Visa" className="h-6" />
            <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="/amex.svg" alt="American Express" className="h-6" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              required
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="0000 0000 0000 0000"
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
              Name on card <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              required
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="John Smith"
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                Expiration date (MM/YY) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cardExpiry"
                name="cardExpiry"
                required
                value={formData.cardExpiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cardCvv"
                name="cardCvv"
                required
                value={formData.cardCvv}
                onChange={handleInputChange}
                placeholder="123"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="billingSameAsShipping"
              name="billingSameAsShipping"
              type="checkbox"
              checked={formData.billingSameAsShipping}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="billingSameAsShipping" className="font-medium text-gray-700">
              Billing address is the same as shipping address
            </label>
          </div>
        </div>
        
        {!formData.billingSameAsShipping && (
          <div className="mt-4 space-y-4">
            <h4 className="text-sm font-medium text-gray-900">Billing Address</h4>
            {/* Billing address fields would go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStep;
