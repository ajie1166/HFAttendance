using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HFAttendance.WebSite.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(FormCollection form)
        {
            string nick = form["nick"].ToString();
            string pwd = form["pwd"].ToString();
            if (nick == "lijie" && pwd == "123456")
            {
               return RedirectToAction("index", "user");
            }
            else
            {
                return View();
            }
        }
    }
}