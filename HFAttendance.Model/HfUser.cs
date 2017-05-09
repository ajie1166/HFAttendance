namespace HFAttendance.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("HfUser")]
    public partial class HfUser
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string JobNum { get; set; }

        [StringLength(50)]
        public string NickName { get; set; }

        [StringLength(200)]
        public string PassWord { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(50)]
        public string Mobile { get; set; }

        [Column(TypeName = "date")]
        public DateTime? JoinDate { get; set; }

        public int? SupervisorId { get; set; }

        public int? DepartmentId { get; set; }

        public int? RoleId { get; set; }

        public int? IsApprove { get; set; }

        public int? IsCeo { get; set; }

        public int? State { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        [Column(TypeName = "text")]
        public string Remark { get; set; }
    }
}
