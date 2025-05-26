using Project.Core;
using Project.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Data.Data
{
    public class UserData: IUserData
    {
        private readonly DataContext dataContext;

        public UserData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public async Task AddUser(User user)
        {
            dataContext.users.Add(user);
            await dataContext.SaveChangesAsync();
        }

        public IEnumerable<User> GetAll()
        {
            return dataContext.users;
        }

        public User GetById(string id)
        {
            return dataContext.users.FirstOrDefault(x => x.Id == id);
        }

        public User GetByUser(string name, string password)
        {
            return dataContext.users.FirstOrDefault(x => x.Name == name && x.Password == password);
        }

        public async Task RemoveUser(string id)
        {
            var x = dataContext.users.FirstOrDefault(x => x.Id == id);
            dataContext.Remove(x);
            await dataContext.SaveChangesAsync();
        }

        public async Task UpdateUser(User user, string id)
        {
            var x = dataContext.users.FirstOrDefault(x => x.Id == id);
            if (x != null)
            {
                x.Name = user.Name;
                x.Password = user.Password;
                x.Address = user.Address;
                x.Email = user.Email;
                x.Phone = user.Phone;
            }
            await dataContext.SaveChangesAsync();
        }
    }
}
