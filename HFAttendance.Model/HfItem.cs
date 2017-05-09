namespace HFAttendance.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("HfItem")]
    public partial class HfItem
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
