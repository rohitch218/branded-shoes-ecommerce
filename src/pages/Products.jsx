import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  FunnelIcon,
  XMarkIcon,
  StarIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import ProductCard from "../components/ProductCard";

// Mock data - in a real app, this would come from an API
const allProducts = [
  // Men's shoes
  {
    id: 1,
    name: "Air Max 270",
    brand: "Nike",
    price: 150.0,
    originalPrice: 180.0,
    rating: { average: 4.5, count: 128 },
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcCS.png",
    ],
    colors: ["#000000", "#E6E6E6", "#3D3D3D"],
    sizes: [7, 8, 9, 10, 11, 12],
    category: "men",
    isNew: true,
    isOnSale: true,
  },
  {
    id: 2,
    name: "Classic Leather",
    brand: "Reebok",
    price: 85.0,
    originalPrice: 100.0,
    rating: { average: 4.3, count: 76 },
    images: [
      "https://reebok.ugc.bazaarvoice.com/ugc/reebok/classic-leather-shoes.jpg",
    ],
    colors: ["#FFFFFF", "#B22222", "#000000"],
    sizes: [7, 8, 9, 10, 11, 12],
    category: "men",
    isNew: false,
    isOnSale: true,
  },
  // Women's shoes
  {
    id: 3,
    name: "Ultraboost 22",
    brand: "Adidas",
    price: 180.0,
    rating: { average: 4.8, count: 95 },
    images: [
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2ce1e3deb59f4907a336af0e00fb1ffa_9366/Ultraboost_22_Shoes_Black_GX6257_01_standard.jpg",
    ],
    colors: ["#000000", "#0066CC", "#FFFFFF"],
    sizes: [5, 6, 7, 8, 9, 10],
    category: "women",
    isNew: true,
    isOnSale: false,
  },
  {
    id: 4,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 65.0,
    rating: { average: 4.7, count: 210 },
    images: [
      "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-converse-master/default/dw0d2d8a0a/images/100/100200220C-1.jpg",
    ],
    colors: ["#000000", "#FFFFFF", "#B22222"],
    sizes: [5, 6, 7, 8, 9, 10],
    category: "women",
    isNew: false,
    isOnSale: false,
  },
  // Unisex shoes
  {
    id: 5,
    name: "RS-X3",
    brand: "Puma",
    price: 110.0,
    rating: { average: 4.6, count: 64 },
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:f8f8f8,w_2000,h_2000/global/375810/01/sv01/fnd/EEA/fmt/png/RS-X3-Sneakers",
    ],
    colors: ["#FF8C00", "#000000", "#1E90FF"],
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
    category: "unisex",
    isNew: true,
    isOnSale: false,
  },
  {
    id: 6,
    name: "Old Skool",
    brand: "Vans",
    price: 75.0,
    originalPrice: 90.0,
    rating: { average: 4.4, count: 185 },
    images: [
      "https://images.vans.com/is/image/Vans/EYEBWW-HERO?$PDP-FULL-IMAGE$",
    ],
    colors: ["#000000", "#FFFFFF", "#8B0000"],
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
    category: "unisex",
    isNew: false,
    isOnSale: true,
  },
  // Kids shoes
  {
    id: 7,
    name: "Toddler Air Max 270",
    brand: "Nike",
    price: 85.0,
    rating: { average: 4.6, count: 42 },
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcCS.png",
    ],
    colors: ["#FFD700", "#FF69B4", "#00BFFF"],
    sizes: [10, 11, 12, 1, 2, 3, 4],
    category: "kids",
    isNew: true,
    isOnSale: false,
  },
  {
    id: 8,
    name: "Kids Classic Velcro",
    brand: "Adidas",
    price: 55.0,
    originalPrice: 65.0,
    rating: { average: 4.5, count: 78 },
    images: [
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2ce1e3deb59f4907a336af0e00fb1ffa_9366/Ultraboost_22_Shoes_Black_GX6257_01_standard.jpg",
    ],
    colors: ["#FF0000", "#0000FF", "#FFFFFF"],
    sizes: [10, 11, 12, 1, 2, 3, 4],
    category: "kids",
    isNew: false,
    isOnSale: true,
  },
];

