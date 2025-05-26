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
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IMapper mapper;

        public UserController(IUserService _userService, IMapper _mapper)
        {
            userService = _userService;
            mapper = _mapper;
        }

        [HttpGet("exists/{id}")]
        public ActionResult<bool> UserExists(string id)
        {
            var user = userService.GetById(id);
            return Ok(user != null);
        }


        [Authorize]
        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<UserDTO> Get()
        {
            return mapper.Map<IEnumerable<UserDTO>>(userService.GetAll());
        }

        // GET api/<UserController>/5
        [HttpGet("user/id/{id}")]
        public ActionResult GetById(string id)
        {
            var x = mapper.Map<UserDTO>(userService.GetById(id));
            // AutoMapper.AutoMapperMappingException: 'Error mapping types.'

            if (x == null)
                return NotFound();
            return Ok(x);
        }

        // GET api/<UserController>/5
        [HttpGet("user/name&password/{name},{password}")]
        public ActionResult GetByUser(string name, string password)
        {
            var x = mapper.Map<UserDTO>(userService.GetByUser(name, password));
            if (x == null)
                return NotFound();
            return Ok(x);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task Post([FromBody] User user)
        {
            await userService.AddUser(user);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task Put(string id, [FromBody] User user)
        {
            await userService.UpdateUser(user, id);
        }


        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await userService.RemoveUser(id);
        }
    }
}
