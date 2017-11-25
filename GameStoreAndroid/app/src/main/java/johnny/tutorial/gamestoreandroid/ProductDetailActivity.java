package johnny.tutorial.gamestoreandroid;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;

import johnny.tutorial.gamestoreandroid.db.ProductDbHelper;
import johnny.tutorial.gamestoreandroid.model.Product;

public class ProductDetailActivity extends AppCompatActivity {
    private static final String TAG = "ProductDetailActivity";
    private ProductDbHelper mHelper;
    private Product product;
    private String mAction;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_detail);

        mHelper = new ProductDbHelper(this);

        Bundle extras = getIntent().getExtras();
        mAction = extras.getString("action");
        if (mAction.equalsIgnoreCase("add")) {

        } else if (mAction.equalsIgnoreCase("edit")) {
            int id = extras.getInt("id");
            product = mHelper.getProduct(id);
            if (product != null) {
                EditText name = (EditText) this.findViewById(R.id.productname);
                EditText price = (EditText) this.findViewById(R.id.price);
                Button loadImage = (Button)findViewById(R.id.loadimage);
                ImageView image = (ImageView) this.findViewById(R.id.image);

                name.setText(product.getProductName());
                price.setText(String.valueOf(product.getPrice()));
                image.setImageBitmap(product.getImage());
                Drawable drawable = new BitmapDrawable(getResources(), product.getImage());
                loadImage.setBackground(drawable);
                loadImage.setText("");
            }
        }

        Button buttonLoadImage = (Button)findViewById(R.id.loadimage);
        ImageView targetImage = (ImageView)findViewById(R.id.image);

        buttonLoadImage.setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View arg0) {
                // TODO Auto-generated method stub
                Intent intent = new Intent(Intent.ACTION_PICK,
                        android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                startActivityForResult(intent, 0);
            }});
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.detail_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // dismiss soft keyboard
        AndroidUtils.hideKeyboard(this);

        switch (item.getItemId()) {
            case R.id.action_save:
                Log.d(TAG, "Save product");
                EditText name = (EditText) this.findViewById(R.id.productname);
                EditText price = (EditText) this.findViewById(R.id.price);
                Button loadImage = (Button)findViewById(R.id.loadimage);
                ImageView image = (ImageView) this.findViewById(R.id.image);

                ProductDbHelper mHelper = new ProductDbHelper(this);

                String textName = name.getText().toString();
                String textPrice = price.getText().toString();
                Drawable drawable = image.getDrawable();

                if(TextUtils.isEmpty(textName)){
                    Toast.makeText(this, "Product Name is Empty", Toast.LENGTH_LONG).show();
                    name.requestFocus();
                    return false;
                }
                if(TextUtils.isEmpty(textPrice)){
                    Toast.makeText(this, "Price is Empty", Toast.LENGTH_LONG).show();
                    price.requestFocus();
                    return false;
                }
                if (drawable == null) {
                    Toast.makeText(this, "Choose a image", Toast.LENGTH_LONG).show();
                    loadImage.setFocusable(true);
                    loadImage.setFocusableInTouchMode(true);///add this line
                    loadImage.requestFocus();
                    return false;
                }

                if (product == null) {
                    product = new Product();
                }

                product.setProductName(name.getText().toString());
                product.setPrice(Double.parseDouble(price.getText().toString()));
                product.setImage(((BitmapDrawable)drawable).getBitmap());

                if (mAction.equalsIgnoreCase("add")) {
                    mHelper.insertProduct(product.getProductName(), product.getPrice(), product.getImage());
                } else {
                    mHelper.updateProduct(product.getProductId(), product.getProductName(), product.getPrice(), product.getImage());
                }
                Intent intent = new Intent(this, ProductListActivity.class);
                this.startActivity(intent);
                return true;

            default:
                return super.onOptionsItemSelected(item);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        // TODO Auto-generated method stub
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == RESULT_OK){
            Uri targetUri = data.getData();
            Bitmap bitmap;
            try {
                bitmap = BitmapFactory.decodeStream(getContentResolver().openInputStream(targetUri));
                ImageView targetImage = (ImageView)findViewById(R.id.image);
                targetImage.setImageBitmap(bitmap);
                Button loadImage = (Button)findViewById(R.id.loadimage);
                Drawable drawable = new BitmapDrawable(getResources(), bitmap);
                loadImage.setBackground(drawable);
                loadImage.setText("");
            } catch (FileNotFoundException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    private void showDialogBox() {
        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
        alertDialogBuilder.setMessage("Click on Image for tag");
        alertDialogBuilder.setPositiveButton("Ok",
                new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface arg0, int arg1) {
                    }
                });

        alertDialogBuilder.setNegativeButton("cancel",
                new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface arg0, int arg1) {

                    }
                });

        AlertDialog alertDialog = alertDialogBuilder.create();
        alertDialog.show();
    }
}
