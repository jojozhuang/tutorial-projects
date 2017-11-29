using System;

using Android.App;
using Android.Content;
using Android.Graphics;
using Android.Graphics.Drawables;
using Android.OS;
using Android.Util;
using Android.Views;
using Android.Views.InputMethods;
using Android.Widget;
using GameStoreXamarin.Android.Helper;
using GameStoreXamarin.Core.Models;
using static GameStoreXamarin.Android.GameStoreConstants;

namespace GameStoreXamarin.Android
{
    [Activity(Label = "ProductDetailActivity")]
    public class ProductDetailActivity : Activity
    {
        private const String TAG = "ProductDetailActivity";
        private Product mProduct;
        private DetailViewMode mAction;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);

            SetContentView(Resource.Layout.ActivityProductDetail);

            Bundle extras = Intent.Extras;
            String actionText = extras.GetString(GameStoreConstants.ParamAction);

            EditText name = (EditText)FindViewById(Resource.Id.productname);
            EditText price = (EditText)FindViewById(Resource.Id.price);
            Button loadImage = (Button)FindViewById(Resource.Id.loadimage);
            ImageView image = (ImageView)FindViewById(Resource.Id.image);

            switch (actionText)
            {
                case GameStoreConstants.ParamActionAdd:
                    mAction = DetailViewMode.Add;
                    break;
                case GameStoreConstants.ParamActionEdit:
                    mAction = DetailViewMode.Edit;
                    break;
                default:
                    break;
            }

            mProduct = new Product();
            if (mAction == DetailViewMode.Edit)
            {
                int id = extras.GetInt(GameStoreConstants.ParamId);
                mProduct = DatabaseHelper.Database.GetProduct(id);
                if (mProduct != null)
                {
                    name.Text = mProduct.ProductName;
                    price.Text = Convert.ToString(mProduct.Price);
                    Bitmap bitmap = ImageHelper.BytesToBitmap(mProduct.Image);
                    image.SetImageBitmap(bitmap);
                    Drawable drawable = new BitmapDrawable(Resources, bitmap);
                    loadImage.Background = drawable;
                    loadImage.Text = "";
                }
            }

            loadImage.Click += delegate
            {
                var imageIntent = new Intent();
                imageIntent.SetType("image/*");
                imageIntent.SetAction(Intent.ActionGetContent);
                StartActivityForResult(
                    Intent.CreateChooser(imageIntent, "Select photo"), 0);
                //Intent intent = new Intent(Intent.ActionPick, MediaStore.Images.Media.ExternalContentUri);
                //StartActivityForResult(intent, 0);
            };
        }

        public override Boolean OnCreateOptionsMenu(IMenu menu)
        {
            MenuInflater.Inflate(Resource.Menu.detail_menu, menu);
            return base.OnCreateOptionsMenu(menu);
        }

        public override Boolean OnOptionsItemSelected(IMenuItem item)
        {
            EditText name1 = (EditText)FindViewById(Resource.Id.productname);
            EditText price1 = (EditText)FindViewById(Resource.Id.price);
            // dismiss soft keyboard
            InputMethodManager imm = (InputMethodManager)GetSystemService(Context.InputMethodService);
            imm.HideSoftInputFromWindow(name1.WindowToken, 0);
            imm.HideSoftInputFromWindow(price1.WindowToken, 0);

            switch (item.ItemId)
            {
                case Resource.Id.action_save:
                    Log.Debug(TAG, "Save product");
                    EditText name = (EditText)FindViewById(Resource.Id.productname);
                    EditText price = (EditText)FindViewById(Resource.Id.price);
                    Button loadImage = (Button)FindViewById(Resource.Id.loadimage);
                    ImageView image = (ImageView)FindViewById(Resource.Id.image);

                    String textName = name.Text;
                    String textPrice = price.Text;
                    Drawable drawable = image.Drawable;

                    if (String.IsNullOrEmpty(textName))
                    {
                        Toast.MakeText(this, "Product Name is Empty", ToastLength.Long).Show();
                        name.RequestFocus();
                        return false;
                    }
                    if (String.IsNullOrEmpty(textPrice))
                    {
                        Toast.MakeText(this, "Price is Empty", ToastLength.Long).Show();
                        price.RequestFocus();
                        return false;
                    }
                    if (drawable == null)
                    {
                        Toast.MakeText(this, "Choose a image", ToastLength.Long).Show();
                        loadImage.Focusable = true;
                        loadImage.RequestFocus();
                        return false;
                    }

                    mProduct.ProductName = textName;
                    mProduct.Price = Convert.ToDouble(textPrice);
                    mProduct.Image = ImageHelper.BitmapToBytes(((BitmapDrawable)drawable).Bitmap);
                    DatabaseHelper.Database.SaveProduct(mProduct);

                    var intent = new Intent(this, typeof(ProductListActivity));
                    this.StartActivity(intent);

                    return true;
                default:
                    return base.OnOptionsItemSelected(item);
            }
        }

        protected override void OnActivityResult(int requestCode, Result resultCode, Intent data)
        {
            base.OnActivityResult(requestCode, resultCode, data);

            if (resultCode == Result.Ok)
            {
                var imageView = FindViewById<ImageView>(Resource.Id.image);
                imageView.SetImageURI(data.Data);
                Button loadImage = (Button)FindViewById(Resource.Id.loadimage);
                loadImage.Background = imageView.Drawable;
                loadImage.Text = "";
                /*
                Android.Net.Uri targetUri = data.Data;
                try
                {
                    Bitmap bitmap = BitmapFactory.DecodeStream(ContentResolver.OpenInputStream(targetUri));
                    ImageView targetImage = (ImageView)FindViewById(Resource.Id.image);
                    targetImage.SetImageBitmap(bitmap);
                    Button loadImage = (Button)FindViewById(Resource.Id.loadimage);
                    Drawable drawable = new BitmapDrawable(Resources, bitmap);
                    loadImage.Background = drawable;
                    loadImage.Text = "";
                }
                catch (FileNotFoundException e)
                {
                    e.PrintStackTrace();
                }*/
            }
        }
    }
}
