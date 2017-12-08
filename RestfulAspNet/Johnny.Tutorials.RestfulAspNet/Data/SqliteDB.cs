using System;
using System.Collections.Generic;
using Johnny.Tutorials.RestfulAspNet.Models;
using SQLite;

namespace Johnny.Tutorials.RestfulAspNet.Data
{
    public class SqliteDB
    {
        private readonly SQLiteConnection database;
        private String TABLE_NAME = "Product";

        public SqliteDB(string dbPath)
        {
            database = new SQLiteConnection(dbPath);
            database.CreateTable<Product>();
        }

        public List<Product> GetProducts()
        {
            return database.Query<Product>("SELECT * FROM [" + TABLE_NAME + "] ORDER BY [ID] DESC");
        }

        public Product GetProduct(int id)
        {
            return database.Table<Product>().Where(i => i.Id == id).FirstOrDefault();
        }

        public int SaveProduct(Product product)
        {
            if (product.Id != 0)
            {
                return database.Update(product);
            }
            else
            {
                return database.Insert(product);
            }
        }

        public int DeleteProduct(int id)
        {
            Product product = GetProduct(id);
            return database.Delete(product);
        }

        public int DeleteProduct(Product product)
        {
            return database.Delete(product);
        }
    }
}
