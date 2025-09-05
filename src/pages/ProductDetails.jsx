import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  StarIcon,
  HeartIcon,
  ArrowLeftIcon,
  ShoppingBagIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

// Mock data - in a real app, this would come from an API
const getProductById = (id) => {
  const allProducts = [
    {
      id: 1,
      name: "Air Max 270",
      brand: "Nike",
      price: 150.0,
      originalPrice: 180.0,
      rating: { average: 4.5, count: 128 },
      images: [
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcCS.png",
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcCS.png",
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcCS.png",
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcCS.png",
      ],
      colors: ["#000000", "#E6E6E6", "#3D3D3D"],
      sizes: [7, 8, 9, 10, 11, 12],
      category: "men",
      isNew: true,
      isOnSale: true,
      description:
        "The Nike Air Max 270 is a lifestyle shoe thats as versatile as it is comfortable. The Max Air unit in the heel adds soft, bouncy cushioning, while the lightweight upper provides a secure fit.",
      features: [
        "Foam midsole with Max Air unit in the heel for lightweight cushioning",
        "Rubber outsole for durable traction",
        "Breathable mesh upper with synthetic overlays",
        "Foam midsole with Max Air unit in the heel for lightweight cushioning",
        "Foam midsole with Max Air unit in the heel for lightweight cushioning",
      ],
      specifications: [
        { name: "Product Code", value: "AH8050-002" },
        { name: "Upper Material", value: "Mesh/Synthetic" },
        { name: "Lining", value: "Textile" },
        { name: "Insole", value: "Textile" },
        { name: "Sole", value: "Rubber" },
        { name: "Closure", value: "Lace-up" },
      ],
    },
    // Add more products as needed
  ];

  return allProducts.find((product) => product.id === parseInt(id));
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const product = getProductById(id);

  // Redirect to 404 if product not found
  useEffect(() => {
    if (!product) {
      navigate("/404");
    }
  }, [product, navigate]);

  if (!product) {
    return null; // or loading state
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      ...product,
      size: selectedSize,
      quantity,
    });

    // Show success message or navigate to cart
    alert(`${product.name} (Size: ${selectedSize}) added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const increaseQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-primary">
                Products
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-700 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg overflow-hidden mb-4 border border-gray-200">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border overflow-hidden ${
                      selectedImage === index
                        ? "border-primary ring-2 ring-primary"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {product.brand} {product.name}
                  </h1>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(product.rating.average)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        ({product.rating.count} reviews)
                      </span>
                    </div>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-green-600 font-medium">
                      In Stock
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full ${
                    isFavorite
                      ? "text-red-500"
                      : "text-gray-400 hover:text-gray-500"
                  }`}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <HeartIcon
                    className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      SALE
                    </span>
                  )}
                </div>
                {product.isOnSale && (
                  <div className="mt-1 text-sm text-gray-600">
                    Save ${(product.originalPrice - product.price).toFixed(2)} (
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100
                    )}
                    %)
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() =>
                      document
                        .getElementById("size-guide")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-1 border rounded-md text-center text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "bg-primary text-white border-primary"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50 focus:outline-none"
                    disabled={quantity <= 1}
                  >
                    <span className="text-xl">-</span>
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-300 text-gray-900">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50 focus:outline-none"
                    disabled={quantity >= 10}
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary-dark transition-colors"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Buy Now
                </button>
              </div>

              {/* Shipping Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <TruckIcon className="h-6 w-6 text-gray-500 mb-1" />
                    <span className="text-xs text-gray-600">
                      Free shipping on orders over $50
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ShieldCheckIcon className="h-6 w-6 text-gray-500 mb-1" />
                    <span className="text-xs text-gray-600">
                      2-year warranty
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ArrowPathIcon className="h-6 w-6 text-gray-500 mb-1" />
                    <span className="text-xs text-gray-600">
                      Easy 30-day returns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "description"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "features"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "specifications"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "reviews"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Reviews ({product.rating.count})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-6">
            {activeTab === "description" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Product Description
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            {activeTab === "features" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Key Features
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Product Specifications
                </h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {product.specifications.map((spec, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">
                            {spec.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.round(product.rating.average)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating.average} out of 5
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.rating.count} global ratings
                    </p>
                  </div>
                  <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Write a review
                  </button>
                </div>

                {/* Review Filters */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Review Filters
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        {rating} {rating === 1 ? "Star" : "Stars"}
                        <span className="ml-1 text-xs text-gray-500">
                          ({Math.floor(product.rating.count * (rating / 5))})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {[1, 2].map((review) => (
                    <div
                      key={review}
                      className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className={`h-5 w-5 ${
                                star <= 5 - (review % 2)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {review === 1 ? "Perfect fit" : "Great quality"}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {review === 1
                          ? "Amazing shoes, very comfortable!"
                          : "Good value for the price"}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {review === 1
                          ? "I bought these for my daily runs and they are incredibly comfortable. The cushioning is perfect and they look great too!"
                          : "These shoes are a great value for the price. They look good and feel comfortable. The only downside is they run a bit small."}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        by John D. • {review} week{review > 1 ? "s" : ""} ago •
                        Verified Purchase
                      </p>
                      {review === 1 && (
                        <div className="mt-3 flex space-x-2">
                          {[1, 2].map((img) => (
                            <div
                              key={img}
                              className="w-16 h-16 rounded border border-gray-200 overflow-hidden"
                            >
                              <img
                                src={product.images[0]}
                                alt="Review"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[2, 3, 4, 5].map((id) => {
              const relatedProduct = getProductById(id);
              if (!relatedProduct) return null;
              return (
                <div key={relatedProduct.id} className="group relative">
                  <Link to={`/products/${relatedProduct.id}`} className="block">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-2 text-sm text-gray-700">
                      {relatedProduct.brand} {relatedProduct.name}
                    </h3>
                    <div className="mt-1 flex items-center">
                      <p className="text-sm font-medium text-gray-900">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                      {relatedProduct.originalPrice && (
                        <p className="ml-1 text-xs text-gray-500 line-through">
                          ${relatedProduct.originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <div className="mt-1 flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(relatedProduct.rating.average)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-500">
                        ({relatedProduct.rating.count})
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
