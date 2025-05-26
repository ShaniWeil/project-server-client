using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int QuantityInStock { get; set; }
        public string RoutingToImage { get; set; }
    }
}
