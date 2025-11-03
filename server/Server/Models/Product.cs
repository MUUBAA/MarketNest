namespace Server.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Price { get; set; } = string.Empty; // Keep as string to match frontend (e.g., "₹26")
    public string? OriginalPrice { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? Discount { get; set; }
    public double? Rating { get; set; }
    public string? Reviews { get; set; }
    public string? Weight { get; set; }
}


