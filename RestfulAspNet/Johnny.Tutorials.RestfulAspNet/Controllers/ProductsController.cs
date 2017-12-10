using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Johnny.Tutorials.RestfulAspNet.Data;
using Johnny.Tutorials.RestfulAspNet.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Johnny.Tutorials.RestfulAspNet.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    //[Route("api/[controller]/[action]")]
    public class ProductsController : Controller
    {
        private readonly SqliteContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ProductsController(SqliteContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;

            if (_context.Products.Count() == 0)
            {
                _context.Products.Add(new Product { ProductName = "Xbox 360", Price = 299.00, Image = GetImageUrl("xbox360.jpg") });
                _context.Products.Add(new Product { ProductName = "Wii", Price = 269.00, Image = GetImageUrl("wii.jpg") });
                _context.Products.Add(new Product { ProductName = "Wireless Controller", Price = 19.99, Image = GetImageUrl("controller.jpg") });
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

            return Ok();
        }

        // PUT api/products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody]Product product)
        {
            if (product == null || product.Id == 0 || String.IsNullOrEmpty(product.ProductName))
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            var oldProduct = _context.Products.SingleOrDefault(p => p.Id == product.Id);
            if (oldProduct == null) {
                return NotFound();
            }
            _context.Entry(oldProduct).CurrentValues.SetValues(product);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE api/products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = _context.Products.SingleOrDefault(p => p.Id == id);
            if (product == null) {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private string GetImageUrl(string imageName)
        {
            //string baseurl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            //return Path.Combine(baseurl, "images", imageName);
            return Path.Combine("images", imageName);
        }
    }
}
