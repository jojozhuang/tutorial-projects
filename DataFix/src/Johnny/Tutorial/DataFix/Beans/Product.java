package Johnny.Tutorial.DataFix.Beans;

public class Product {
	private int productid;
    private String productname;
    private double price;

    public Product() {}

    public Product(int productid, String productname, double price) {
        this.productid = productid;
        this.productname = productname;
        this.price = price;
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
}
