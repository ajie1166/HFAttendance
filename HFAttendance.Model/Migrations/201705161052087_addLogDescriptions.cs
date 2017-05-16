namespace HFAttendance.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addLogDescriptions : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserOperationLog", "LogDescriptions", c => c.String());
            DropColumn("dbo.UserOperationLog", "LogDescription");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserOperationLog", "LogDescription", c => c.String());
            DropColumn("dbo.UserOperationLog", "LogDescriptions");
        }
    }
}
