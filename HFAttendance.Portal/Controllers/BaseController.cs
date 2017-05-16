using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HFAttendance.Model;

namespace HFAttendance.Portal.Controllers
{
    public class BaseController : Controller
    {
        public User GetCurrentLoginUser()
        {
            return Session[typeof(User).FullName] as User;
        }

        public void SetCurrentSession(User user)
        {
            Session[typeof(User).FullName] = user;
        }
    }
}