using Assignment3_Backend.Models;
using Assignment3_Backend.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Assignment3_Backend.Controllers
{

    //This controller is going to be used to authenticate a user and have register, login, and logout methods
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        //It must make use of JWT Tokens to authenticate the user
        //It must have a register method that will create a new user in the database
        //It must have a login method that will authenticate the user and return a JWT Token
        //It must have a logout method that will invalidate the JWT Token
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IRepository _repository;
        private readonly IUserClaimsPrincipalFactory<AppUser> _claimsPrincipalFactory;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IRepository repository, IUserClaimsPrincipalFactory<AppUser> claimsPrincipalFactory, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _repository = repository;
            _claimsPrincipalFactory = claimsPrincipalFactory;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("register")]
        //Register using UserViewModel
        public async Task<IActionResult> Register(UserViewModel model)
        {
            //Before user can be registered we need to check if they do notv already exist in the system
            var existingUser = await _userManager.FindByEmailAsync(model.emailaddress);
            if (existingUser != null)
            {
                return BadRequest("User already exists");
            }
            else
                {
                var newUser = new AppUser()
                {
                    Email = model.emailaddress,
                    UserName = model.emailaddress
                };

                var result = await _userManager.CreateAsync(newUser, model.password);
                if (result.Succeeded)
                {
                    return Ok("User created successfully");
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
        }

        [HttpGet]
        //Now generate the token
        private async Task<string> GenerateJWTToken(AppUser user)
        {
            var role = await _userManager.GetRolesAsync(user);
            IdentityOptions _identityOptions = new IdentityOptions();
            // Create JWT Token
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),

            };

            if (role.Count() > 0)
            {
                claims.Add(new Claim(_identityOptions.ClaimsIdentity.RoleClaimType, role.FirstOrDefault()));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Tokens:Issuer"],
                _configuration["Tokens:Audience"],
                claims,
                signingCredentials: credentials,
                expires: DateTime.UtcNow.AddHours(3)
            );

            //Now return the generated token and write it to the token handler to get the token string value and the user can use it
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost]
        [Route("login")]
        //Login using UserViewModel
        public async Task<IActionResult> Login(UserViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.emailaddress);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.password))
            {
                var token = await GenerateJWTToken(user);
                return Ok(new { token });
            }
            return BadRequest("Invalid login attempt");
        }

    }
}
