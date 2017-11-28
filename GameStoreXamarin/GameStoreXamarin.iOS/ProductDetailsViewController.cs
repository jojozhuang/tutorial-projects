using System;

using UIKit;
using GameStoreXamarin.Core.Models;
using GameStoreXamarin.iOS.Helper;

namespace GameStoreXamarin.iOS
{
    public partial class ProductDetailsViewController : UIViewController
    {
        public Product _product;

        public ProductDetailsViewController(IntPtr handle) : base(handle)
        {
        }
        /*
        public ProductDetailsViewController() : base("ProductDetailsViewController", null)
        {
        }*/

        public override void ViewDidLoad()
        {
            base.ViewDidLoad();
            // Perform any additional setup after loading the view, typically from a nib.
            if (_product != null) {
                txtName.Text = _product.ProductName;
                txtPrice.Text = Convert.ToString(_product.Price);
                imgPhoto.Image = ImageHelper.BytesToUIImage(_product.Image);
            }
        }

        public override void DidReceiveMemoryWarning()
        {
            base.DidReceiveMemoryWarning();
            // Release any cached data, images, etc that aren't in use.
        }
    }
}

