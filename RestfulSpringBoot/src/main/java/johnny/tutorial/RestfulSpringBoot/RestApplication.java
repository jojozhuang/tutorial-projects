package johnny.tutorial.RestfulSpringBoot;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import johnny.tutorial.RestfulSpringBoot.domain.Product;
import johnny.tutorial.RestfulSpringBoot.repository.ProductRepository;

@SpringBootApplication
public class RestApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestApplication.class, args);
    }
    
    @Bean
    CommandLineRunner runner(ProductRepository productRepository) {
        return args -> {
            
            Product product1 = new Product("Xbox 360");
            product1.setPrice(299.00);
            product1.setImage("http://localhost:8080/images/xbox360.jpg");
            productRepository.save(product1);
            
            Product product2 = new Product("Wii");
            product2.setPrice(269.00);
            product2.setImage("http://localhost:8080/images/wii.jpg");
            productRepository.save(product2);
            
            Product product3 = new Product("Wireless Controller");
            product3.setPrice(19.99);
            product3.setImage("http://localhost:8080/images/controller.jpg");
            productRepository.save(product3);
            
        };
    }
    
}
