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
    [Route("api/[controller]")]
    public class ImagesController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public ImagesController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET api/values/5
        [HttpGet("{imageName}")]
        public ActionResult Get(string imageName)
        {
            string contentRootPath = _hostingEnvironment.ContentRootPath;
            string path = Path.Combine(contentRootPath, "Images", imageName);
            return File(path, "image/jpeg");
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return Content("file not selected");

            var filename = $@"{DateTime.Now.Ticks}." + file.FileName;

            var path = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot", "images",
                        filename);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return RedirectToAction("images");
        }
    }
}
