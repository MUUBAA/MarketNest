namespace Server.Data.Dto
{
    public class PaymentDto
    {
        public string RazorpayKey { get; set; } = string.Empty;
        public string RazorpayOrderId { get; set; } = string.Empty;
        public int AmountInPaise { get; set; }
        public string Currency { get; set; } = "INR";

        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
        public string? UserContact { get; set; }
    }
}
