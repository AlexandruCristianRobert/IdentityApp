using Webshop.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Webshop.Data.Entities;

namespace Webshop.Data
{
    public class Context : IdentityDbContext<User>
    {
        public Context(DbContextOptions<Context> options): base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Basket> Baskets { get; set; }
    }
}
