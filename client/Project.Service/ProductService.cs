using Project.Core;
using Project.Core.Data;
using Project.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Service
{
    public class ProductService: IProductService
    {
        private readonly IProductData productData;

        public ProductService(IProductData _productData)
        {
            productData = _productData;
        }

        public async Task AddProduct(Product product)
        {
            await productData.AddProduct(product);
        }

        public IEnumerable<Product> GetAll()
        {
            return productData.GetAll();
        }

        public Product[] GetByCategoryId(int id)
        {
            return productData.GetByCategoryId(id);
        }

        public Product GetById(int id)
        {
            return productData.GetById(id);
        }


        public IEnumerable<Product> GetZeroStockQuantity()
        {
            return productData.GetZeroStockQuantity();
        }

        public async Task RemoveProduct(int id)
        {
            await productData.RemoveProduct(id);
        }

        public async Task UpdateProduct(Product product, int id)
        {
            await productData.UpdateProduct(product, id);
        }
    }
}
