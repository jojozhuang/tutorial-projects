using System;
using GameStoreXamarin.Core;
using GameStoreXamarin.Core.Data;
using Xamarin.Forms;

namespace GameStoreXamarin.iOS.Helper
{
    public static class DatabaseHelper
    {
        static GameStoreDatabase database;

        public static GameStoreDatabase Database
        {
            get
            {
                if (database == null)
                {
                    String path = DependencyService.Get<IFileHelper>().GetLocalFilePath("GameStoreSQLite.db3");
                    database = new GameStoreDatabase(path);
                }
                return database;
            }
        }
    }
}
