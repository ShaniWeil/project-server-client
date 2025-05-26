using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Data
{
    public interface IProductData
    {
        IEnumerable<Product> GetAll();
        Product[] GetByCategoryId(int id);
        Product GetById(int id);
        IEnumerable<Product> GetZeroStockQuantity();
        Task AddProduct(Product product);
        Task UpdateProduct(Product product, int id);
        Task RemoveProduct(int id);
    }
}
