using ApplicationSecurity.Models;
using ApplicationSecurity.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.RegularExpressions;

namespace ApplicationSecurity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IRepository _repository;
        private readonly IUserClaimsPrincipalFactory<AppUser> _claimsPrincipalFactory;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserManager<AppUser> userManager, IUserClaimsPrincipalFactory<AppUser> claimsPrincipalFactory, IConfiguration configuration, IRepository repository)
        {
            _userManager = userManager;
            _claimsPrincipalFactory = claimsPrincipalFactory;
            _configuration = configuration;
            _repository = repository;
        }

        [HttpPost]
        [Route("RegisterUser")]
        public async Task<IActionResult> RegisterUser(UserViewModel User)
        {
            // Check if a user with the same email address already exists
            // var newUser = await _userManager.FindByIdAsync(User.username);
            var newUser = await _userManager.FindByNameAsync(User.username);


            if (newUser == null)
            {
                try
                {
                    // Validate the phone number using a regular expression
                    var phoneNumberRegex = new Regex(@"^0\d{9}$");
                    if (!phoneNumberRegex.IsMatch(User.phonenumber))
                    {
                        // Return a 400 Bad Request status code with an error message if the phone number is invalid
                        return StatusCode(400, "Please enter a valid 10-digit phone number");
                    }

                    // Create a new AppUser object with the provided user details
                    newUser = new AppUser
                    {
                        Id = Guid.NewGuid().ToString(),
                        UserName = User.username,
                        Email = User.emailaddress,
                        PhoneNumber = User.phonenumber,
                    };

                    // Create the user in the identity system using the UserManager
                    // Create the user in the identity system using the UserManager and the provided password from the view model object
                    var createduser = await _userManager.CreateAsync(newUser, User.password);
                    if (createduser.Errors.Count() > 0)
                    {
                        // If there are any errors during user creation, return a BadRequest status code with the error details
                        StringBuilder errorList = new StringBuilder("The following account registration errors need to be resolved. ");
                        foreach (var error in createduser.Errors)
                        {
                            // Append each error to the errorList string builder object with a line break in between them
                            errorList.Append($"{error.Code}: {error.Description}");
                        }
                        // Append each error to the errorList string builder object with a line break in between them and return the error message
                        return BadRequest($"{errorList}");
                    }
                }
                catch (Exception ex)
                {
                    // If an exception occurs during user creation, return a 500 Internal Server Error status code with the exception message
                    return StatusCode(StatusCodes.Status500InternalServerError, $"The following error occurred: {ex.Message}");
                }
            }
            else
            {
                // If a user with the same email address already exists, return a Conflict status code with an error message
                return Conflict($"The username '{User.emailaddress}' already exists. Please use a different username");
            }

            // Return an Ok status code with a success message if the user was created successfully
            return Ok($"Your account '{User.username}' was created successfully. You may proceed with logging in");
        }
    }
}