// Available filters
const brands = [...new Set(allProducts.map((product) => product.brand))];
const categories = [...new Set(allProducts.map((product) => product.category))];
const sizes = [
  ...new Set(allProducts.flatMap((product) => product.sizes)),
].sort((a, b) => a - b);

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Get filter values from URL
  const categoryFilter = searchParams.get("category") || "";
  const brandFilter = searchParams.get("brand") || "";
  const sizeFilter = searchParams.get("size")
    ? parseInt(searchParams.get("size"))
    : null;
  const minPrice = searchParams.get("minPrice")
    ? parseFloat(searchParams.get("minPrice"))
    : 0;
  const maxPrice = searchParams.get("maxPrice")
    ? parseFloat(searchParams.get("maxPrice"))
    : 500;
  const sortBy = searchParams.get("sort") || "featured";
  const searchQuery = searchParams.get("q") || "";

  // Apply filters
  const filteredProducts = allProducts.filter((product) => {
    return (
      (categoryFilter === "" || product.category === categoryFilter) &&
      (brandFilter === "" || product.brand === brandFilter) &&
      (sizeFilter === null || product.sizes.includes(sizeFilter)) &&
      product.price >= minPrice &&
      product.price <= maxPrice &&
      (searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating.average - a.rating.average;
      case "newest":
        return b.isNew ? 1 : -1;
      default:
        return 0; // featured (default)
    }
  });

  // Update URL with new filter values
  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === "" || value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
  };

  // Check if any filters are active
  const hasActiveFilters =
    categoryFilter ||
    brandFilter ||
    sizeFilter !== null ||
    minPrice > 0 ||
    maxPrice < 500;

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryFilter
              ? `${
                  categoryFilter.charAt(0).toUpperCase() +
                  categoryFilter.slice(1)
                }'s Shoes`
              : "All Shoes"}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            {/* Mobile filter button */}
            <button
              type="button"
              className="md:hidden flex items-center text-gray-700 mb-4"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              {isMobileFiltersOpen ? "Hide Filters" : "Show Filters"}
            </button>

            <div
              className={`${isMobileFiltersOpen ? "block" : "hidden"} md:block`}
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Category
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          id={`category-${category}`}
                          type="radio"
                          name="category"
                          checked={categoryFilter === category}
                          onChange={() =>
                            updateFilters(
                              "category",
                              categoryFilter === category ? "" : category
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="ml-3 text-sm text-gray-600 capitalize"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Brand
                  </h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center">
                        <input
                          id={`brand-${brand}`}
                          type="radio"
                          name="brand"
                          checked={brandFilter === brand}
                          onChange={() =>
                            updateFilters(
                              "brand",
                              brandFilter === brand ? "" : brand
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label
                          htmlFor={`brand-${brand}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Size
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          updateFilters(
                            "size",
                            sizeFilter === size ? null : size
                          )
                        }
                        className={`flex items-center justify-center w-10 h-10 rounded-md border text-sm ${
                          sizeFilter === size
                            ? "bg-primary text-white border-primary"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <label
                          htmlFor="minPrice"
                          className="block text-xs text-gray-500 mb-1"
                        >
                          Min
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            name="minPrice"
                            id="minPrice"
                            min="0"
                            max={maxPrice}
                            value={minPrice}
                            onChange={(e) =>
                              updateFilters(
                                "minPrice",
                                Math.max(
                                  0,
                                  Math.min(maxPrice - 1, Number(e.target.value))
                                )
                              )
                            }
                            className="focus:ring-primary focus:border-primary block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center px-2 pt-6">
                        <span className="text-gray-500">-</span>
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="maxPrice"
                          className="block text-xs text-gray-500 mb-1"
                        >
                          Max
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            name="maxPrice"
                            id="maxPrice"
                            min={minPrice + 1}
                            max="1000"
                            value={maxPrice}
                            onChange={(e) =>
                              updateFilters(
                                "maxPrice",
                                Math.min(
                                  1000,
                                  Math.max(minPrice + 1, Number(e.target.value))
                                )
                              )
                            }
                            className="focus:ring-primary focus:border-primary block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
                            placeholder="500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      Active Filters
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {categoryFilter && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {categoryFilter}
                          <button
                            type="button"
                            onClick={() => updateFilters("category", "")}
                            className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary hover:bg-primary/20 focus:outline-none"
                          >
                            <XMarkIcon className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                      {brandFilter && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {brandFilter}
                          <button
                            type="button"
                            onClick={() => updateFilters("brand", "")}
                            className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary hover:bg-primary/20 focus:outline-none"
                          >
                            <XMarkIcon className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                      {sizeFilter !== null && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          Size: {sizeFilter}
                          <button
                            type="button"
                            onClick={() => updateFilters("size", null)}
                            className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary hover:bg-primary/20 focus:outline-none"
                          >
                            <XMarkIcon className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                      {(minPrice > 0 || maxPrice < 500) && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          ${minPrice} - ${maxPrice}
                          <button
                            type="button"
                            onClick={() => {
                              updateFilters("minPrice", 0);
                              updateFilters("maxPrice", 500);
                            }}
                            className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary hover:bg-primary/20 focus:outline-none"
                          >
                            <XMarkIcon className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">1-{sortedProducts.length}</span>{" "}
                of <span className="font-medium">{sortedProducts.length}</span>{" "}
                results
              </p>

              <div className="relative">
                <select
                  id="sort"
                  name="sort"
                  value={sortBy}
                  onChange={(e) => updateFilters("sort", e.target.value)}
                  className="pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* No Results */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination - Placeholder for now */}
          {sortedProducts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav
                className="inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronDownIcon
                    className="h-5 w-5 transform rotate-90"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="#"
                  className="bg-primary text-white relative inline-flex items-center px-4 py-2 border border-primary text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronDownIcon
                    className="h-5 w-5 transform -rotate-90"
                    aria-hidden="true"
                  />
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
