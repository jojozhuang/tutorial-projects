// WARNING
//
// This file has been generated automatically by Visual Studio to store outlets and
// actions made in the UI designer. If it is removed, they will be lost.
// Manual changes to this file may not be handled correctly.
//
using Foundation;
using System.CodeDom.Compiler;

namespace GameStoreXamarin.iOS
{
	[Register ("ProductDetailsViewController")]
	partial class ProductDetailsViewController
	{
		[Outlet]
		UIKit.UIBarButtonItem btnCancel { get; set; }

		[Outlet]
		UIKit.UIBarButtonItem btnSave { get; set; }

		[Outlet]
		UIKit.UIImageView imgPhoto { get; set; }

		[Outlet]
		UIKit.UILabel lblName { get; set; }

		[Outlet]
		UIKit.UILabel lblPrice { get; set; }

		[Outlet]
		UIKit.UITextField txtName { get; set; }

		[Outlet]
		UIKit.UITextField txtPrice { get; set; }
		
		void ReleaseDesignerOutlets ()
		{
			if (btnCancel != null) {
				btnCancel.Dispose ();
				btnCancel = null;
			}

			if (btnSave != null) {
				btnSave.Dispose ();
				btnSave = null;
			}

			if (imgPhoto != null) {
				imgPhoto.Dispose ();
				imgPhoto = null;
			}

			if (lblName != null) {
				lblName.Dispose ();
				lblName = null;
			}

			if (lblPrice != null) {
				lblPrice.Dispose ();
				lblPrice = null;
			}

			if (txtName != null) {
				txtName.Dispose ();
				txtName = null;
			}

			if (txtPrice != null) {
				txtPrice.Dispose ();
				txtPrice = null;
			}
		}
	}
}
