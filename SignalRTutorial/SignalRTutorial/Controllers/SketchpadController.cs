using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SignalRTutorial.Controllers
{
    public class SketchpadController : Controller
    {
        // GET: Sketchpad
        public ActionResult Index()
        {
            return View();
        }
    }
}