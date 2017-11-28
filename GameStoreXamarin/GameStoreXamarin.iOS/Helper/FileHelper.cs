using System;
using System.IO;
using GameStoreXamarin.Core;
using Xamarin.Forms;

[assembly: Dependency(typeof(GameStoreXamarin.iOS.Helper.FileHelper))]
namespace GameStoreXamarin.iOS.Helper
{
    public class FileHelper : IFileHelper
    {
        public string GetLocalFilePath(string filename)
        {
            string docFolder = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            string libFolder = Path.Combine(docFolder, "..", "Library", "Databases");

            if (!Directory.Exists(libFolder))
            {
                Directory.CreateDirectory(libFolder);
            }

            return Path.Combine(libFolder, filename);
        }
    }
}
