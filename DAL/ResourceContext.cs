using DAL.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace DAL
{
    public class ResourceContext :IdentityDbContext<User>
    {
        public ResourceContext():base("ResourceConnectionString", throwIfV1Schema: false)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
            var ensureDLLIsCopied = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
        }

        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<EmployeeProject> EmployeeProject { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();

            modelBuilder.HasDefaultSchema("dbo");
            modelBuilder.Entity<Employee>().HasKey(s => s.Id);
            modelBuilder.Entity<Project>().HasKey(s => s.Id);
            modelBuilder.Entity<EmployeeProject>().HasKey(s=>s.Id);

            modelBuilder.Entity<EmployeeProject>().HasRequired<Employee>(s => s.Employee).WithMany(t => t.EmployeeProject).HasForeignKey(u => u.EmployeeId);
            modelBuilder.Entity<EmployeeProject>().HasRequired<Project>(s => s.Project).WithMany(t => t.EmployeeProject).HasForeignKey(u => u.ProjectId);

            //te trzy linie w dół potrzebne są by wykorzystać Identity i normalne tabele w jednej bazie
            modelBuilder.Entity<IdentityUserLogin>().HasKey<string>(l => l.UserId);
            modelBuilder.Entity<IdentityRole>().HasKey<string>(r => r.Id);
            modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });
        }

        public static ResourceContext Create()
        {
            return new ResourceContext();
        }
    }
}
