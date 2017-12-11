package johnny.tutorial.RestfulSpringBoot.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import johnny.tutorial.RestfulSpringBoot.domain.Product;
import johnny.tutorial.RestfulSpringBoot.repository.ProductRepository;

@RestController
@RequestMapping("/products")
public class ProductController {
    ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    // GET /products
    @GetMapping("")
    public Iterable<Product> list(){
        return productRepository.findAll();
    }

    // GET /products/5
    @GetMapping("/{id}")
    public ResponseEntity<Product> read(@PathVariable(value = "id") long id) {
    		Product product = productRepository.findOne(id);
        if(product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(product);
    }

    // POST /products
    @PostMapping("/")
    public Product create(@Valid @RequestBody Product product){
        return productRepository.save(product);
    }

    // PUT /products/5
    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable(value = "id") Long id, 
                                          @Valid @RequestBody Product product) {
        Product oldProduct = productRepository.findOne(id);
        if(oldProduct == null) {
            return ResponseEntity.notFound().build();
        }
        oldProduct.setProductName(product.getProductName());
        oldProduct.setPrice(product.getPrice());
        oldProduct.setImage(product.getImage());

        Product newProduct = productRepository.save(oldProduct);
        return ResponseEntity.ok(newProduct);
    }

    // DELETE /products/5
    @DeleteMapping("/{id}")
    public ResponseEntity<Product> delete(@PathVariable(value = "id") long id) {
        Product product = productRepository.findOne(id);
        if(product == null) {
            return ResponseEntity.notFound().build();
        }

        productRepository.delete(product);
        return ResponseEntity.ok().build();
    }
}
