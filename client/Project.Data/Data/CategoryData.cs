using Project.Core;
using Project.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Project.Data.Data
{
    public class CategoryData: ICategoryData
    {
        private readonly DataContext dataContext;

        public CategoryData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public async Task AddCategory(Category category)
        {
            dataContext.categories.Add(category);
            await dataContext.SaveChangesAsync();
        }

        public IEnumerable<Category> GetAll()
        {
            return dataContext.categories;
        }

        public Category GetById(int id)
        {
            return dataContext.categories.FirstOrDefault(x => x.Id == id);
        }

        public Category GetByName(string name)
        {
            return dataContext.categories.FirstOrDefault(x => x.Name == name);
        }

        public async Task RemoveCategory(int id)
        {
            var x = dataContext.categories.FirstOrDefault(x => x.Id == id);
            dataContext.Remove(x);
            await dataContext.SaveChangesAsync();
        }

        public async Task UpdateCategory(Category category, int id)
        {
            var x = dataContext.categories.FirstOrDefault(x => x.Id == id);
            if (x != null)
            {
                x.Name = category.Name;
            }
            await dataContext.SaveChangesAsync();
        }
    }
}
