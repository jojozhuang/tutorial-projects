package johnny.tutorial.gamestoreandroid;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import johnny.tutorial.gamestoreandroid.constant.GameStoreConstants.ViewMode;
import johnny.tutorial.gamestoreandroid.db.ProductDbHelper;
import johnny.tutorial.gamestoreandroid.model.Product;

import java.util.ArrayList;

import johnny.tutorial.gamestoreandroid.constant.GameStoreConstants;

public class ProductListActivity extends AppCompatActivity {

    private static final String TAG = "ProductListActivity";
    private ProductDbHelper mHelper;
    private ListView mListView;
    private ListAdapter mAdapter;
    private ViewMode mMode;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_list);

        mMode = ViewMode.Display;
        mHelper = new ProductDbHelper(this);
        mListView = (ListView) findViewById(R.id.list_product);

        updateUI();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        if (mMode == ViewMode.Display) {
            getMenuInflater().inflate(R.menu.list_menu, menu);
            return super.onCreateOptionsMenu(menu);
        } else {
            getMenuInflater().inflate(R.menu.edit_menu, menu);
            return super.onCreateOptionsMenu(menu);
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_addproduct:
                Log.d(TAG, "Add a new product");
                Intent intent = new Intent(this, ProductDetailActivity.class);
                intent.putExtra(GameStoreConstants.ParamAction, GameStoreConstants.ParamActionAdd);
                this.startActivity(intent);
                return true;
            case R.id.action_editproduct:
                Log.d(TAG, "Switch to Edit mode");
                mMode = ViewMode.Edit;
                updateUI();
                return true;
            case R.id.action_delete:
                Log.d(TAG, "Delete selected products");
                if (DeleteSelectedItems() == false) {
                    Toast.makeText(this, "Select at least one item to delete", Toast.LENGTH_LONG).show();
                    return false;
                }
                mMode = ViewMode.Display;
                updateUI();
                return true;
            case R.id.action_cancel:
                Log.d(TAG, "Cancel edit");
                mMode = ViewMode.Display;
                updateUI();
                return true;

            default:
                return super.onOptionsItemSelected(item);
        }
    }

    // Product Adapter
    private class ProductAdapter extends BaseAdapter {
        private Context context;
        private int resource;
        private ArrayList<Product> productList;
        private ViewMode mode;
        private LayoutInflater inflater;

        ProductAdapter(Context context, int resource, ArrayList<Product> productList, ViewMode mode) {
            this.context = context;
            this.resource = resource;
            this.productList = productList;
            this.mode = mode;
            this.inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        }

        @Override
        public int getCount() {
            return productList.size();
        }

        @Override
        public Object getItem(int i) {
            return productList.get(i);
        }

        @Override
        public long getItemId(int i) {
            return i;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            ViewHolder holder;
            View row = convertView;
            if (row == null) {
                row = inflater.inflate(this.resource, parent, false);
                holder = new ViewHolder();
                holder.productname = (TextView) row.findViewById(R.id.productname);
                holder.price = (TextView) row.findViewById(R.id.price);
                holder.image = (ImageView) row.findViewById(R.id.image);
                holder.checkbox = (CheckBox) row.findViewById(R.id.checkbox);
                row.setTag(holder);
            } else {
                holder = (ViewHolder) row.getTag();
            }

            Product product = productList.get(position);
            holder.id = product.getProductId();
            holder.productname.setText(product.getProductName());
            holder.price.setText("$" + String.valueOf(product.getPrice()));
            holder.image.setImageBitmap(product.getImage());
            if (mode == ViewMode.Display) {
                holder.checkbox.setVisibility(View.GONE);
            } else {
                holder.checkbox.setVisibility(View.VISIBLE);
            }
            row.setOnClickListener(new ProductItemOnClickListener(context, product.getProductId()));
            return row;
        }

        class ViewHolder {
            int id;
            TextView productname;
            TextView price;
            ImageView image;
            CheckBox checkbox;
        }

    }

    private class ProductItemOnClickListener implements View.OnClickListener {
        private Context context;
        private int id;

        public ProductItemOnClickListener(Context context, int id) {
            this.context = context;
            this.id = id;
        }

        @Override
        public void onClick(View view) {
            Intent intent = new Intent(this.context, ProductDetailActivity.class);
            intent.putExtra(GameStoreConstants.ParamAction, GameStoreConstants.ParamActionEdit);
            intent.putExtra(GameStoreConstants.ParamId, id);
            this.context.startActivity(intent);
        }
    }

    private void updateUI() {
        ArrayList<Product> productList = mHelper.getAllProducts();
        if (productList.size() == 0) {
            productList = createDummyData();
        }

        mAdapter = new ProductAdapter(this, R.layout.product_list_item, productList, mMode);
        mListView.setAdapter(mAdapter);
        invalidateOptionsMenu();
    }

    private Boolean DeleteSelectedItems() {
        boolean isSelected = false;
        for (int i = 0; i < mListView.getCount(); i++) {
            View rowView = mListView.getChildAt(i);
            CheckBox cb = (CheckBox) rowView.findViewById(R.id.checkbox);
            if (cb.isChecked()) {
                isSelected = true;
                ProductAdapter.ViewHolder holder = (ProductAdapter.ViewHolder) rowView.getTag();
                mHelper.deleteProduct(holder.id);
            }
        }
        return isSelected;
    }

    private ArrayList<Product> createDummyData() {
        Bitmap image1 = BitmapFactory.decodeResource(getResources(), R.drawable.xbox360);
        mHelper.insertProduct("xbox360", 299.00, image1);
        Bitmap image2 = BitmapFactory.decodeResource(getResources(), R.drawable.wii);
        mHelper.insertProduct("wii", 269.00, image2);
        Bitmap image3 = BitmapFactory.decodeResource(getResources(), R.drawable.controller);
        mHelper.insertProduct("controller", 19.99, image3);
        return mHelper.getAllProducts();
    }
}
