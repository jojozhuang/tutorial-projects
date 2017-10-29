package johnny.tutorial.SpringBootTutorial.repository;

import org.springframework.data.repository.CrudRepository;

import johnny.tutorial.SpringBootTutorial.domain.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

}
