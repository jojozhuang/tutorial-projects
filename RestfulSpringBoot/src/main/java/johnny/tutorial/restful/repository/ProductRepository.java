package johnny.tutorial.restful.repository;

import org.springframework.data.repository.CrudRepository;

import johnny.tutorial.restful.domain.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

}
