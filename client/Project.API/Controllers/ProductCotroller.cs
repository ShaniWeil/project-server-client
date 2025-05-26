using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Core;
using Project.Core.DTO;
using Project.Core.Service;
using Project.Data.Data;
using Project.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCotroller : ControllerBase
    {
        private readonly IProductService productService;
        private readonly IMapper mapper;

        public ProductCotroller(IProductService _productService, IMapper _mapper)
        {
            productService = _productService;
            mapper = _mapper;
        }

        // GET: api/<ProductCotroller>
        [HttpGet]
        public IEnumerable<ProductDTO> Get()
        {
            return mapper.Map<IEnumerable<ProductDTO>>(productService.GetAll());
        }

        [Authorize]
        // GET: api/<ProductCotroller>FF
        [HttpGet("GetZeroStockQuantity")]
        public IEnumerable<ProductDTO> GetZeroStockQuantity()
        {
            return mapper.Map<IEnumerable<ProductDTO>>(productService.GetZeroStockQuantity());
        }

        // GET api/<ProductCotroller>/5
        [HttpGet("product/id/{id}")]
        public ActionResult GetById(int id)
        {
            var product = productService.GetById(id);
            if (product == null)
                return NotFound();

            var x = mapper.Map<ProductDTO>(product);
            return Ok(x);
        }

        // GET api/<ProductCotroller>/5
        [HttpGet("product/category id/{id}")]
        public ActionResult<ProductDTO> GetByCategoryId(int id)
        {
            var x = mapper.Map<IEnumerable<ProductDTO>>(productService.GetByCategoryId(id));
            if (x == null)
                return NotFound();
            return Ok(x);
        }

        // [Authorize]
        // POST api/<ProductCotroller>
        [HttpPost]
        public async Task Post([FromBody] ProductDTO productDTO)
        {
            var product = mapper.Map<Product>(productDTO);
            await productService.AddProduct(product);
        }

        // POST api/<ProductCotroller>
        [HttpPost("product/postQTY")]
        public async Task<IActionResult> PostQty([FromBody] ProductDTO productDTO)
        {
            var existingProduct = productService.GetById(productDTO.Id);
            if (existingProduct == null)
                return NotFound($"Product with ID {productDTO.Id} not found.");

            existingProduct.QuantityInStock = productDTO.QuantityInStock;
            await productService.UpdateProduct(existingProduct, existingProduct.Id);
            return Ok();
        }

        [Authorize]
        // PUT api/<ProductCotroller>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] ProductDTO productDTO)
        {
            var product = mapper.Map<Product>(productDTO);
            await productService.UpdateProduct(product, id);
        }

        [Authorize]
        // DELETE api/<ProductCotroller>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await productService.RemoveProduct(id);
        }

    }
}
