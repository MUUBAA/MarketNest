using Server.Data.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Data.Entities.Payments
{
    [Table("Payments")]
    public class Payments: BaseEntities
    {
        [Column("order_id")]
        public int OrderId { get; set; }

        [Column("amount")]
        public decimal Amount { get; set; }

        [Column("payment_method")]
        public string PaymentMethod { get; set; } = string.Empty;

        [Column("status")]
        public string Status { get; set; } = "pending";

        [Column("razorpay_order_id")]
        public string RazorpayOrderId { get; set; } = string.Empty;

        [Column("razorpay_payment_id")]
        public string RazorpayPaymentId { get; set; } = string.Empty;

        [Column("razorpay_signature")]
        public string RazorpaySignature { get; set; } = string.Empty;

        [Column("error_message")]
        public string ErrorMessage { get; set; } = string.Empty;
    }
}
