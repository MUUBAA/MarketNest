using Server.Data.Base;

namespace Server.Data.Entities.CartItems
{
    public class CartItems: BaseEntities
    {
        public required int CartItemId { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
