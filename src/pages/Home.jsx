import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';

// Mock data - in a real app, this would come from an API
const featuredProducts = [
  {
    id: 1,
    name: 'Air Max 270',
    brand: 'Nike',
    price: 150.00,
    originalPrice: 180.00,
    rating: { average: 4.5, count: 128 },
    images: ['https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcCS.png'],
    colors: ['#000000', '#E6E6E6', '#3D3D3D'],
    category: 'men',
  },
  {
    id: 2,
    name: 'Ultraboost 22',
    brand: 'Adidas',
    price: 180.00,
    rating: { average: 4.8, count: 95 },
    images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2ce1e3deb59f4907a336af0e00fb1ffa_9366/Ultraboost_22_Shoes_Black_GX6257_01_standard.jpg'],
    colors: ['#000000', '#0066CC', '#FFFFFF'],
    category: 'women',
  },
  {
    id: 3,
    name: 'Classic Leather',
    brand: 'Reebok',
    price: 85.00,
    originalPrice: 100.00,
    rating: { average: 4.3, count: 76 },
    images: ['https://reebok.ugc.bazaarvoice.com/ugc/reebok/classic-leather-shoes.jpg'],
    colors: ['#FFFFFF', '#B22222', '#000000'],
    category: 'men',
  },
  {
    id: 4,
    name: 'RS-X3',
    brand: 'Puma',
    price: 110.00,
    rating: { average: 4.6, count: 64 },
    images: ['https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:f8f8f8,w_2000,h_2000/global/375810/01/sv01/fnd/EEA/fmt/png/RS-X3-Sneakers'],
    colors: ['#FF8C00', '#000000', '#1E90FF'],
    category: 'unisex',
  },
];

const categories = [
  {
    name: 'Men',
    slug: 'men',
    image: 'https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Women',
    slug: 'women',
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Kids',
    slug: 'kids',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'New Arrivals',
    slug: 'new-arrivals',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55a2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-100 h-[500px] overflow-hidden">
        <div className="absolute inset-0 flex transition-transform duration-1000" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {[1, 2, 3].map((slide) => (
            <div key={slide} className="w-full flex-shrink-0 h-full flex items-center">
              <div className="container mx-auto px-4 z-10 relative">
                <div className="max-w-xl">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {slide === 1 && 'New Collection 2024'}
                    {slide === 2 && 'Summer Sale - Up to 50% Off'}
                    {slide === 3 && 'Premium Quality Footwear'}
                  </h1>
                  <p className="text-lg text-gray-700 mb-8">
                    {slide === 1 && 'Discover the latest trends in footwear for every occasion.'}
                    {slide === 2 && 'Limited time offer on selected styles. Don\'t miss out!'}
                    {slide === 3 && 'Experience unmatched comfort and style with our premium collection.'}
                  </p>
                  <Link 
                    to={slide === 2 ? "/sale" : "/products"} 
                    className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
                  >
                    {slide === 2 ? 'Shop Sale' : 'Shop Now'}
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
              <img 
                src={`https://source.unsplash.com/random/1600x900/?sneakers,${slide}`} 
                alt={`Slide ${slide}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeSlide ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of footwear categories to find your perfect pair
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                to={`/products?category=${category.slug}`}
                className="group relative rounded-xl overflow-hidden h-64 hover:shadow-lg transition-shadow"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600">Handpicked selection of premium footwear</p>
            </div>
            <Link 
              to="/products" 
              className="text-primary font-medium hover:underline flex items-center"
            >
              View All
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to get 10% off your first order and be the first to know about new arrivals and exclusive offers.
          </p>
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-3 rounded-l-md text-gray-900 focus:outline-none"
            />
            <button className="bg-black text-white px-6 py-3 rounded-r-md font-medium hover:bg-gray-900 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
