using System;
using Johnny.Tutorials.RestfulAspNet.Models;
using Microsoft.EntityFrameworkCore;

namespace Johnny.Tutorials.RestfulAspNet.Data
{
    public class SqliteContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public SqliteContext(DbContextOptions<SqliteContext> options)
            : base(options)
        { 
            // create table
            String createTable = "CREATE TABLE IF NOT EXISTS 'products' ('id' INTEGER PRIMARY KEY AUTOINCREMENT, 'productname' TEXT NOT NULL, 'price' REAL, 'image' TEXT);";
            this.Database.ExecuteSqlCommand(createTable);
            this.SaveChanges();
        }

        /*
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=SQLiteProduct.db");
        }*/
    }
}
