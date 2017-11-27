using System;
using System.IO;
using Xamarin.Forms;
using GameStoreXamarin.Core;

[assembly: Dependency(typeof(GameStoreXamarin.iOS.FileHelper))]
namespace GameStoreXamarin.iOS
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