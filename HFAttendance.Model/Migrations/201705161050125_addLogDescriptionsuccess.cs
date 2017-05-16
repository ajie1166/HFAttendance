namespace HFAttendance.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addLogDescriptionsuccess : DbMigration
    {
        public override void Up()
        {
            
            
            CreateTable(
                "dbo.UserOperationLog",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        JobNum = c.String(),
                        Name = c.String(),
                        LogDescription = c.String(),
                        CreateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
        }
        
        public override void Down()
        {
            DropTable("dbo.Users");
            DropTable("dbo.UserOperationLog");
            DropTable("dbo.UserItems");
            DropTable("dbo.Items");
        }
    }
}
