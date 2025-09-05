import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const EmptyCart = () => (
  <div className="pt-24 pb-16 px-4">
    <div className="container mx-auto max-w-4xl text-center">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">There are no items in your cart to checkout.</p>
        <a
          href="/products"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  </div>
);

const Checkout = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  
  if (items.length === 0) {
    return <EmptyCart />;
  }
  
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-700">Checkout functionality will be implemented here.</p>
          <div className="mt-6">
            <button
              onClick={() => {
                clearCart();
                navigate('/order-confirmation');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Place Order (Demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
