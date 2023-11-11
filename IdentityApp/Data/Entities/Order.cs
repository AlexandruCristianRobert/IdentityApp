using System.Text.Json.Serialization;

namespace Webshop.Data.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        [JsonIgnore] 
        public int BasketId { get; set; }
        [JsonIgnore]
        public Basket Basket { get; set; }
    }
}
