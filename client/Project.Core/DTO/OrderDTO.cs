using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set; }
        public double Sum { get; set; }

       // public Product[] Product { get; set; }

    }
}
