using System;

using Foundation;
using UIKit;

namespace GameStoreXamarin.iOS
{
    public partial class ProductTableViewCell : UITableViewCell
    {
        public static readonly NSString Key = new NSString("ProductTableViewCell");
        public static readonly UINib Nib;

        static ProductTableViewCell()
        {
            Nib = UINib.FromName("ProductTableViewCell", NSBundle.MainBundle);
        }

        protected ProductTableViewCell(IntPtr handle) : base(handle)
        {
            // Note: this .ctor should not contain any initialization logic.
        }
    }
}
