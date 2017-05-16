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

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            User user = GetCurrentLoginUser();
            string currentUrl = this.HttpContext.Request.Url.AbsolutePath.ToLower();
            string loginUrl = "/user/login";
            if (loginUrl == currentUrl)
            {
                return;
            }
            if (user == null)
            {
                this.HttpContext.Response.Redirect("/user/login");
                return;
            }
        }
    }
}