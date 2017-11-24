package johnny.tutorial.gamestoreandroid.model;

import android.graphics.Bitmap;

/**
 * Created by i857285 on 11/23/17.
 */

public class Product {
    private int productid;
    private String productname;
    private double price;
    private Bitmap image;

    public Product() {}

    public Product(int productid, String productname, double price, Bitmap image) {
        this.productid = productid;
        this.productname = productname;
        this.price = price;
        this.image = image;
    }

    public int getProductId() {
        return productid;
    }
    public void setProductId(int productid) {
        this.productid = productid;
    }

    public String getProductName() {
        return productname;
    }
    public void setProductName(String productname) {
        this.productname = productname;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public Bitmap getImage() {
        return image;
    }
    public void setImage(Bitmap image) {
        this.image = image;
    }
}
