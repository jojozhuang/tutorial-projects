using System;

using UIKit;
using GameStoreXamarin.Core.Models;
using GameStoreXamarin.iOS.Helper;
using Foundation;

namespace GameStoreXamarin.iOS
{
    public partial class ProductDetailsViewController : UIViewController
    {
        public Product _product;
        private UIImagePickerController _imagePicker;
        private bool _imageChanged = false;

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
            // Perform any additional setup after loading the view, typically from a nib.
            btnCancel.AccessibilityIdentifier = "btnCancel";
            btnCancel.Clicked += delegate
            {
                var isPresentingInAddProductMode = PresentingViewController as UINavigationController;
                if (isPresentingInAddProductMode != null) {
                    DismissViewController(true, null);
                } else {
                    var owningNavigationController = NavigationController;
                    if (owningNavigationController != null) {
                        owningNavigationController.PopViewController(true);
                    }
                }
            };
            btnSave.AccessibilityIdentifier = "btnSave";
            btnSave.Clicked += delegate
            {
                String textName = txtName.Text;
                String textPrice = txtPrice.Text;
                UIImage image = imgPhoto.Image;

                if (String.IsNullOrEmpty(textName))
                {
                    txtName.BecomeFirstResponder();
                    ToastHelper.PresentOKAlert("Error", "Product Name is Empty", this);
                    return;
                }
                if (String.IsNullOrEmpty(textPrice))
                {
                    txtPrice.BecomeFirstResponder();
                    ToastHelper.PresentOKAlert("Error", "Price is Empty", this);
                    return;
                }
                try
                {
                    Double dprice = Convert.ToDouble(textPrice);
                }
                catch (Exception ex)
                {
                    txtPrice.BecomeFirstResponder();
                    ToastHelper.PresentOKAlert("Error", ex.Message, this);
                    return;
                }
                if (image == null || (_product == null && _imageChanged == false))
                {
                    ToastHelper.PresentOKAlert("Error", "Choose a image", this);
                    return;
                }
                //Dragging is not working properly, have to manually trigger the segue.
                //Need to create the Segue first by creating a UIButton first and drag it to View Control 'exit' to create segue. Name it to 'UnwindSave'.
                this.PerformSegue("UnwindSave", btnSave);
            };

            // Tap gesture
            imgPhoto.UserInteractionEnabled = true;
            imgPhoto.AddGestureRecognizer(new UITapGestureRecognizer(tap =>
            {
                txtName.ResignFirstResponder();
                txtPrice.ResignFirstResponder();

                // UIImagePickerController is a view controller that lets a user pick media from their photo library.
                _imagePicker = new UIImagePickerController();

                // Only allow photos to be picked, not taken.
                _imagePicker.SourceType = UIImagePickerControllerSourceType.PhotoLibrary;
                _imagePicker.MediaTypes = UIImagePickerController.AvailableMediaTypes(UIImagePickerControllerSourceType.PhotoLibrary);

                // Events
                _imagePicker.FinishedPickingMedia += Handle_FinishedPickingMedia;
                _imagePicker.Canceled += Handle_Canceled;

                // Show Image Picker
                NavigationController.PresentModalViewController(_imagePicker, true);
            })
            {
                NumberOfTapsRequired = 1 // Signle tap 
            });
        }

        protected void Handle_FinishedPickingMedia(object sender, UIImagePickerMediaPickedEventArgs e)
        {
            // determine what was selected, video or image
            bool isImage = false;
            switch (e.Info[UIImagePickerController.MediaType].ToString())
            {
                case "public.image":
                    isImage = true;
                    break;
                case "public.video":
                    break;
            }

            if (isImage)
            {
                UIImage originalImage = e.Info[UIImagePickerController.OriginalImage] as UIImage;
                if (originalImage != null)
                {
                    imgPhoto.Image = originalImage;
                    _imageChanged = true;
                }
            }
            // dismiss the picker
            _imagePicker.DismissModalViewController(true);
        }

        protected void Handle_Canceled(object sender, EventArgs e)
        {
            _imagePicker.DismissModalViewController(true);
        }

        public override void DidReceiveMemoryWarning()
        {
            base.DidReceiveMemoryWarning();
            // Release any cached data, images, etc that aren't in use.
        }

        public override void PrepareForSegue(UIStoryboardSegue segue, NSObject sender)
        {
            base.PrepareForSegue(segue, sender);

            var button = sender as UIBarButtonItem;
            if (button != null) {
                if (_product == null)
                {
                    _product = new Product();
                }
                _product.ProductName = txtName.Text;
                _product.Price = Convert.ToDouble(txtPrice.Text);
                _product.Image = ImageHelper.UIImageToBytes(imgPhoto.Image);
            }
        }
    }
}

