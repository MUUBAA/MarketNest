using Server.Data.Entities.Payments;

namespace Server.Data.Repositories
{
    public interface IPaymentRepository
    {
        Payments CreatePayment(int orderId, decimal amount, string paymentMethod, string razorpayOrderId);
        Payments? GetPaymentByRazorpayOrderId(string razorpayOrderId);
        void MarkPaymentAsCompleted(string razorpayOrderId, string razorpaymentId, string signature);
        void MarkPaymentFailed(string razorpayOrderId, string? errorMessage = null);
    }
    public class PaymentRepository : IPaymentRepository
    {
        private readonly Repository _repository;

        public PaymentRepository(Repository repository)
        {
            _repository = repository;
        }

        public Payments CreatePayment(int orderId, decimal amount, string paymentMethod, string razorpayOrderId)
        {
            var payment = new Payments
            {
                OrderId = orderId,
                Amount = amount,
                PaymentMethod = paymentMethod,
                RazorpayOrderId = razorpayOrderId,
                Status = "PENDING",
                CreatedAt = DateTime.UtcNow
            };
            _repository.Add(payment);
            _repository.SaveChanges();
            return payment;
        }

        public Payments? GetPaymentByRazorpayOrderId(string razorpayOrderId)
        {
            return _repository.Payments.FirstOrDefault(p => p.RazorpayOrderId == razorpayOrderId);
        }

        public void MarkPaymentAsCompleted(string razorpayOrderId, string razorpaymentId, string signature)
        {
            var payment = GetPaymentByRazorpayOrderId(razorpayOrderId) ?? throw new Exception("Payment not found");
            if (payment != null)
            {
                payment.Status = "COMPLETED";
                payment.RazorpayPaymentId = razorpaymentId.ToString();
                payment.RazorpaySignature = signature;
                payment.UpdatedAt = DateTime.UtcNow;
                _repository.Update(payment);
                _repository.SaveChanges();
            }
        }
        public void MarkPaymentFailed(string razorpayOrderId, string? errorMessage = null)
        {
            var payment = GetPaymentByRazorpayOrderId(razorpayOrderId) ?? throw new Exception("Payment not found");
            if (payment != null)
            {
                payment.Status = "FAILED";
                payment.ErrorMessage = errorMessage ?? "Unknown error";
               
                _repository.Update(payment);
                _repository.SaveChanges();
            }
        }
    }
}
