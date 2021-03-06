﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HFAttendance.Model;

namespace HFAttendance.WebSite.Controllers
{
    public class UserController : Controller
    {
        AttendanceDbContext db = new AttendanceDbContext();
        // GET: User
        public ActionResult Index()
        {
            if (Session["nick"] != null)
            {
                ViewBag.Nick = Session["nick"];
                return View();
            }
            else
            {
                return View("login");
            }

        }
        public ActionResult Quit()
        {
            Session.Remove("nick");
            return View("login");
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

            User user = db.Users.SingleOrDefault(u => u.NickName == nick);
            if (user != null)
            {
                if (user.PassWord == pwd)
                {
                    Session["nick"] = nick;
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