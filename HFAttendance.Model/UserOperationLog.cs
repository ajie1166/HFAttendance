using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HFAttendance.Model
{
    [Table("UserOperationLog")]
    public class UserOperationLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string JobNum { get; set; }

        public string Name { get; set; }
        public string LogDescriptions { get; set; }

        public DateTime? CreateTime { get; set; }

    }
}
