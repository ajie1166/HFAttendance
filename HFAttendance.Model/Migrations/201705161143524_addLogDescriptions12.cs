namespace HFAttendance.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addLogDescriptions12 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.UserOperationLog", "CreateTime", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.UserOperationLog", "CreateTime", c => c.DateTime());
        }
    }
}
