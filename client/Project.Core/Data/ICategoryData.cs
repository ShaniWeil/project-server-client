using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Data
{
    public interface ICategoryData
    {
        IEnumerable<Category> GetAll();
        Category GetByName(string name);
        Category GetById(int id);
        Task AddCategory(Category category);
        Task UpdateCategory(Category category, int id);
        Task RemoveCategory(int id);

    }
}
