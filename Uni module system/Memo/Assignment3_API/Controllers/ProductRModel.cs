using Assignment3_Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Assignment3_Backend.Controllers
{
    public class ProductRModel 
    {
       public IFormFile Picture { get; set; }

        public ProductViewModel Product { get; set; }
    }
}
