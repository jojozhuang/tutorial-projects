using System;
using System.Collections.Generic;
using Foundation;
using GameStoreXamarin.Core.Data;
using GameStoreXamarin.Core.Models;
using GameStoreXamarin.iOS.Helper;
using UIKit;

namespace GameStoreXamarin.iOS
{
    public partial class ProductTableViewController : UITableViewController
    {
        private List<Product> _productList;

        public ProductTableViewController(IntPtr handle) : base(handle)
        {
        }
        /*public ProductTableViewController() : base("ProductTableViewController", null)
        {
        }*/

        public override void ViewDidLoad()
        {
            base.ViewDidLoad();
            Xamarin.Forms.Forms.Init();

            NavigationItem.LeftBarButtonItem = EditButtonItem;

            _productList = DatabaseHelper.Database.GetProducts();
            if (_productList == null || _productList.Count == 0) {
                CreateDummyData();
            }
        }

        public override void DidReceiveMemoryWarning()
        {
            base.DidReceiveMemoryWarning();
            // Release any cached data, images, etc that aren't in use.
        }

        public override nint NumberOfSections(UITableView tableView) {
            return 1;
        }

        public override nint RowsInSection(UITableView tableView, nint section)
        {
            return _productList.Count;
        }

        public override UITableViewCell GetCell(UITableView tableView, NSIndexPath indexPath) {

            // Table view cells are reused and should be dequeued using a cell identifier.
            var cellIdentifier = "ProductTableViewCell";

            var cell = tableView.DequeueReusableCell(cellIdentifier) as CustomProductTableViewCell;

            if (cell == null)
            {
                cell = new CustomProductTableViewCell(NSString.FromData(cellIdentifier, NSStringEncoding.UTF8));
            }

            // Fetches the appropriate product for the data source layout.
            var product = _productList[indexPath.Row];
            //cell.TextLabel.Text = product.ProductName;
            //cell.priceLabel.text = "$" + String(describing: product.price)
            //cell.ImageView.Image = ImageHelper.BytesToBitmap(product.Image);
            cell.UpdateCell(product.ProductName, Convert.ToString(product.Price), ImageHelper.BytesToUIImage(product.Image));

            return cell;
        }

        // Override to support conditional editing of the table view.
        public override bool CanEditRow(UITableView tableView, NSIndexPath indexPath) {
            // Return false if you do not want the specified item to be editable.
            return true;
        }

        // Override to support editing the table view.
        public override void CommitEditingStyle(UITableView tableView, UITableViewCellEditingStyle editingStyle, NSIndexPath indexPath)
        {
            if (editingStyle == UITableViewCellEditingStyle.Delete) {
                // Delete the row from the data source
                Product product = _productList[indexPath.Row];
                _productList.RemoveAt(indexPath.Row);
                DatabaseHelper.Database.DeleteProduct(product);
                List<NSIndexPath> Rows = new List<NSIndexPath> { indexPath };
                tableView.DeleteRows(Rows.ToArray(), UITableViewRowAnimation.Fade);
            }
            else if (editingStyle == UITableViewCellEditingStyle.Insert) {
                // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
            }
        }

        public override void RowSelected (UITableView tableView, NSIndexPath indexPath)
        {
            this.PerformSegue("ShowDetail", indexPath); // pass indexPath as sender
        } 

        public override void PrepareForSegue(UIStoryboardSegue segue, NSObject sender)
        {
            base.PrepareForSegue(segue, sender);

            switch (segue.Identifier)
            {
                case "AddItem":
                    int a = 1;
                    a++;
                    break;
                case "ShowDetail":
                    var pdvc = segue.DestinationViewController as ProductDetailsViewController;
                    if (pdvc != null) {
                        var indexPath = sender as NSIndexPath;
                        if (indexPath != null)
                        {
                            var selectedProduct = _productList[indexPath.Row];
                            pdvc._product = selectedProduct;
                        }
                    }
                    break;
                default:
                    break;
            }        
        }

        [Action("UnwindToProductTableViewController:")]
        public void UnwindToProductTableViewController(UIStoryboardSegue segue)
        {
            var sourceViewController = segue.SourceViewController as ProductDetailsViewController;
            if (sourceViewController != null) {
                var product = sourceViewController._product;
                if (product != null) {
                    var selectedIndexPath = TableView.IndexPathForSelectedRow;
                    if (selectedIndexPath != null)  {
                        // Update an existing product.
                        _productList[selectedIndexPath.Row] = product;
                    }
                    else {
                        // Add a new product.
                        _productList.Add(product);
                    }
                    TableView.ReloadData();
                    DatabaseHelper.Database.SaveProduct(product);
                }
            }
        }

        private void CreateDummyData()
        {
            Product product = new Product();
            product.ProductName = "Xbox 360";
            product.Price = 299.00;
            product.Image = ImageHelper.UIImageToBytes(UIImage.FromBundle("xbox360"));
            DatabaseHelper.Database.SaveProduct(product);

            product = new Product();
            product.ProductName = "Wii";
            product.Price = 269.00;
            product.Image = ImageHelper.UIImageToBytes(UIImage.FromBundle("wii"));
            DatabaseHelper.Database.SaveProduct(product);

            product = new Product();
            product.ProductName = "Wireless Controller";
            product.Price = 19.99;
            product.Image = ImageHelper.UIImageToBytes(UIImage.FromBundle("controller"));
            DatabaseHelper.Database.SaveProduct(product);

            _productList = DatabaseHelper.Database.GetProducts();
        }
    }
}

