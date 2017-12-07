using System;
using System.Drawing;

namespace RestfulAspNet.Data
{
    public class ImageHelper
    {
        /*
        /// Convert byte array to UIImage
        public static System.Net.Mime.MediaTypeNames.Image BytesToImage(byte[] imageBytes)
        {
            var data = NSData.FromArray(imageBytes);
            return UIImage.LoadFromData(data);
        }

        /// Convert UIImage to byte array
        public static byte[] ImageToBytes(UIImage image)
        {
            byte[] imageBytes;
            using (NSData imageData = image.AsPNG())
            {
                imageBytes = new Byte[imageData.Length];
                System.Runtime.InteropServices.Marshal.Copy(imageData.Bytes, imageBytes, 0, Convert.ToInt32(imageData.Length));
            }

            return imageBytes;
        }*/
    }
}
