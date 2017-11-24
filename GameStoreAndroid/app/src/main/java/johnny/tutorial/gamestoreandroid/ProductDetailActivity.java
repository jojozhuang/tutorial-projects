package johnny.tutorial.gamestoreandroid;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.HashMap;

import johnny.tutorial.gamestoreandroid.db.ProductDbHelper;
import johnny.tutorial.gamestoreandroid.model.Product;

public class ProductDetailActivity extends AppCompatActivity {
    private static final String TAG = "ProductDetailActivity";
    private ProductDbHelper mHelper;
    private Product product;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_detail);

        mHelper = new ProductDbHelper(this);

        Bundle extras = getIntent().getExtras();
        int id = extras.getInt("id");
        product = mHelper.getProduct(id);
        if (product != null) {
            TextView name = (TextView) this.findViewById(R.id.productname);
            TextView price = (TextView) this.findViewById(R.id.price);
            ImageView image = (ImageView) this.findViewById(R.id.image);

            name.setText(product.getProductName());
            price.setText(String.valueOf(product.getPrice()));
            image.setImageBitmap(product.getImage());
        }
    }


}
