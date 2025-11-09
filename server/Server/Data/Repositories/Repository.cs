using Microsoft.EntityFrameworkCore;
using Server.Data.Entities.Users;
using Server.Data.Entities.Products;
using Server.Data.Contract.Products;

namespace Server.Data.Repositories
{
    public class Repository : DbContext
    {
        public Repository(DbContextOptions<Repository> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Products> Products { get; set; }

    }
}
