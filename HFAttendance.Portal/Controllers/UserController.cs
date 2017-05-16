using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HFAttendance.Model;

namespace HFAttendance.Portal.Controllers
{
    public class UserController : BaseController
    {
        private AttendanceDbContext db = new AttendanceDbContext();
        // GET: User
        public ActionResult Index()
        {
            User user = GetCurrentLoginUser();
            if (user != null)
            {
                ViewBag.NickName = user.Name;
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }

        }
        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Quit()
        {
            Session.RemoveAll();
            return View("Login");
        }

        public ActionResult SystemInfo()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(FormCollection form)
        {
            string nick = form["nick"].ToString();
            string pwd = form["pwd"].ToString();

            User user = db.Users.SingleOrDefault(u => u.NickName == nick);
            if (user != null)
            {
                if (user.PassWord == pwd)
                {
                    SetCurrentSession(user);
                    return RedirectToAction("index", "user");
                }
                else
                {
                    ViewBag.ErrorMsg = "密码错误";
                    return View();
                }
            }
            else
            {
                ViewBag.ErrorMsg = "用户名不存在";
                return View();
            }
        }
    }
}
