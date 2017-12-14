package johnny.tutorial.restfulspringboot.repository;

import org.springframework.data.repository.CrudRepository;

import johnny.tutorial.restfulspringboot.domain.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

}
