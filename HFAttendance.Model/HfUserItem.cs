namespace HFAttendance.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("HfUserItem")]
    public partial class HfUserItem
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string JobNum { get; set; }

        public int? ItemId { get; set; }
    }
}
