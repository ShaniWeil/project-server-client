using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Project.Core;
using Project.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Category> categories { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Order> orders { get; set; }

        IConfiguration configuration { get; set; }

        public DataContext(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        // Empty constructor, for unit testing purposes.
        public DataContext() { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            {
                if (!optionsBuilder.IsConfigured)
                {
                    optionsBuilder.UseSqlServer(configuration["DbConectionString"]);
                }
            }

        }
    }
}
