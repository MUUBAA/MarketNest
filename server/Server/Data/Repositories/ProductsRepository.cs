using Server.Data.Contract.Products;
using Server.Data.Dto;
using Server.Data.Entities.Products;
using static Server.Data.Exceptions.DataExceptions;

namespace Server.Data.Repositories
{
    public interface IProductsRepository
    {
        int CreateProduct(Products products);
        void UpdateProduct(ProductUpdate productUpdate);
        Products? GetProductById(int productId);
        List<Products> GetAllProducts();
        List<ProductSearchDto> SearchProductsByName(string itemName);
    }
    public class ProductsRepository(Repository repository) : IProductsRepository
    {
        public int CreateProduct(Products products)
        {
            var existingProduct = repository.Products.FirstOrDefault(p => p.ItemName == products.ItemName);
            if (existingProduct != null)
            {
                if (!existingProduct.IsDeleted)
                {
                    throw new Exception("Product with the same name already exists.");

                }

                else
                {
                    existingProduct.IsDeleted = false;
                    existingProduct.UpdatedAt = DateTime.UtcNow;
                    existingProduct.UpdatedBy = products.CreatedBy;
                    repository.SaveChanges();
                    return existingProduct.Id;
                }
            }
            repository.Add(products);
            repository.SaveChanges();
            return products.Id;
        }

        public void UpdateProduct(ProductUpdate productUpdate)
        {
            var existingProduct = repository.Products.FirstOrDefault(p => p.Id == productUpdate.ProductId);
            if (existingProduct == null)
            {
                throw new Exception("Product not found.");
            }
            existingProduct.ItemName = productUpdate.ItemName;
            existingProduct.ItemDescription = productUpdate.ItemDescription;
            existingProduct.ItemPrice = productUpdate.ItemPrice;
            existingProduct.CategoryId = productUpdate.CategoryId;
            existingProduct.CategoryName = productUpdate.CategoryName;
            existingProduct.StockQuantity = productUpdate.StockQuantity;
            existingProduct.UpdatedAt = DateTime.UtcNow;
            existingProduct.UpdatedBy = productUpdate.UpdatedBy;
            repository.SaveChanges();
        }

         public Products? GetProductById(int productId)
        {
            return  repository.Products.FirstOrDefault(p => p.Id == productId); 
        }

        public List<Products> GetAllProducts()
        {
            return repository.Products.Where(p => !p.IsDeleted).ToList();
        }
        public List<ProductSearchDto> SearchProductsByName(string itemName)
        {
            var query = repository.Products.AsQueryable();
            if (!string.IsNullOrEmpty(itemName))
            {
                query = query.Where(p => p.ItemName != null && p.ItemName.Contains(itemName));
            }

            var products = repository.Products
                .Where(p => p.ItemName != null && p.ItemName.Contains(itemName))
                .Select(p => new ProductSearchDto
                {
                    Id = p.Id,
                    ItemName = p.ItemName
                }).ToList();
            return products;
        }

    }
}
