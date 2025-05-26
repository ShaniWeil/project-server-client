using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Core;
using Project.Core.DTO;
using Project.Core.Entities;
using Project.Core.Service;
using Project.Data.Data;
using Project.Service;
using System.Reflection.Metadata.Ecma335;
using static System.Runtime.InteropServices.JavaScript.JSType;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    
    public class OrderController : ControllerBase
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;

        public OrderController(IOrderService _orderService, IMapper _mapper)
        {
            orderService = _orderService;
            mapper = _mapper;
        }

        [Authorize]
        // GET: api/<OrderController>
        [HttpGet("GetAll")]
        public ActionResult GetAll()
        {
            var x = mapper.Map<IEnumerable<OrderDTO>>(orderService.GetAll());
            if (x == null)
                return StatusCode(404);
            return StatusCode(200, x);
        }

        [HttpGet("GetByUserId/id/{id}")]
        public ActionResult GetByUserId(string id)
        {
            var x = mapper.Map<IEnumerable<OrderDTO>>(orderService.GetByUserId(id));
            if (x == null)
                return StatusCode(404);
            return StatusCode(200, x);
        }

        [Authorize]
        // GET: api/<OrderController>
        [HttpGet("GetByDate/date/{date}")]
        public ActionResult GetByDate(DateTime date)
        {
            var x = mapper.Map<IEnumerable<OrderDTO>>(orderService.GetByDate(date));
            if (x == null)
                return StatusCode(404);
            return StatusCode(200, x);
        }

        [Authorize]
        // GET api/<OrderController>/5
        [HttpGet("order/id/{id}")]
        public ActionResult Get(int id)
        {
            var x =  mapper.Map<OrderDTO>(orderService.GetById(id));
            if (x == null)
                return NotFound();
            return Ok(x);
        }


        // POST api/<OrderController>
        [HttpPost]
        public async Task Post([FromBody] OrderDTO orderDTO)
        {
            var order = mapper.Map<Order>(orderDTO);
            await orderService.AddOrder(order);
        }

    }
}
