using System;
using System.Collections.Generic;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Views;
using Android.Widget;
using Android.Graphics;
using GameStoreXamarin.Core.Models;
using static GameStoreXamarin.Android.GameStoreConstants;
using static Android.Views.View;
using Android.Util;
using GameStoreXamarin.Android.Helper;
using GameStoreXamarin.Core.Data;

namespace GameStoreXamarin.Android
{
    [Activity(Label = "ProductListActivity", MainLauncher = true)]
    public class ProductListActivity : Activity
    {
        private const String TAG = "ProductListActivity";
        private ListView mListView;
        private BaseAdapter mAdapter;
        private ListViewMode mMode;
        private List<Product> _productList;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            Xamarin.Forms.Forms.Init(this, savedInstanceState);
            SetContentView(Resource.Layout.ProductList);

            mMode = ListViewMode.Display;
            mListView = (ListView)FindViewById(Resource.Id.list_product);

            updateUI();
        }

        public override Boolean OnCreateOptionsMenu(IMenu menu)
        {
            if (mMode == ListViewMode.Display)
            {
                MenuInflater.Inflate(Resource.Menu.list_menu, menu);
                return base.OnCreateOptionsMenu(menu);
            }
            else
            {
                MenuInflater.Inflate(Resource.Menu.edit_menu, menu);
                return base.OnCreateOptionsMenu(menu);
            }
        }

        public override Boolean OnOptionsItemSelected(IMenuItem item)
        {
            switch (item.ItemId)
            {
                case Resource.Id.action_addproduct:
                    Log.Debug(TAG, "Add a new product");
                    var intent = new Intent(this, typeof(ProductDetailActivity));
                    intent.PutExtra(GameStoreConstants.ParamAction, GameStoreConstants.ParamActionAdd);
                    this.StartActivity(intent);
                    return true;
                case Resource.Id.action_editproduct:
                    Log.Debug(TAG, "Switch to Edit mode");
                    mMode = ListViewMode.Edit;
                    updateUI();
                    return true;
                case Resource.Id.action_delete:
                    Log.Debug(TAG, "Delete selected products");
                    if (DeleteSelectedItems() == false) {
                        Toast.MakeText(this, "Select at least one item to delete", ToastLength.Long).Show();
                        return false;
                    }
                    mMode = ListViewMode.Display;
                    updateUI();
                    return true;
                case Resource.Id.action_cancel:
                    Log.Debug(TAG, "Cancel edit");
                    mMode = ListViewMode.Display;
                    updateUI();
                    return true;
                default:
                    return base.OnOptionsItemSelected(item);
            }
        }

        private void updateUI()
        {
            _productList = DatabaseHelper.Database.GetProducts();
            if (_productList.Count == 0)
            {
                CreateDummyData();
            }

            mAdapter = new ProductAdapter(this, Resource.Layout.ProductListItem, _productList, mMode);
            mListView.Adapter = mAdapter;
            InvalidateOptionsMenu();
        }

        private void CreateDummyData()
        {
            Product product = new Product();
            product.ProductName = "xbox360";
            product.Price = 299.00;
            product.Image = ImageHelper.BitmapToBytes(BitmapFactory.DecodeResource(Resources, Resource.Drawable.xbox360));
            DatabaseHelper.Database.SaveProduct(product);

            product = new Product();
            product.ProductName = "wii";
            product.Price = 269.00;
            product.Image = ImageHelper.BitmapToBytes(BitmapFactory.DecodeResource(Resources, Resource.Drawable.wii));
            DatabaseHelper.Database.SaveProduct(product);

            product = new Product();
            product.ProductName = "controller";
            product.Price = 19.99;
            product.Image = ImageHelper.BitmapToBytes(BitmapFactory.DecodeResource(Resources, Resource.Drawable.controller));
            DatabaseHelper.Database.SaveProduct(product);

            _productList = DatabaseHelper.Database.GetProducts();
        }

        private Boolean DeleteSelectedItems()
        {
            Boolean isSelected = false;
            for (int i = 0; i < mListView.Count; i++)
            {
                View rowView = mListView.GetChildAt(i);
                CheckBox cb = (CheckBox)rowView.FindViewById(Resource.Id.checkbox);
                if (cb.Checked)
                {
                    isSelected = true;
                    ProductAdapter.ViewHolder holder = (ProductAdapter.ViewHolder)rowView.Tag;
                    DatabaseHelper.Database.DeleteProduct(holder.ID);
                }
            }
            return isSelected;
        }
    }

    // Product Adapter
    public class ProductAdapter : BaseAdapter
    {
        private Context context;
        private int resource;
        private List<Product> productList;
        private ListViewMode mode;
        private LayoutInflater inflater;

        public ProductAdapter(Context context, int resource, List<Product> productList, ListViewMode mode)
        {
            this.context = context;
            this.resource = resource;
            this.productList = productList;
            this.mode = mode;
            this.inflater = (LayoutInflater)context.GetSystemService(Context.LayoutInflaterService);
        }

        public override int Count
        {
            get { return productList.Count; }
        }

        public override Java.Lang.Object GetItem (int position)
        {
            return null;
            //return productList[position];
        }

        public override long GetItemId (int position)
        {
            return productList[position].ProductId;
        }

        public override View GetView(int position, View convertView, ViewGroup parent)
        {
            ViewHolder holder;
            View row = convertView;
            if (row == null)
            {
                row = inflater.Inflate(this.resource, parent, false);
                holder = new ViewHolder();
                holder.ProductName = (TextView)row.FindViewById(Resource.Id.productname);
                holder.Price = (TextView)row.FindViewById(Resource.Id.price);
                holder.Image = (ImageView)row.FindViewById(Resource.Id.image);
                holder.Selected = (CheckBox)row.FindViewById(Resource.Id.checkbox);
                row.Tag = holder;
            }
            else
            {
                holder = (ViewHolder)row.Tag;
            }

            Product product = productList[position];
            holder.ID = product.ProductId;
            holder.ProductName.Text = product.ProductName;
            holder.Price.Text = "$" + Convert.ToString(product.Price);
            holder.Image.SetImageBitmap(ImageHelper.BytesToBitmap(product.Image));
            if (mode == ListViewMode.Display)
            {
                holder.Selected.Visibility = ViewStates.Gone;
            }
            else
            {
                holder.Selected.Visibility = ViewStates.Visible;
            }
            row.SetOnClickListener(new ProductItemOnClickListener(context, product.ProductId));
            return row;
        }

        public class ViewHolder : Java.Lang.Object 
        {
            public int ID { get; set; }
            public TextView ProductName { get; set; }
            public TextView Price { get; set; }
            public ImageView Image { get; set; }
            public CheckBox Selected { get; set; }
        }
    }

    class ProductItemOnClickListener : Java.Lang.Object, IOnClickListener
    {
        private Context context;
        private int id;

        public ProductItemOnClickListener(Context context, int id)
        {
            this.context = context;
            this.id = id;
        }

        public void OnClick(View view)
        {
            var intent = new Intent(this.context, typeof(ProductDetailActivity));
            intent.PutExtra(GameStoreConstants.ParamAction, GameStoreConstants.ParamActionEdit);
            intent.PutExtra(GameStoreConstants.ParamId, id);
            this.context.StartActivity(intent);
        }
    }
}
