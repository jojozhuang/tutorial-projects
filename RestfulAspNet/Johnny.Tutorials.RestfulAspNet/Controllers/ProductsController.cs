using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Johnny.Tutorials.RestfulAspNet.Data;
using Johnny.Tutorials.RestfulAspNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Johnny.Tutorials.RestfulAspNet.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly SqliteContext _context;
        private readonly HttpContext _currentContext;

        public ProductsController(SqliteContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _currentContext = httpContextAccessor.HttpContext;

            if (_context.Products.Count() == 0)
            {
                _context.Products.Add(new Product { ProductName = "Xbox 360", Price = 299.00, Image = UploadController.GetImageUrl(_currentContext, "xbox360.jpg") });
                _context.Products.Add(new Product { ProductName = "Wii", Price = 269.00, Image = UploadController.GetImageUrl(_currentContext, "wii.jpg") });
                _context.Products.Add(new Product { ProductName = "Wireless Controller", Price = 19.99, Image = UploadController.GetImageUrl(_currentContext, "controller.jpg") });
                _context.SaveChanges();
            }
        }

        // GET: api/products
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await _context.Products.ToListAsync();
            products.Reverse();
            return Ok(products);
        }

        // GET api/products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // POST api/products
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Product product)
        {
            if (product == null || product.Id != 0 || String.IsNullOrEmpty(product.ProductName)) {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            await _context.Products.AddAsync(product);
            _context.SaveChanges();

            return Ok(product);
        }

        // PUT api/products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody]Product product)
        {
            if (product == null || product.Id == 0 || String.IsNullOrEmpty(product.ProductName))
            {
                return BadRequest();
            }

            var oldProduct = _context.Products.SingleOrDefault(p => p.Id == product.Id);
            if (oldProduct == null) {
                return NotFound();
            }
            _context.Entry(oldProduct).CurrentValues.SetValues(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        // DELETE api/products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = _context.Products.SingleOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        [Route("top")]
        public async Task<IActionResult> Top()
        {
            var products = await _context.Products.ToListAsync();
            var topProducts = products.Take(3);
            return Ok(topProducts);
        }
    }
}
