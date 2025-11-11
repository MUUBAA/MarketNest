using Server.Data.Contract.CartItems;
using Server.Data.Dto;
using Server.Data.Entities.CartItems;
using Server.Data.Repositories;

namespace Server.Services.CartServices
{
    public interface ICartServices
    {
        bool AddToCart(CartItemAdd contract);
        bool RemoveFromCart(int id);
        CartItems GetCartItem(int id);
        PaginationResponse<CartItems> GetCartItems(CartItemContract contract);
    }
    public class CartServices(ICartRepository cartRepository) : ICartServices
    {
        public bool AddToCart(CartItemAdd contract)
        {
            cartRepository.AddToCart(contract);
            return true;
        }
        public bool RemoveFromCart(int id)
        {
            cartRepository.RemoveFromCart(id);
            return true;
        }
        public CartItems GetCartItem(int id)
        {
            return cartRepository.GetCartItem(id);
        }
        public PaginationResponse<CartItems> GetCartItems(CartItemContract contract)
        {
            var (totalItems, totalPages, items) = cartRepository.GetCartItems(contract);
            return new PaginationResponse<CartItems>
            {
                TotalItems = totalItems,
                ItemsPerPage = contract.PageSize,
                TotalPages = totalPages,
                CurrentPage = contract.Page,
                Items = items
            };
        }
    }
}
