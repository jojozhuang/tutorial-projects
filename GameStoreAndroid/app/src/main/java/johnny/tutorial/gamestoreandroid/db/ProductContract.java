package johnny.tutorial.gamestoreandroid.db;

import android.provider.BaseColumns;

public class ProductContract {
    public static final String DB_NAME = "johnny.tutorial.gamestoreandroid.db";
    public static final int DB_VERSION = 1;

    public class ProductEntry implements BaseColumns {
        public static final String TABLE = "products";
        public static final String COL_PRODUCT_NAME = "productname";
        public static final String COL_PRICE = "price";
        public static final String COL_IMAGE = "image";
    }
}