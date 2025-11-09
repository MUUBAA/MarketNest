using Server.Data.Base;

namespace Server.Data.Entities.Payments
{
    public class Payments: BaseEntities
    {
        public required int PaymentId { get; set; }
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public bool Status { get; set; }
    }
}
