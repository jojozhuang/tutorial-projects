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
    public class ProductsController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public ProductsController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
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
        public Product Get(int id)
        {
            return DatabaseHelper.Database.GetProduct(id);
        }

        // POST api/products
        [HttpPost("{id}")] // need this id to prevent Cors error.
        public void Post([FromBody]Product product)
        {
            DatabaseHelper.Database.SaveProduct(product);
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
