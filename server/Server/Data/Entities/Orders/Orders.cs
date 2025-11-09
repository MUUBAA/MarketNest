using Server.Data.Base;

namespace Server.Data.Entities.Orders
{
    public class Orders : BaseEntities
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public decimal TotalPrice { get; set; }
        public bool Status { get; set; }
    }
}
