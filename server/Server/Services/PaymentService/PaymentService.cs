using Microsoft.Extensions.Configuration;
using Razorpay.Api;
using Server.Data.Contract.Payments;
using Server.Data.Dto;
using Server.Data.Repositories;
using System.Security.Cryptography;
using System.Text;

namespace Server.Services.PaymentService
{
    public interface IPaymentService
    {
        PaymentDto CreatePaymentOrder(PaymentCreateContract contract);
        bool VerifyPayment(PaymentVerifyContract contract);
    }
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly string _razorpayKey;
        private readonly string _razorpaySecret;

        public PaymentService(IPaymentRepository paymentRepository, IConfiguration configuration)
        {
            _paymentRepository = paymentRepository;
            _razorpayKey = configuration["Razorpay:Key"] ?? throw new Exception("Razorpay Key not configured");
            _razorpaySecret = configuration["Razorpay:Secret"] ?? throw new Exception("Razorpay Secret not configured");

            Console.WriteLine($"RazorpayKey: {_razorpayKey}");
            Console.WriteLine($"RazorpaySecret length: {_razorpaySecret.Length}");

        }

        public PaymentDto CreatePaymentOrder(PaymentCreateContract contract)
        {
           var client = new RazorpayClient(_razorpayKey, _razorpaySecret);
             
           var amountInPaise = (int)(contract.Amount * 100);

           var options = new Dictionary<string, object>
              {
                { "amount", amountInPaise },
                { "currency", "INR" },
                { "payment_capture", 1 }
              };
            
            var order = client.Order.Create(options);

            var razorpayOrderId = order["id"].ToString();

            _paymentRepository.CreatePayment(
                orderId: contract.OrderId,
                amount: contract.Amount,
                paymentMethod: contract.PaymentMethod,
                razorpayOrderId: razorpayOrderId
                );

            return new PaymentDto
            {
                RazorpayKey = _razorpayKey,
                RazorpayOrderId = razorpayOrderId,
                AmountInPaise = amountInPaise,
                Currency = "INR"
            };
        }

        public bool VerifyPayment(PaymentVerifyContract contract)
        {
           var payload = $"{contract.RazorpayOrderId}|{contract.RazorpayPaymentId}";
           var expectedSignature = CalculateHmac256(payload, _razorpaySecret);

           if(!string.Equals(expectedSignature, contract.RazorpaySignature, StringComparison.OrdinalIgnoreCase))
           {
                return false;
           }

             _paymentRepository.MarkPaymentAsCompleted(
                 razorpayOrderId: contract.RazorpayOrderId,
                 razorpaymentId: contract.RazorpayPaymentId,
                 signature: contract.RazorpaySignature
                 );
              return true;
        }

        private static string CalculateHmac256(string text, string secret)
        {
            var encoding = new ASCIIEncoding();
            byte[] keyBytes = encoding.GetBytes(secret);
            byte[] textBytes = encoding.GetBytes(text);
            using var hash = new HMACSHA256(keyBytes);
            byte[] hashBytes = hash.ComputeHash(textBytes);

            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }
}
