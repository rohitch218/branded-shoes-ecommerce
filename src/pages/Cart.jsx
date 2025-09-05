import { Link } from 'react-router-dom';
import { XMarkIcon, ArrowLeftIcon, ArrowPathIcon, TruckIcon, ShieldCheckIcon, TagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  
  // Calculate subtotal, shipping, and total
  const subtotal = totalPrice;
  const shipping = subtotal > 0 ? (subtotal > 50 ? 0 : 5.99) : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;
  
  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Continue Shopping
            </Link>
          </div>
          
          {/* Recently Viewed */}
          <div className="mt-16">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Recently Viewed</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="group relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={`https://source.unsplash.com/random/300x300/?sneakers,${id}`}
                      alt={`Product ${id}`}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h4 className="mt-2 text-sm text-gray-700">Nike Air Max {270 + id}</h4>
                  <p className="mt-1 text-sm font-medium text-gray-900">${(150 + id * 10).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Cart Header */}
                <div className="hidden md:grid grid-cols-12 border-b border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                {/* Cart Items */}
                <ul className="divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <li key={`${item.id}-${item.size}`} className="p-4">
                      <div className="flex flex-col md:grid md:grid-cols-12 gap-4">
                        {/* Product Image and Info */}
                        <div className="flex md:col-span-6">
                          <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden border border-gray-200">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3 className="line-clamp-1">{item.name}</h3>
                              <button
                                type="button"
                                onClick={() => removeFromCart(index)}
                                className="text-gray-400 hover:text-gray-500 md:hidden"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                            <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                            <p className="mt-1 md:hidden text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        
                        {/* Price - Desktop */}
                        <div className="hidden md:flex md:col-span-2 items-center justify-center">
                          <span className="text-gray-900">${item.price.toFixed(2)}</span>
                        </div>
                        
                        {/* Quantity */}
                        <div className="flex items-center justify-between md:justify-center md:col-span-2">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              type="button"
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 focus:outline-none"
                            >
                              -
                            </button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 focus:outline-none"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(index)}
                            className="ml-4 text-gray-400 hover:text-gray-500 hidden md:block"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                        
                        {/* Total - Desktop */}
                        <div className="hidden md:flex md:col-span-2 items-center justify-end">
                          <span className="text-gray-900 font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                {/* Cart Footer */}
                <div className="border-t border-gray-200 p-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-sm font-medium text-primary hover:text-primary-dark flex items-center"
                  >
                    <ArrowPathIcon className="h-4 w-4 mr-1" />
                    Clear cart
                  </button>
                  <Link
                    to="/products"
                    className="text-sm font-medium text-primary hover:text-primary-dark flex items-center"
                  >
                    <ArrowLeftIcon className="h-4 w-4 mr-1" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Have a promo code?</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <button
                    type="button"
                    className="bg-gray-900 text-white px-6 py-2 rounded-r-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="mt-8 lg:mt-0 lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-gray-900">Total</span>
                      <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      or {Math.round(total / 3)} monthly payments of ${(total / 3).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                  
                  <div className="mt-4 text-center text-sm">
                    <p className="text-gray-500">
                      or{' '}
                      <Link to="/" className="text-primary font-medium hover:text-primary-dark">
                        Continue Shopping
                      </Link>
                    </p>
                  </div>
                </div>
                
                {/* Payment Methods */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">We accept</h4>
                  <div className="flex space-x-4">
                    <img src="/visa.svg" alt="Visa" className="h-8" />
                    <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
                    <img src="/amex.svg" alt="American Express" className="h-8" />
                    <img src="/paypal.svg" alt="PayPal" className="h-8" />
                  </div>
                </div>
                
                {/* Trust Badges */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <TruckIcon className="h-6 w-6 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-500">Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-center">
                      <ShieldCheckIcon className="h-6 w-6 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-500">Secure checkout</span>
                    </div>
                    <div className="flex items-center">
                      <TagIcon className="h-6 w-6 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-500">Best price guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recently Viewed */}
          <div className="mt-16">
            <h3 className="text-lg font-medium text-gray-900 mb-6">You May Also Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[5, 6, 7, 8].map((id) => (
                <div key={id} className="group relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={`https://source.unsplash.com/random/300x300/?sneakers,${id}`}
                      alt={`Product ${id}`}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h4 className="mt-2 text-sm text-gray-700">Nike Air Max {270 + id}</h4>
                  <p className="mt-1 text-sm font-medium text-gray-900">${(150 + id * 10).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
