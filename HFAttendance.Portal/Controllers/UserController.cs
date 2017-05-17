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
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Quit()
        {
            User user = GetCurrentLoginUser();
            UserOperationLog log = new UserOperationLog() { JobNum = user.JobNum, Name = user.Name, LogDescriptions = string.Format("{0}于{1}{2}", user.Name, DateTime.Now, "退出后花园成功"), CreateTime = DateTime.Now };
            db.UserOperationLogs.Add(log);
            db.SaveChanges();
            Session.RemoveAll();
            return RedirectToAction("Login");
        }

        public ActionResult SystemInfo()
        {
            User user = GetCurrentLoginUser();
            var logs = from log in db.UserOperationLogs
                       where log.JobNum == user.JobNum && log.CreateTime >= DateTime.Now.AddDays(-7)
                       orderby log.CreateTime descending
                       select log;
            return View(logs);
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
                    UserOperationLog log = new UserOperationLog() { JobNum = user.JobNum, Name = user.Name, LogDescriptions = string.Format("{0}于{1}{2}", user.Name, DateTime.Now, "登录后花园成功"), CreateTime = DateTime.Now };
                    db.UserOperationLogs.Add(log);
                    db.SaveChanges();
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
