// components/ProductCard.tsx
import { Star } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/thunk/cart';
import type { AppDispatch, RootState } from '../../redux/stores';

interface ProductCardProps {
  productId: number;             // <-- needed
  itemName: string;
  itemPrice: string;             // like "₹199" or "199.00"
  originalPrice?: string;
  itemUrl: string;
  discount?: string;
  rating?: number;
  reviews?: string;
  weight?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  itemName,
  itemPrice,
  originalPrice,
  itemUrl,
  discount,
  rating,
  reviews,
  weight,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // If you already store user in redux:
  const userId = useSelector((state: RootState) => state.user.UserAccount?.id
    ?? state.user.userProfile?.Id// whichever you have
  );

  const handleAddToCart = () => {
    if (!userId) {
      // Optionally route to login or show toast
      console.warn('No user. Redirect to login.');
      return;
    }

    // Extract numeric price (handles "₹199" or "$12.50")
    const numericPrice = Number(
      String(itemPrice).replace(/[^\d.]/g, '')
    );

    if (Number.isNaN(numericPrice)) {
      console.error('Invalid price format for', itemName, itemPrice);
      return;
    }

    dispatch(
      addToCart({
        userId,
        productId,
        quantity: 1,        // default to 1; make dynamic if you have a qty control
        price: numericPrice,
      })
    );
  };

  return (
    <div className="relative flex min-w-[160px] max-w-[180px] flex-col rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <div className="relative mb-3">
        <img className="h-32 w-full rounded-md object-cover" src={itemUrl} alt={itemName} />
        <button
          className="absolute bottom-2 right-2 cursor-pointer rounded-md border border-pink-500 bg-white px-3 py-1 text-sm font-semibold text-pink-500 transition-colors hover:bg-pink-50"
          onClick={handleAddToCart}
        >
          ADD
        </button>
      </div>

      <div className="mb-2 flex items-baseline gap-2">
        <span className="rounded bg-green-600 px-2 py-1 text-sm font-bold text-white">{itemPrice}</span>
        {originalPrice && <span className="text-sm text-gray-500 line-through">{originalPrice}</span>}
      </div>

      {discount && <p className="mb-2 text-xs font-semibold text-green-700">{discount}</p>}
      <h3 className="mb-1 line-clamp-2 text-sm font-medium leading-tight text-gray-800">{itemName}</h3>
      {weight && <p className="mb-2 text-xs text-gray-500">{weight}</p>}
      {rating && (
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-gray-800">{rating}</span>
          {reviews && <span>({reviews})</span>}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
