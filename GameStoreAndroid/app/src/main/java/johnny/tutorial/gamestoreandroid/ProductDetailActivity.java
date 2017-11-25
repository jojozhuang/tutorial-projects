package johnny.tutorial.gamestoreandroid;

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
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.FileNotFoundException;

import johnny.tutorial.gamestoreandroid.constant.GameStoreConstants;
import johnny.tutorial.gamestoreandroid.constant.GameStoreConstants.ActionMode;
import johnny.tutorial.gamestoreandroid.db.ProductDbHelper;
import johnny.tutorial.gamestoreandroid.model.Product;

public class ProductDetailActivity extends AppCompatActivity {
    private static final String TAG = "ProductDetailActivity";
    private ProductDbHelper mHelper;
    private Product mProduct;
    private ActionMode mAction;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_detail);

        mHelper = new ProductDbHelper(this);

        Bundle extras = getIntent().getExtras();
        String actionText = extras.getString(GameStoreConstants.ParamAction);

        EditText name = (EditText) this.findViewById(R.id.productname);
        EditText price = (EditText) this.findViewById(R.id.price);
        Button loadImage = (Button)findViewById(R.id.loadimage);
        ImageView image = (ImageView) this.findViewById(R.id.image);

        if (actionText.equalsIgnoreCase(GameStoreConstants.ParamActionAdd)) {
            mAction = ActionMode.Add;
        } else if (actionText.equalsIgnoreCase(GameStoreConstants.ParamActionEdit)) {
            mAction = ActionMode.Edit;
            int id = extras.getInt(GameStoreConstants.ParamId);
            mProduct = mHelper.getProduct(id);
            if (mProduct != null) {
                name.setText(mProduct.getProductName());
                price.setText(String.valueOf(mProduct.getPrice()));
                image.setImageBitmap(mProduct.getImage());
                Drawable drawable = new BitmapDrawable(getResources(), mProduct.getImage());
                loadImage.setBackground(drawable);
                loadImage.setText("");
            }
        }

        loadImage.setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View arg0) {
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
                    loadImage.setFocusableInTouchMode(true); ///add this line
                    loadImage.requestFocus();
                    return false;
                }

                if (mAction == ActionMode.Add) {
                    mHelper.insertProduct(textName, Double.parseDouble(textPrice), ((BitmapDrawable)drawable).getBitmap());
                } else {
                    mHelper.updateProduct(mProduct.getProductId(), textName, Double.parseDouble(textPrice), ((BitmapDrawable)drawable).getBitmap());
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
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == RESULT_OK){
            Uri targetUri = data.getData();
            try {
                Bitmap bitmap = BitmapFactory.decodeStream(getContentResolver().openInputStream(targetUri));
                ImageView targetImage = (ImageView)findViewById(R.id.image);
                targetImage.setImageBitmap(bitmap);
                Button loadImage = (Button)findViewById(R.id.loadimage);
                Drawable drawable = new BitmapDrawable(getResources(), bitmap);
                loadImage.setBackground(drawable);
                loadImage.setText("");
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
        }
    }
}
