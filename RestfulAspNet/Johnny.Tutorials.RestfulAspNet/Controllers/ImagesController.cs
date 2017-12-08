using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Johnny.Tutorials.RestfulAspNet.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Johnny.Tutorials.RestfulAspNet.Controllers
{
    [Route("api/[controller]")]
    [Route("api/[controller]/[action]")]
    public class ImagesController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public ImagesController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [ActionName("UploadFile")]
        [HttpPost]
        public async Task<ResponseResult> UploadFile(IFormFile file)
        {
            ResponseResult rr = new ResponseResult();
            if (file == null || file.Length == 0)
            {
                rr.Code = "404";
                rr.Message = "no file is uploaded";
                return rr;
            }

            var filename = $@"{DateTime.Now.Ticks}_" + file.FileName;

            var path = Path.Combine(_hostingEnvironment.WebRootPath, "images", filename);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            rr.Code = "200";
            rr.Message = Path.Combine("images", filename);
            return rr;
        }
    }
}
