// ProductCarousel.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  title: string;
  seeAllRoute?: string;
  products: {
    id: number;
    itemName: string;
    itemPrice: string;
    originalPrice?: string;
    itemUrl: string;
    discount?: string;
  }[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, seeAllRoute, products }) => {
  const navigate = useNavigate();
  
  const handleSeeAllClick = () => {
    if (seeAllRoute) {
      navigate(seeAllRoute);
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {seeAllRoute && (
          <button 
            onClick={handleSeeAllClick}
            className="cursor-pointer text-sm font-medium text-pink-500 hover:text-pink-600"
          >
            See All →
          </button>
        )}
      </div>
      
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
        {products.map((product, index) => (
          <div key={`${product.itemName}-${index}`} className="flex-shrink-0">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
