using Project.Core;
using Project.Core.Data;
using Project.Core.DTO;
using Project.Core.Entities;
using Project.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Service
{
    public class OrderService: IOrderService
    {
        private readonly IOrderData ordertData;

        public OrderService(IOrderData _ordertData)
        {
            ordertData = _ordertData;
        }

        public IEnumerable<Order> GetAll()
        {
            return ordertData.GetAll();
        }

        public IEnumerable<Order> GetByDate(DateTime date)
        {
            return ordertData.GetByDate(date);
        }

        public Order GetById(int id)
        {
            return ordertData.GetById(id);
        }

        public IEnumerable<Order> GetByUserId(string id)
        {
            return ordertData.GetByUserId(id);
        }

        public async Task AddOrder(Order order)
        {
            await ordertData.AddOrder(order);
        }
    }
}
