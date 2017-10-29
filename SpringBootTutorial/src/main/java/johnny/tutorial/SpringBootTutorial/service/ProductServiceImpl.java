package johnny.tutorial.SpringBootTutorial.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import johnny.tutorial.SpringBootTutorial.domain.Product;
import johnny.tutorial.SpringBootTutorial.repository.ProductRepository;

public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    
    @Autowired
    public ProductServiceImpl(ProductRepository postRepository){
        this.productRepository = productRepository;
    }

    @Override
    public Iterable<Product> list() {
        return productRepository.findAll();
    }

    @Override
    public Product read(long id) {
        return productRepository.findOne(id);
    }

    @Override
    @Transactional
    public Product create(Product product) {
        // save the new product
        return productRepository.save(product);
    }

    @Override
    public void delete(long id) {
        productRepository.delete(id);
    }

    @Override
    public Product update(long id, Product update) {
        Product product = productRepository.findOne(id);
        if( update.getName() != null ) {
            product.setName(update.getName());
        }
        return productRepository.save(product);
    }
}
