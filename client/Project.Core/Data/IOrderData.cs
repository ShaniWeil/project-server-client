using Project.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Data
{
    public interface IOrderData
    {
        IEnumerable<Order> GetAll();
        Order GetById(int id);
        IEnumerable<Order> GetByUserId(string id);
        IEnumerable<Order> GetByDate(DateTime date);
        Task AddOrder(Order order);
    }
}
