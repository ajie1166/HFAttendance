namespace HFAttendance.Model
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    /// <summary>
    /// 数据库访问上下文
    /// </summary>
    public partial class HfAttendanceDbContext : DbContext
    {
        public HfAttendanceDbContext()
            : base("name=HfAttendanceDbContext")
        {

        }

        public virtual DbSet<HfItem> HfItem { get; set; }
        public virtual DbSet<HfUser> HfUser { get; set; }
        public virtual DbSet<HfUserItem> HfUserItem { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HfItem>()
                .Property(e => e.ItemName)
                .IsUnicode(false);

            modelBuilder.Entity<HfItem>()
                .Property(e => e.ItemUrl)
                .IsUnicode(false);

            modelBuilder.Entity<HfItem>()
                .Property(e => e.IconUrl)
                .IsUnicode(false);

            modelBuilder.Entity<HfUser>()
                .Property(e => e.JobNum)
                .IsUnicode(false);

            modelBuilder.Entity<HfUser>()
                .Property(e => e.NickName)
                .IsUnicode(false);

            modelBuilder.Entity<HfUser>()
                .Property(e => e.PassWord)
                .IsUnicode(false);

            modelBuilder.Entity<HfUser>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<HfUser>()
                .Property(e => e.Mobile)
                .IsUnicode(false);

            modelBuilder.Entity<HfUser>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<HfUser>()
                .Property(e => e.Remark)
                .IsUnicode(false);

            modelBuilder.Entity<HfUserItem>()
                .Property(e => e.JobNum)
                .IsUnicode(false);
        }
    }
}
