using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Data
{
    public interface IUserData
    {
        IEnumerable<User> GetAll();
        User GetById(string id);
        User GetByUser(string name, string password);
        Task AddUser(User user);
        Task UpdateUser(User user, string id);
        Task RemoveUser(string id);
    }
}
