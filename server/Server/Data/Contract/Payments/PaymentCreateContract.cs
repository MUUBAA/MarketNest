namespace Server.Data.Contract.Payments
{
    public class PaymentCreateContract
    {
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = "RAZORPAY_UPI";
    }
}
