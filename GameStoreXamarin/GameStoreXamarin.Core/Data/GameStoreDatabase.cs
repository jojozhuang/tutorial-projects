using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStoreXamarin.Core.Models;
using SQLite;

namespace GameStoreXamarin.Core.Data
{
    public class GameStoreDatabase
    {
        private readonly SQLiteConnection database;
        private String TABLE_NAME = "Product";

        public GameStoreDatabase(string dbPath)
        {
            database = new SQLiteConnection(dbPath);
            database.CreateTable<Product>();
        }

        public List<Product> GetProducts()
        {
            return database.Query<Product>("SELECT * FROM [" + TABLE_NAME + "]");
        }

        public Product GetProduct(int id)
        {
            return database.Table<Product>().Where(i => i.ProductId == id).FirstOrDefault();
        }

        public List<Product> GetItemsNotDone()
        {
            return database.Query<Product>("SELECT * FROM [" + TABLE_NAME + "] WHERE [Done] = 0");
        }

        public int SaveProduct(Product product)
        {
            if (product.ProductId != 0)
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
    /*public class GameStoreDatabase
    {
        private readonly SQLiteAsyncConnection database;
        private String TABLE_NAME = "Products";

        public GameStoreDatabase(string dbPath)
        {
            database = new SQLiteAsyncConnection(dbPath);
            database.CreateTableAsync<Product>().Wait();
        }

        public Task<List<Product>> GetProductsAsync()
        {
            return database.Table<Product>().ToListAsync();
        }

        public Task<Product> GetProductAsync(int id)
        {
            return database.Table<Product>().Where(i => i.ProductId == id).FirstOrDefaultAsync();
        }

        public Task<List<Product>> GetItemsNotDoneAsync()
        {
            return database.QueryAsync<Product>("SELECT * FROM ["+TABLE_NAME+"] WHERE [Done] = 0");
        }

        public Task<int> SaveProductAsync(Product product)
        {
            if (product.ProductId != 0)
            {
                return database.UpdateAsync(product);
            }
            else
            {
                return database.InsertAsync(product);
            }
        }

        public Task<int> DeleteProductAsync(Product product)
        {
            return database.DeleteAsync(product);
        }
    }*/
}
