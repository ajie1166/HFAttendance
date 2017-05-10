using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HFAttendance.WebSite.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Nick { get; set; }

        public string PassWord { get; set; }

        public Department Department { get; set; }
    }
}