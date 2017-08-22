package Johnny.Tutorials;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ProductDao {
	Map<Integer, Product> map = new HashMap<Integer, Product>(); 
    public List<Product> getAllProducts(){
    	if (map == null || map.size() == 0) {
    		buildProductList();
    	}
    	return new ArrayList<Product>(map.values());
    }
    
    public Product getProduct(int id){
    	if (map == null || map.size() == 0) {
    		buildProductList();
    	}
    	return map.get(id);
    }
    
    private void buildProductList() {
    	Product product = new Product(1, "iPhone 7s", 700.00); 
    	map.put(1, product);
        product = new Product(2, "iPad 4", 500.00); 
        map.put(2, product);
        product = new Product(3, "iPod", 300.00); 
        map.put(3, product);
    }
}
