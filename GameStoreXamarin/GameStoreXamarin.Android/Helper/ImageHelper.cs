using System;
using System.IO;
using Android.Graphics;

namespace GameStoreXamarin.Android.Helper
{
    public static class ImageHelper
    {
        /// Convert byte array to Bitmap
        public static Bitmap BytesToBitmap(byte[] imageBytes)
        {
            Bitmap bitmap = BitmapFactory.DecodeByteArray(imageBytes, 0, imageBytes.Length);
            return bitmap;
        }

        /// Convert Bitmap to byte array
        public static byte[] BitmapToBytes(Bitmap bitmap)
        {
            byte[] bitmapBytes;
            using (var stream = new MemoryStream())
            {
                bitmap.Compress(Bitmap.CompressFormat.Png, 0, stream);
                bitmapBytes = stream.ToArray();
            }
            return bitmapBytes;
        }
    }
}
