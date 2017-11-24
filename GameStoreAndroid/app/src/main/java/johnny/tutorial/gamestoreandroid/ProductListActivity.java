package johnny.tutorial.gamestoreandroid;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;

import johnny.tutorial.gamestoreandroid.db.ProductDbHelper;
import johnny.tutorial.gamestoreandroid.model.Product;

import java.util.ArrayList;

public class ProductListActivity extends AppCompatActivity {
    private static final String TAG = "ProductListActivity";
    private ProductDbHelper mHelper;
    private ListView mListView;
    private ListAdapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_list);

        mHelper = new ProductDbHelper(this);
        mListView = (ListView) findViewById(R.id.list_product);

        updateUI();
    }


    private void updateUI() {
        ArrayList<Product> productList = mHelper.getAllProducts();
        if (productList.size() == 0) {
            productList = createDummyData();
        }

        if (mAdapter == null) {
            mAdapter = new ProductAdapter(this,
                    R.layout.product_list_item,
                    productList);
            mListView.setAdapter(mAdapter);
        }
    }

    // Product Adapter
    class ProductAdapter extends BaseAdapter {

        private ArrayList<Product> productList;
        private LayoutInflater inflater;
        private int resource;
        private Context context;

        ProductAdapter(Context context, int resource, ArrayList<Product> productList) {
            this.context = context;
            this.productList = productList;
            this.resource = resource;
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
                row.setTag(holder);
            } else {
                holder = (ViewHolder) row.getTag();
            }

            Product product = productList.get(position);
            holder.productname.setText(product.getProductName());
            holder.price.setText("$" + String.valueOf(product.getPrice()));
            holder.image.setImageBitmap(product.getImage());
            row.setOnClickListener(new ProductItemOnClickListener(context, product.getProductId()));
            return row;
        }

        class ViewHolder {
            TextView productname;
            TextView price;
            ImageView image;
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
            intent.putExtra("id", id);
            this.context.startActivity(intent);
        }
    }

    public ArrayList<Product> createDummyData() {
        Bitmap image1 = BitmapFactory.decodeResource(getResources(), R.drawable.xbox360);
        mHelper.insertProduct("xbox360", 299.00, image1);
        Bitmap image2 = BitmapFactory.decodeResource(getResources(), R.drawable.wii);
        mHelper.insertProduct("wii", 269.00, image2);
        Bitmap image3 = BitmapFactory.decodeResource(getResources(), R.drawable.controller);
        mHelper.insertProduct("controller", 19.99, image3);
        return mHelper.getAllProducts();
    }
}
