package Johnny.Tutorials;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/ProductService")
public class ProductService {
	ProductDao dao = new ProductDao();
	
	//Sample URL: http://localhost:8080/JerseyTutorial/rest/ProductService/products
	@GET
	@Path("/products")
	public List<Product> getAll() {
		return dao.getAllProducts();
	}
	
	//Sample URL: http://localhost:8080/JerseyTutorial/rest/ProductService/product/1
	@GET
	@Path("/product/{id}")
	public Product getProduct(@PathParam("id") int id) {
		return dao.getProduct(id);
	}
	
	//Sample URL: http://localhost:8080/JerseyTutorial/rest/ProductService/productJson/1
	@GET
	@Path("/productJson/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Product getProductJson(@PathParam("id") int id) {
		return dao.getProduct(id);
	}
}
