using Microsoft.EntityFrameworkCore;
using Webshop.Data;
using Webshop.Data.Entities;

namespace Webshop.Services
{
    public class ProductService
    {
        private readonly Context _context;

        public ProductService(Context context)
        {
            _context = context;
        }

        public async Task<bool> AddProductAsync(Product product)
        {
            await _context.Products.AddAsync(product);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Basket> GetBasketAsync(Guid userId)
        {
            return await _context.Baskets.Include(b => b.Orders).ThenInclude(o => o.Product).FirstOrDefaultAsync(b => b.UserId == userId);
        }

        public async Task<bool> AddBasketAsync(Basket basket)
        {
            await _context.Baskets.AddAsync(basket);

            foreach(var order in basket.Orders)
            {
                if (_context.Products.FirstOrDefault(o => o.Id == order.ProductId) == null)
                    await _context.Products.AddAsync(order.Product);

                await _context.Orders.AddAsync(order);
            }

            return await _context.SaveChangesAsync() > 0;
        }


        public async Task<bool> UpdateBasketAsync(Basket basket)
        {
            var dbBasket = _context.Baskets.Include(b => b.Orders).ThenInclude(o => o.Product).FirstOrDefault(b => b.Id == basket.Id);
                
            dbBasket.Price = basket.Price;
            foreach (var order in basket.Orders)
            {
                var orderMatch = dbBasket.Orders.FirstOrDefault(o => o.ProductId == order.ProductId);
                
                if(orderMatch != null)
                {
                    if(order.Quantity <= 0)
                    {
                        _context.Orders.Remove(orderMatch);
                        continue;
                    }
                    orderMatch.Price = order.Price;
                    orderMatch.Quantity = order.Quantity;
                }
                else
                {
                    if (order.Quantity <= 0) continue;
                    var dbProduct = _context.Products.FirstOrDefault(o => o.Id == order.ProductId);
                        
                    if (dbProduct == null)
                    {
                        await _context.Products.AddAsync(order.Product);
                    }
                    else
                    {
                        var newOrder = new Order()
                        {
                            Id = order.Id,
                            Product = dbProduct,
                            Quantity = 1,
                            Price = dbProduct.Price * 1,
                            BasketId = basket.Id,
                        };
                        await _context.Orders.AddAsync(newOrder);
                    }
                }
            }

            return await _context.SaveChangesAsync() > 0;
        }


        public async Task<bool> DeleteBasketAsync(int basketId)
        {
            var basket = _context.Baskets.Include(b=> b.Orders).FirstOrDefault(b => b.Id == basketId);

            if(basket == null)
            {
                return false;
            }

            _context.Orders.RemoveRange(basket.Orders);

            basket.Price = 0;

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
