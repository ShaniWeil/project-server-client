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
    public class UserService: IUserService
    {
        private readonly IUserData userData;

        public UserService(IUserData _userData)
        {
            userData = _userData;
        }

        public async Task AddUser(User user)
        {
            await userData.AddUser(user);
        }

        public IEnumerable<User> GetAll()
        {
            return userData.GetAll();
        }

        public User GetById(string id)
        {
            return userData.GetById(id);
        }

        public User GetByUser(string name, string password)
        {
            return userData.GetByUser(name, password);
        }

        public async Task RemoveUser(string id)
        {
            await userData.RemoveUser(id);
        }

        public async Task UpdateUser(User user, string id)
        {
            await userData.UpdateUser(user, id);
        }

    }
}
