using Microsoft.EntityFrameworkCore;
using Project.Core;
using Project.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Data.Data
{
    public class ProductData : IProductData
    {
        private readonly DataContext dataContext;

        public ProductData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public async Task AddProduct(Product product)
        {
            dataContext.products.Add(product);
            await dataContext.SaveChangesAsync();
        }

        public IEnumerable<Product> GetAll()
        {
            return dataContext.products.Include(x => x.Category);
        }

        public Product[] GetByCategoryId(int id)
        {
            return dataContext.products.Where(x => x.Id == id).ToArray();
        }

        public Product GetById(int id)
        {
            return dataContext.products.FirstOrDefault(x => x.Id == id);
        }


        public IEnumerable<Product> GetZeroStockQuantity()
        {
            return dataContext.products.Where(x => x.QuantityInStock == 0);
        }

        public async Task RemoveProduct(int id)
        {
            var x = dataContext.products.FirstOrDefault(x => x.Id == id);
            dataContext.Remove(x);
            await dataContext.SaveChangesAsync();
        }

        public async Task UpdateProduct(Product product, int id)
        {
            var x = dataContext.products.FirstOrDefault(x => x.Id == id);
            if (x != null)
            {
                x.Name = product.Name;
                x.Price = product.Price;
                x.Description = product.Description;
                x.Category = product.Category;
                x.QuantityInStock = product.QuantityInStock;
                x.RoutingToImage = product.RoutingToImage;
                x.CategoryId = product.CategoryId;
            }
            await dataContext.SaveChangesAsync();
        }
    
    }
}
