using Server.Data.Base;

namespace Server.Data.Entities.OrderItems
{
    public class OrderItems: BaseEntities
    {
        public required int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
