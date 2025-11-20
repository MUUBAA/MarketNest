// src/pages/HomeCategoryRow.tsx
import React from 'react';
import ProductCarousel from '../../components/ProductCarousel';
import { useCategoryProducts } from '../../hooks/useCategoryProduct';

type HomeCategoryRowProps = {
  title: string;
  categorySlug: string;
  categoryId: number;
  itemsPerPage?: number;
};

const HomeCategoryRow: React.FC<HomeCategoryRowProps> = ({
  title,
  categorySlug,
  categoryId,
  itemsPerPage = 8,
}) => {
  const { products, loading, error } = useCategoryProducts(
    categoryId,
    itemsPerPage
  );

  if (loading) {
    return (
      <div className="my-4 flex h-40 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {title}: {error}
      </div>
    );
  }

  if (!products.length) return null;

  return (
    <ProductCarousel
      title={title}
      categorySlug={categorySlug}
      products={products}
    />
  );
};

export default HomeCategoryRow;
