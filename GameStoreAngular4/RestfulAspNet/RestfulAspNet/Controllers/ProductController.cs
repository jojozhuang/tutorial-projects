using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestfulAspNet.Data;
using RestfulAspNet.Models;

namespace RestfulAspNet.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public ProductsController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: api/values
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

        // GET api/values/5
        [HttpGet("{id}")]
        public Product Get(int id)
        {
            return DatabaseHelper.Database.GetProduct(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Product product)
        {
            DatabaseHelper.Database.SaveProduct(product);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put([FromBody]Product product)
        {
            DatabaseHelper.Database.SaveProduct(product);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            DatabaseHelper.Database.DeleteProduct(id);
        }

        private string WriteImage(byte[] arr)
        {
            var filename = $@"{DateTime.Now.Ticks}.";

            using (var im = Image.FromStream(new MemoryStream(arr)))
            {
                ImageFormat frmt;
                if (ImageFormat.Png.Equals(im.RawFormat))
                {
                    filename += "png";
                    frmt = ImageFormat.Png;
                }
                else
                {
                    filename += "jpg";
                    frmt = ImageFormat.Jpeg;
                }
                im.Save(GetUploadPath(filename), frmt);
            }
            return $@"http:\\{Url.Content("~/")}\{filename}";
        }

        private String GetUploadPath(string imageName)
        {
            string contentRootPath = _hostingEnvironment.ContentRootPath;
            return Path.Combine(contentRootPath, "Images", "Upload", imageName);
        }

        private String GetImagePath(string imageName) {
            //string webRootPath = _hostingEnvironment.WebRootPath;
            string contentRootPath = _hostingEnvironment.ContentRootPath;

            return Path.Combine(contentRootPath, "Images", imageName);
        }

        private string GetImageUrl(string imageName) {
            return $@"http:\\{Url.Content("~/")}/Images/Upload/{imageName}";
        }

        private void CreateDummyData()
        {
            Product product = new Product();
            product.ProductName = "Xbox 360";
            product.Price = 299.00;
            //product.Image = System.IO.File.ReadAllBytes(GetImagePath("xbox360.jpg"));
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
    }
}
