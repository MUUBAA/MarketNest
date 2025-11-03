using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly List<Product> Products = new()
    {
        new Product
        {
            Id = 1,
            Name = "Fresh Onion",
            Price = "₹26",
            OriginalPrice = "₹54",
            Discount = "₹28 OFF",
            ImageUrl = "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483611a.jpg?ts=1641540272",
            Weight = "1 Pack / 900 -1000 gm"
        },
        new Product
        {
            Id = 2,
            Name = "Coriander leaves",
            Price = "₹8",
            OriginalPrice = "₹16",
            Discount = "₹8 OFF",
            ImageUrl = "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/462971a.jpg?ts=1667826193",
            Weight = "1 pack (100 g)"
        },
        new Product
        {
            Id = 3,
            Name = "Parrys White Label Sugar",
            Price = "₹48",
            OriginalPrice = "₹65",
            Discount = "₹17 OFF",
            ImageUrl = "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/1000109a.jpg?ts=1689339414",
            Rating = 4.8,
            Reviews = "137.5k",
            Weight = "1 pack (1 kg)"
        }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetAll()
    {
        return Ok(Products);
    }

    [HttpGet("{id:int}")]
    public ActionResult<Product> GetById(int id)
    {
        var product = Products.FirstOrDefault(p => p.Id == id);
        if (product is null) return NotFound();
        return Ok(product);
    }

    [HttpPost]
    public ActionResult<Product> Create(Product product)
    {
        product.Id = Products.Any() ? Products.Max(p => p.Id) + 1 : 1;
        Products.Add(product);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, Product updated)
    {
        var product = Products.FirstOrDefault(p => p.Id == id);
        if (product is null) return NotFound();

        product.Name = updated.Name;
        product.Price = updated.Price;
        product.OriginalPrice = updated.OriginalPrice;
        product.ImageUrl = updated.ImageUrl;
        product.Discount = updated.Discount;
        product.Rating = updated.Rating;
        product.Reviews = updated.Reviews;
        product.Weight = updated.Weight;

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var product = Products.FirstOrDefault(p => p.Id == id);
        if (product is null) return NotFound();
        Products.Remove(product);
        return NoContent();
    }
}


