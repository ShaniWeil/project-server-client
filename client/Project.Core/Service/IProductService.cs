using Project.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Service
{
    public interface IProductService
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
