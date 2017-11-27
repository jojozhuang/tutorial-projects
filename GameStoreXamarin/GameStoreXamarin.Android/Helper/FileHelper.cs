using System;
using System.IO;
using GameStoreXamarin.Core;
using Xamarin.Forms;

[assembly: Dependency(typeof(GameStoreXamarin.Android.Helper.FileHelper))]
namespace GameStoreXamarin.Android.Helper
{
    public class FileHelper : IFileHelper
    {
        public string GetLocalFilePath(string filename)
        {
            string path = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            return Path.Combine(path, filename);
        }
    }
}
