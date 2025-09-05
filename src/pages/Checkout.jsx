import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ArrowLeftIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

// ✅ Placeholder components (to avoid errors if you don’t have them yet)
const ShippingStep = ({ formData, handleInputChange }) => null;
const PaymentStep = ({ formData, handleInputChange }) => null;
const ReviewStep = ({ formData }) => null;

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zipCode: "",
    phone: "",
    saveInfo: true,
    shippingMethod: "standard",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    billingSameAsShipping: true,
  });

  const [activeStep, setActiveStep] = useState("shipping"); // shipping, payment, review

  // Order summary
  const subtotal = totalPrice;
  const shipping = 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep === "shipping") {
      setActiveStep("payment");
    } else if (activeStep === "payment") {
      setActiveStep("review");
    } else {
      console.log("Order submitted:", formData);
      clearCart();
      navigate("/order-confirmation");
    }
  };

  // ✅ Empty cart UI
  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 
                  0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              There are no items in your cart to checkout.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Checkout steps
  return (
    <div className="pt-24 pb-16 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <nav aria-label="Progress">
              <ol className="flex items-center">
                {/* Step 1 */}
                <li className="flex-1">
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        activeStep === "shipping"
                          ? "bg-primary text-white"
                          : "bg-white border-2 border-primary text-primary"
                      }`}
                    >
                      1
                    </div>
                    <div
                      className={`ml-2 text-sm font-medium ${
                        activeStep === "shipping"
                          ? "text-primary"
                          : "text-gray-500"
                      }`}
                    >
                      Shipping
                    </div>
                  </div>
                </li>
                {/* Step 2 */}
                <li className="flex-1">
                  <div className="flex items-center">
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        activeStep === "payment" || activeStep === "review"
                          ? "bg-primary text-white"
                          : "bg-white border-2 border-gray-300 text-gray-500"
                      }`}
                    >
                      2
                    </div>
                    <div
                      className={`ml-2 text-sm font-medium ${
                        activeStep === "payment" || activeStep === "review"
                          ? "text-primary"
                          : "text-gray-500"
                      }`}
                    >
                      Payment
                    </div>
                  </div>
                </li>
                {/* Step 3 */}
                <li className="flex-1">
                  <div className="flex items-center">
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        activeStep === "review"
                          ? "bg-primary text-white"
                          : "bg-white border-2 border-gray-300 text-gray-500"
                      }`}
                    >
                      3
                    </div>
                    <div
                      className={`ml-2 text-sm font-medium ${
                        activeStep === "review"
                          ? "text-primary"
                          : "text-gray-500"
                      }`}
                    >
                      Review
                    </div>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            {/* Checkout Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    {activeStep === "shipping" && "Shipping Information"}
                    {activeStep === "payment" && "Payment Method"}
                    {activeStep === "review" && "Review Your Order"}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  {/* Step Components */}
                  {activeStep === "shipping" && (
                    <ShippingStep
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  )}

                  {activeStep === "payment" && (
                    <PaymentStep
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  )}

                  {activeStep === "review" && (
                    <ReviewStep formData={formData} />
                  )}

                  {/* Navigation Buttons */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      {activeStep === "shipping" ? (
                        <Link
                          to="/cart"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          <ArrowLeftIcon className="h-5 w-5 mr-1" />
                          Back to Cart
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveStep(
                              activeStep === "payment" ? "shipping" : "payment"
                            )
                          }
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Back
                        </button>
                      )}

                      <button
                        type="submit"
                        className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        {activeStep === "review"
                          ? "Place Order"
                          : "Continue to " +
                            (activeStep === "shipping" ? "Payment" : "Review")}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-1">{item.name}</h3>
                          <p className="ml-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 mt-3 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <LockClosedIcon className="h-5 w-5 text-gray-400 mr-1" />
                    <span>Secure checkout</span>
                  </div>

                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <ShieldCheckIcon className="h-5 w-5 text-gray-400 mr-1" />
                    <span>Guaranteed safe & secure checkout</span>
                  </div>

                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <TruckIcon className="h-5 w-5 text-gray-400 mr-1" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Need help?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our customer service team is available to assist you with any
                  questions about your order.
                </p>
                <a
                  href="mailto:support@shoestore.com"
                  className="text-sm font-medium text-primary hover:text-primary-dark"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
