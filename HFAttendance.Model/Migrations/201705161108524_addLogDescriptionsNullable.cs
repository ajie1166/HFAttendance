namespace HFAttendance.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addLogDescriptionsNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.UserOperationLog", "CreateTime", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.UserOperationLog", "CreateTime", c => c.DateTime(nullable: false));
        }
    }
}
