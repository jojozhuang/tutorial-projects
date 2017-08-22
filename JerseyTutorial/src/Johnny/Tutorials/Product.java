package Johnny.Tutorials;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "product") 
public class Product implements Serializable {
    private int id;
    private String name;
    private double price;
    
    public Product() {}
    
    public Product(int id, String name, double price) {
    	this.id = id;
    	this.name = name;
    	this.price = price;
    }
    
    public int getId() {
    	return id;
    }
    @XmlElement 
    public void setId(int id) {
    	this.id = id;
    }
    
    public String getName() {
    	return name;
    }
    @XmlElement 
    public void setName(String name) {
    	this.name = name;
    }
    
    public double getPrice() {
    	return price;
    }
    @XmlElement 
    public void setPrice(double price) {
    	this.price = price;
    }
}
