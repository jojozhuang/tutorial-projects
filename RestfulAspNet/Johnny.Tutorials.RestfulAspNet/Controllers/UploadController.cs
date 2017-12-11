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
    public class UploadController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly HttpContext _currentContext;

        public UploadController(IHostingEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            _hostingEnvironment = hostingEnvironment;
            _currentContext = httpContextAccessor.HttpContext;
        }

        // POST api/upload
        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            ResponseResult rr = new ResponseResult();
            if (file == null || file.Length == 0)
            {
                rr.StatusCode = StatusCodes.Status400BadRequest;
                rr.Message = "no file is uploaded";
                return Ok(rr);
            }

            var filename = $@"{DateTime.Now.Ticks}_" + file.FileName;

            var path = Path.Combine(_hostingEnvironment.WebRootPath, "images", filename);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            rr.StatusCode = StatusCodes.Status200OK;
            rr.Message = GetImageUrl(_currentContext, filename);
            return Ok(rr);
        }

        public static string GetImageUrl(HttpContext context, string imageName)
        {
            return Path.Combine(GetBaseUrl(context), "images", imageName);
        }

        public static string GetBaseUrl(HttpContext context)
        {
            var request = context.Request;
            var host = request.Host.ToUriComponent();
            var pathBase = request.PathBase.ToUriComponent();
            return $"{request.Scheme}://{host}{pathBase}";
        }
    }
}
