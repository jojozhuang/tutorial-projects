package johnny.tutorial.SpringBootTutorial;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import johnny.tutorial.SpringBootTutorial.domain.Product;
import johnny.tutorial.SpringBootTutorial.repository.ProductRepository;

@SpringBootApplication
public class RestApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestApplication.class, args);
    }
    
    @Bean
    CommandLineRunner runner(ProductRepository productRepository) {
        return args -> {
            
            Product product1 = new Product("iPhone 7 plus");
            product1.setPrice(800.00);
            productRepository.save(product1);
            
            Product product2 = new Product("iPad 4");
            product2.setPrice(500.00);
            productRepository.save(product2);
            
            Product product3 = new Product("iPod");
            product3.setPrice(300.00);
            productRepository.save(product3);
            
        };
    }
    
}
