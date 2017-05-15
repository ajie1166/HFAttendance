using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HFAttendance.Model
{
    public class Item
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string ItemName { get; set; }

        public int? ParentId { get; set; }

        [StringLength(255)]
        public string ItemUrl { get; set; }

        [StringLength(255)]
        public string IconUrl { get; set; }

        public DateTime? CreateTime { get; set; }
    }
}
