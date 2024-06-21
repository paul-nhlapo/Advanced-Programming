using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Assignment3_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace Assignment3_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StoreController : Controller
    {
        private readonly IRepository _context;

        public StoreController(IRepository context)
        {
            _context = context;
        }

        //Get the brands 
        [HttpGet("Brands")]
        public async Task<ActionResult<IEnumerable<Brand>>> Brands()
        {
            var brands = await _context.GetBrands();
            return Ok(brands);
        }

        //Get the product types
        [HttpGet("ProductTypes")]
        public async Task<ActionResult<IEnumerable<ProductType>>> ProductTypes()
        {
            var productTypes = await _context.GetProductTypes();
            return Ok(productTypes);
        }

        //Get Product by id
        [HttpGet("ProductById/{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _context.GetProductById(id);
            //Check if the product is available
            if (product == null)
            {
                return NotFound();
            }

            var productList = new Product
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Image = product.Image,
                Brand = new Brand
                {
                    BrandId = product.Brand.BrandId,
                    Name = product.Brand.Name,
                    Description = product.Brand.Description,
                    DateCreated = product.Brand.DateCreated,
                    DateModified = product.Brand.DateModified,
                    IsActive = product.Brand.IsActive,
                    IsDeleted = product.Brand.IsDeleted,
                },
                ProductType = new ProductType
                {
                    ProductTypeId = product.ProductType.ProductTypeId,
                    Name = product.ProductType.Name,
                    Description = product.ProductType.Description,
                    DateCreated = product.ProductType.DateCreated,
                    DateModified = product.ProductType.DateModified,
                    IsActive = product.ProductType.IsActive,
                    IsDeleted = product.ProductType.IsDeleted,
                }
            };
            return Ok(productList);
        }


        //Get all products as a list
        [HttpGet("ProductListing")]
        public async Task<ActionResult<IEnumerable<Product>>> ProductListing()
        {
            var products = await _context.GetProducts();

            //Need to get a different way to do this function
            var productListing = products.Select(product => new Product
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Image = product.Image,
                Brand = new Brand
                {
                    BrandId = product.Brand.BrandId,
                    Name = product.Brand.Name,
                    Description = product.Brand.Description,
                    DateCreated = product.Brand.DateCreated,
                    DateModified = product.Brand.DateModified,
                    IsActive = product.Brand.IsActive,
                    IsDeleted = product.Brand.IsDeleted,
                },
                ProductType = new ProductType
                {
                    ProductTypeId = product.ProductType.ProductTypeId,
                    Name = product.ProductType.Name,
                    Description = product.ProductType.Description,
                    DateCreated = product.ProductType.DateCreated,
                    DateModified = product.ProductType.DateModified,
                    IsActive = product.ProductType.IsActive,
                    IsDeleted = product.ProductType.IsDeleted,
                }
            });

            return Ok(productListing);

        }

        //Add product  a user will add a product using a form on the frontend and we gonna nee dto upload an image of the product
        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromForm] ProductRModel requestData)
        {
            var products = await _context.GetProducts();


            try
            {
                var file = requestData.Picture;
                var folderName = Path.Combine("wwwroot", "images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = file.FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);

                    var dbPath = Path.Combine(folderName, fileName);
                    var product = new Product
                    {
                        Name = Request.Form["Name"],
                        Description = Request.Form["Description"],
                        Price = Convert.ToDecimal(Request.Form["Price"]),
                        Image = dbPath,
                        BrandId = Convert.ToInt32(Request.Form["BrandId"]),
                        ProductTypeId = Convert.ToInt32(Request.Form["ProductTypeId"]),
                    };


                    await _context.AddProduct(product);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
                return Ok(products);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }


        }

    }
}
