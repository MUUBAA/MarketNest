// src/hooks/useCategoryProducts.ts
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/stores';
import {
  fetchAllProducts,
  type GetAllProductsPayload,
} from '../../redux/thunk/product';
import type { Product } from '../../redux/slices/productsSlice';

export type HomeProduct = {
  id: number;
  itemName: string;
  itemPrice: string;
  originalPrice?: string;
  discount?: string;
  itemUrl: string;
  rating: number;
  reviews: string;
  weight: string;
};

const transformProductToHomeCard = (product: Product): HomeProduct => {
  const price = product.itemPrice ?? 0;

  return {
    id: product.id,
    itemName: product.itemName,
    itemPrice: `₹${price}`,
    originalPrice: price > 0 ? `₹${Math.round(price * 1.2)}` : undefined,
    discount: price > 0 ? `₹${Math.round(price * 0.2)} OFF` : undefined,
    itemUrl: product.itemUrl,
    rating: 4.5,
    reviews: '100',
    weight: product.itemDescription || '1 kg',
  };
};

export const useCategoryProducts = (
  categoryId: number,
  itemsPerPage: number = 8
) => {
  const dispatch = useDispatch<AppDispatch>();

  const [products, setProducts] = useState<HomeProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const payload: GetAllProductsPayload = {
          id: 0,
          categoryId,
          itemName: '',
          itemsPerPage,
          totalItems: 0,
          totalPages: 0,
          currentPage: 0,
        };

        const result: any = await dispatch(fetchAllProducts(payload));

        if (cancelled) return;

        if (result.meta.requestStatus === 'fulfilled') {
          const raw = (result.payload || []) as Product[];
          const transformed = raw
            .slice(0, itemsPerPage)
            .map(transformProductToHomeCard);

          setProducts(transformed);
        } else {
          setError(result.error?.message || 'Failed to fetch products');
          setProducts([]);
        }
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setError('Failed to fetch products');
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();

    return () => {
      cancelled = true;
    };
  }, [categoryId, itemsPerPage, dispatch]);

  return { products, loading, error };
};
