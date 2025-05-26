using Microsoft.EntityFrameworkCore;
using Project.Core;
using Project.Core.Data;
using Project.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Project.Data.Data
{
    public class OrderData: IOrderData
    {
        private readonly DataContext dataContext;

        public OrderData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public IEnumerable<Order> GetAll()
        {
            return dataContext.orders.Include(x => x.User);
        }

        public IEnumerable<Order> GetByDate(DateTime date)
        {
            return dataContext.orders.Where(x => x.Date == date);
        }

        public Order GetById(int id)
        {
            return dataContext.orders.FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<Order> GetByUserId(string id)
        {
            return dataContext.orders.Where(x => x.UserId == id).Include(x => x.User);
        }

        public async Task AddOrder(Order order)
        {
            dataContext.orders.Add(order);
            await dataContext.SaveChangesAsync();
        }

    }
}
