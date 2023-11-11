using Webshop.Models;

namespace Webshop.Data.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public double Price { get; set; }
        public List<Order> Orders { get; set; } = new List<Order>();

    }
}
