import { Link } from 'react-router-dom';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate average rating (for demo, using product.rating if it exists, otherwise a default value)
  const averageRating = product.rating?.average || 4.5;
  const reviewCount = product.rating?.count || 24;
  
  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Favorite Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors ${
          isFavorite 
            ? 'text-red-500 bg-white/90' 
            : 'text-gray-400 bg-white/80 hover:bg-white/90 hover:text-red-500'
        }`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
      </button>
      
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="block relative pt-[100%] bg-gray-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick View Button - Shown on hover */}
        <div 
          className={`absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // Handle quick view functionality
              console.log('Quick view:', product.id);
            }}
          >
            Quick View
          </button>
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2">
              {product.brand} {product.name}
            </h3>
          </Link>
          <div className="text-lg font-semibold text-gray-900 ml-2 whitespace-nowrap">
            ${product.price.toFixed(2)}
            {product.originalPrice && (
              <span className="ml-1 text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.round(averageRating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
              />
            ))}
            <span className="ml-1 text-xs text-gray-500">
              ({reviewCount})
            </span>
          </div>
        </div>
        
        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-1 mt-2">
            {product.colors.slice(0, 4).map((color, index) => (
              <span
                key={index}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">
                +{product.colors.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button 
          className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-primary-dark transition-colors"
          onClick={() => {
            // Handle add to cart
            console.log('Added to cart:', product.id);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
