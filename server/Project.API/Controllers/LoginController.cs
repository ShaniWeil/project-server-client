using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project.Core;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        // The long key is in an encrypted file.
        IConfiguration configuration { get; set; }

        public LoginController(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        // A function that checks that the user is the administrator
        // Post: api/<Login>
        [HttpPost]
        public IActionResult Login([FromBody] User user)
        {
            if (user.Name == "manager" && user.Password == "Manager@manager")
            {
                var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, "manager"),
                new Claim(ClaimTypes.Role, "manager")
            };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JesonWebToken"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:7141",
                    audience: "http://localhost:7141",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(10),
                    signingCredentials: signinCredentials
                );
                // return Ok(new { Token = JwtSecurityTokenHandler().WriteToken(tokenString) });
                var token = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = token });
            }
            return Unauthorized();
        }
    }

}
