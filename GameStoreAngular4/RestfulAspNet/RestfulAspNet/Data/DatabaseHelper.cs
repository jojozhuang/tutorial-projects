using System;
using System.IO;

namespace RestfulAspNet.Data
{
    public class DatabaseHelper
    {
        static SqliteDB database;
        public static SqliteDB Database
        {
            get
            {
                if (database == null)
                {
                    string path = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Personal), "RestfulAspNetSQLite.db3");
                    database = new SqliteDB(path);
                }
                return database;
            }
        }
    }
}
