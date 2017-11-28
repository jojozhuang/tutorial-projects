using System;
using CoreGraphics;
using Foundation;
using UIKit;

namespace GameStoreXamarin.iOS
{
    public class CustomProductTableViewCell : UITableViewCell
    {
        UILabel headingLabel, subheadingLabel;
        UIImageView imageView;
        public CustomProductTableViewCell(NSString cellId) : base(UITableViewCellStyle.Default, cellId)
        {
            SelectionStyle = UITableViewCellSelectionStyle.Gray;
            //ContentView.BackgroundColor = UIColor.FromRGB(218, 255, 127);
            imageView = new UIImageView();
            headingLabel = new UILabel()
            {
                //Font = UIFont.FromName("Cochin-BoldItalic", 22f),
                //TextColor = UIColor.FromRGB(127, 51, 0),
                BackgroundColor = UIColor.Clear
            };
            subheadingLabel = new UILabel()
            {
                //Font = UIFont.FromName("AmericanTypewriter", 12f),
                //TextColor = UIColor.FromRGB(38, 127, 0),
                //TextAlignment = UITextAlignment.Center,
                BackgroundColor = UIColor.Clear
            };
            ContentView.AddSubviews(new UIView[] { headingLabel, subheadingLabel, imageView });

        }
        public void UpdateCell(string name, string price, UIImage image)
        {
            imageView.Image = image;
            headingLabel.Text = name;
            subheadingLabel.Text = "$" + price;
        }
        public override void LayoutSubviews()
        {
            base.LayoutSubviews();
            imageView.Frame = new CGRect(0.0, 0.0, 90, 90);
            headingLabel.Frame = new CGRect(98, 4, 268, 21);
            subheadingLabel.Frame = new CGRect(98, 43, 268, 21);
        }
    }
}
