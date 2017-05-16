using System.Web;
using System.Web.Optimization;

namespace HFAttendance.Portal
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // 使用要用于开发和学习的 Modernizr 的开发版本。然后，当你做好
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/css").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/assets/css/font-awesome.min.css", "~/Content/assets/css/ace.min.css", "~/Content/assets/css/ace-rtl.min.css"));
            bundles.Add(new StyleBundle("~/font-awesome-ie7").Include("~/Content/assets/css/font-awesome-ie7.min.css"));
            bundles.Add(new StyleBundle("~/ace-ie").Include("~/Content/assets/css/ace-ie.min.css"));

        }
    }
}
