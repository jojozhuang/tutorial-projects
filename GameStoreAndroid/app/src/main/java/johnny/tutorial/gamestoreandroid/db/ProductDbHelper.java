package johnny.tutorial.gamestoreandroid.db;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseUtils;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteStatement;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import johnny.tutorial.gamestoreandroid.model.Product;

public class ProductDbHelper extends SQLiteOpenHelper {

    public ProductDbHelper(Context context) {
        super(context, ProductContract.DB_NAME, null, ProductContract.DB_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String createTable = "CREATE TABLE " + ProductContract.ProductEntry.TABLE + " ( " +
                ProductContract.ProductEntry._ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                ProductContract.ProductEntry.COL_PRODUCT_NAME + " TEXT NOT NULL, " +
                ProductContract.ProductEntry.COL_PRICE + " REAL," +
                ProductContract.ProductEntry.COL_IMAGE + " TEXT);";

        db.execSQL(createTable);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + ProductContract.ProductEntry.TABLE);
        onCreate(db);
    }

    public boolean insertProduct (String name, Double price, Bitmap image) {
        SQLiteDatabase db = this.getWritableDatabase();
        /*ContentValues contentValues = new ContentValues();
        contentValues.put(ProductContract.ProductEntry.COL_PRODUCT_NAME, name);
        contentValues.put(ProductContract.ProductEntry.COL_PRICE, price);
        contentValues.put(ProductContract.ProductEntry.COL_IMAGE, image);
        db.insert(ProductContract.ProductEntry.TABLE, null, contentValues);*/
        String sql = "INSERT INTO " + ProductContract.ProductEntry.TABLE + " ("+ProductContract.ProductEntry.COL_PRODUCT_NAME+","+
                ProductContract.ProductEntry.COL_PRICE + "," +
                ProductContract.ProductEntry.COL_IMAGE + ") VALUES(?,?,?)";
        SQLiteStatement insertStmt = db.compileStatement(sql);
        insertStmt.clearBindings();
        insertStmt.bindString(1, name);
        insertStmt.bindDouble(2,price);
        insertStmt.bindBlob(3, getBitmapAsByteArray(image));
        insertStmt.executeInsert();
        db.close();
        return true;
    }

    public Cursor getData(int id) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor rs =  db.rawQuery( "select * from " + ProductContract.ProductEntry.TABLE + " where _id="+id+"", null );
        return rs;
    }

    public Product getProduct(int id) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor rs =  db.rawQuery( "select * from " + ProductContract.ProductEntry.TABLE + " where _id="+id+"", null );
        rs.moveToFirst();

        Product product = new Product();
        product.setProductName(rs.getString(rs.getColumnIndex(ProductContract.ProductEntry.COL_PRODUCT_NAME)));
        product.setPrice(rs.getDouble(rs.getColumnIndex(ProductContract.ProductEntry.COL_PRICE)));
        byte[] imgByte = rs.getBlob(rs.getColumnIndex(ProductContract.ProductEntry.COL_IMAGE));
        product.setImage(BitmapFactory.decodeByteArray(imgByte, 0, imgByte.length));
        if (!rs.isClosed()) {
            rs.close();
        }
        return product;
    }

    public int numberOfRows(){
        SQLiteDatabase db = this.getReadableDatabase();
        int numRows = (int) DatabaseUtils.queryNumEntries(db, ProductContract.ProductEntry.TABLE);
        return numRows;
    }

    public boolean updateProduct (Integer id, String name, Double price, Bitmap image) {
        SQLiteDatabase db = this.getWritableDatabase();
        /*ContentValues contentValues = new ContentValues();
        contentValues.put(ProductContract.ProductEntry.COL_PRODUCT_NAME, name);
        contentValues.put(ProductContract.ProductEntry.COL_PRICE, price);
        contentValues.put(ProductContract.ProductEntry.COL_IMAGE, image);
        db.update(ProductContract.ProductEntry.TABLE, contentValues, "id = ? ", new String[] { Integer.toString(id) } );*/
        String sql = "UPDATE " + ProductContract.ProductEntry.TABLE + " SET "+ProductContract.ProductEntry.COL_PRODUCT_NAME+"=?,"+
                ProductContract.ProductEntry.COL_PRICE + "=?," +
                ProductContract.ProductEntry.COL_IMAGE + "=? WHERE _id=?";
        SQLiteStatement updateStmt = db.compileStatement(sql);
        updateStmt.clearBindings();
        updateStmt.bindLong(1, id);
        updateStmt.bindString(2, name);
        updateStmt.bindDouble(3,price);
        updateStmt.bindBlob(4, getBitmapAsByteArray(image));
        updateStmt.executeUpdateDelete();
        db.close();
        return true;
    }

    public Integer deleteProduct (Integer id) {
        SQLiteDatabase db = this.getWritableDatabase();
        return db.delete(ProductContract.ProductEntry.TABLE,
                "id = ? ",
                new String[] { Integer.toString(id) });
    }

    public ArrayList<Product> getAllProducts() {
        ArrayList<Product> list = new ArrayList<Product>();

        SQLiteDatabase db = this.getReadableDatabase();
        Cursor rs =  db.rawQuery( "select * from " + ProductContract.ProductEntry.TABLE, null );
        rs.moveToFirst();

        while(rs.isAfterLast() == false){
            Product product = new Product();
            product.setProductId(rs.getInt(rs.getColumnIndex(ProductContract.ProductEntry._ID)));
            product.setProductName(rs.getString(rs.getColumnIndex(ProductContract.ProductEntry.COL_PRODUCT_NAME)));
            product.setPrice(rs.getDouble(rs.getColumnIndex(ProductContract.ProductEntry.COL_PRICE)));
            byte[] imgByte = rs.getBlob(rs.getColumnIndex(ProductContract.ProductEntry.COL_IMAGE));
            product.setImage(BitmapFactory.decodeByteArray(imgByte, 0, imgByte.length));
            list.add(product);
            rs.moveToNext();
        }
        if (!rs.isClosed())  {
            rs.close();
        }

        return list;
    }

    private static byte[] getBitmapAsByteArray(Bitmap bitmap) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 0, outputStream);
        return outputStream.toByteArray();
    }
}