using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Johnny.Tutorials.RestfulAspNet.Data;
using Johnny.Tutorials.RestfulAspNet.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Johnny.Tutorials.RestfulAspNet.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    //[Route("api/[controller]/[action]")]
    public class ProductsController2 : Controller
    {
        private readonly SqliteContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ProductsController2(SqliteContext context, IHostingEnvironment hostingEnvironment)
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
        public IEnumerable<Product> Get()
        {
            List<Product> list = DatabaseHelper.Database.GetProducts();
            if (list == null || list.Count == 0) {
                CreateDummyData();
                return DatabaseHelper.Database.GetProducts();
            } else {
                return list;
            }
        }

        // GET api/products/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = DatabaseHelper.Database.GetProduct(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // POST api/products
        [HttpPost]
        public IActionResult Post([FromBody]Product product)
        {
            return StatusCode(200);
        }

        // PUT api/products/5
        [HttpPut("{id}")]
        public void Put([FromBody]Product product)
        {
            DatabaseHelper.Database.SaveProduct(product);
        }

        // DELETE api/products/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            DatabaseHelper.Database.DeleteProduct(id);
        }

        private void CreateDummyData()
        {
            Product product = new Product();
            product.ProductName = "Xbox 360";
            product.Price = 299.00;
            product.Image = GetImageUrl("xbox360.jpg");
            DatabaseHelper.Database.SaveProduct(product);

            product = new Product();
            product.ProductName = "Wii";
            product.Price = 269.00;
            product.Image = GetImageUrl("wii.jpg");
            DatabaseHelper.Database.SaveProduct(product);

            product = new Product();
            product.ProductName = "Wireless Controller";
            product.Price = 19.99;
            product.Image = GetImageUrl("controller.jpg");
            DatabaseHelper.Database.SaveProduct(product);
        }

        private string GetImageUrl(string imageName)
        {
            //string baseurl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            //return Path.Combine(baseurl, "images", imageName);
            return Path.Combine("images", imageName);
        }
    }
}
