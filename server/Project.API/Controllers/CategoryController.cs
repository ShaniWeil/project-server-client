using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Core;
using Project.Core.DTO;
using Project.Core.Service;
using Project.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryService categoryService;
        private readonly IMapper mapper;

        public CategoryController(ICategoryService _categoryService, IMapper _mapper)
        {
            categoryService = _categoryService;
            mapper = _mapper;
        }
        
        // GET: api/<CategoryController>
        [HttpGet]
        public IEnumerable<CategoryDTO> Get()
        {
            return mapper.Map<IEnumerable<CategoryDTO>>(categoryService.GetAll());
        }

        // GET api/<CategoryController>/5
        [HttpGet("category/id/{id}")]
        public ActionResult GetById(int id)
        {
            var x = mapper.Map<CategoryDTO>(categoryService.GetById(id));
            if (x == null)
                return NotFound();
            return Ok(x);
        }

        // GET api/<CategoryController>/5
        [HttpGet("category/name/{name}")]
        public ActionResult GetByName(string name)
        {
            var x = mapper.Map<CategoryDTO>(categoryService.GetByName(name));
            if (x == null)
                return NotFound();
            return Ok(x);

        }

        [Authorize]
        // POST api/<CategoryController>
        [HttpPost]
        public async Task Post([FromBody] Category category)
        {
            await categoryService.AddCategory(category);
        }

        [Authorize]
        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] Category category)
        {
            await categoryService.UpdateCategory(category, id);
        }

        [Authorize]
        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await categoryService.RemoveCategory(id);
        }
    }
}
