import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

interface ProductGridProps {
  title: string;
  categorySlug?: string;
  products: {
    id: number;
    itemName: string;
    itemPrice: string;
    originalPrice?: string;
    itemUrl: string;
    discount?: string;
    rating?: number;
    reviews?: string;
    weight?: string;
  }[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, categorySlug, products }) => {
  const navigate = useNavigate();
  
  const handleSeeAllClick = () => {
    if (categorySlug) {
      // Navigate to specific route instead of generic category route
      navigate(`/${categorySlug}`);
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {categorySlug && (
          <button 
            onClick={handleSeeAllClick}
            className="cursor-pointer text-sm font-medium text-pink-500 hover:text-pink-600"
          >
            See All →
          </button>
        )}
      </div>
      
      {/* Mobile: Horizontal scroll, Tablet+: Grid layout */}
      <div
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5 xl:gap-12 2xl:grid-cols-6 2xl:gap-14 px-1"
      >
        {products.map((product, index) => (
          <div
            key={`${product.itemName}-${index}`}
            className="flex-shrink-0 sm:flex-shrink p-2 md:p-3 lg:p-4"
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;