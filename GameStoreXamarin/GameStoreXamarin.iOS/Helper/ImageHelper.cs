using System;
using Foundation;
using UIKit;

namespace GameStoreXamarin.iOS.Helper
{
    public static class ImageHelper
    {
        /// Convert byte array to UIImage
        public static UIImage BytesToUIImage(byte[] imageBytes)
        {
            var data = NSData.FromArray(imageBytes);
            return UIImage.LoadFromData(data);
        }

        /// Convert UIImage to byte array
        public static byte[] UIImageToBytes(UIImage image)
        {
            byte[] imageBytes;
            using (NSData imageData = image.AsPNG())
            {
                imageBytes = new Byte[imageData.Length];
                System.Runtime.InteropServices.Marshal.Copy(imageData.Bytes, imageBytes, 0, Convert.ToInt32(imageData.Length));
            }

            return imageBytes;
        }

        public static bool Compare(UIImage image1, UIImage image2) {
            if (image1 == null && image2 == null) {
                return true;
            }
            if (image1 == null && image2 != null) {
                return false;
            }
            if (image1 != null && image2 == null)
            {
                return false;
            }
            if (image1 != null && image2 != null)
            {
                if (UIImageToBytes(image1) != UIImageToBytes(image2)) {
                    return false;
                }
            }
            return true;
        }
    }
}
