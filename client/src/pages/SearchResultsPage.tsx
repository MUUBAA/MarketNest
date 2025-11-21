import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../redux/stores';
import { fetchAllProducts } from '../../redux/thunk/product';
import ProductCard from '../components/ProductCard';
import type { Product } from '../../redux/slices/productsSlice';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useQuery();
  const searchTerm = query.get('query') || '';
  const [hasSearched, setHasSearched] = useState(false);
  const { loading, error } = useSelector((state: RootState) => state.products);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (searchTerm) {
      const fetchProducts = async () => {
        const response = await dispatch(fetchAllProducts({
          id: 0,
          totalItems: 0,
          totalPages: 0,
          currentPage: 0,
          itemName: searchTerm,
        }));
        if (response.meta.requestStatus === 'fulfilled') {
          if (Array.isArray(response.payload)) {
            setProducts(response.payload);
          } else if (response.payload && typeof response.payload === 'object') {
            setProducts(response?.payload?.items || []);
          } else {
            setProducts([]);
          }
        } else {
          setProducts([]);
        }
        setHasSearched(true);
      };
      fetchProducts();
    }
  }, [dispatch, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {!hasSearched && (
        <div className="text-center text-gray-500 p-8">
          <p>Type a product name in the search box above and press Enter to see results.</p>
        </div>
      )}
      {hasSearched && loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )}
      {hasSearched && error && (
        <div className="text-center text-red-600 p-4">
          <p>Error loading products: {error}</p>
        </div>
      )}
      {hasSearched && !loading && products.length === 0 && (
        <div className="text-center text-gray-500 p-8">
          <p>No products found for "{searchTerm}"</p>
        </div>
      )}
      {hasSearched && !loading && products.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              itemName={product.itemName}
              itemPrice={`₹${product.itemPrice}`}
              itemUrl={product.itemUrl}
              weight={product.itemDescription}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
