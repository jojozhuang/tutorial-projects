package johnny.tutorial.restfulspringboot.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.validator.constraints.NotBlank;

@Entity
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    
    @NotBlank
    private String productname;
    private double price;
    private String image;
    
    @SuppressWarnings("unused")
    private Product(){}
    
    public Product(String productname) {
        this.productname = productname;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Product [productname=" + productname + ", price=" + price + "]";
    }
    
}
