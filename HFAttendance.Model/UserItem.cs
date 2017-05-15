using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HFAttendance.Model
{
    public class UserItem
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string JobNum { get; set; }

        public int? ItemId { get; set; }
    }
}
