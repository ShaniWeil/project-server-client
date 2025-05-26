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
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryData categoryData;

        public CategoryService(ICategoryData _categoryData)
        {
            categoryData = _categoryData;
        }

        public async Task AddCategory(Category category)
        {
            await categoryData.AddCategory(category);
        }

        public IEnumerable<Category> GetAll()
        {
            return categoryData.GetAll();
        }

        public Category GetById(int id)
        {
            return categoryData.GetById(id);
        }

        public Category GetByName(string name)
        {
            return categoryData.GetByName(name);
        }

        public async Task RemoveCategory(int id)
        {
            await categoryData.RemoveCategory(id);
        }

        public async Task UpdateCategory(Category category, int id)
        {
            await categoryData.UpdateCategory(category, id); 
        }
    }
}
