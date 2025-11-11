namespace Server.Data.Contract.CartItems
{
    public class CartItemContract : PaginationContract
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
