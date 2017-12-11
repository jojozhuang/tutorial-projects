package johnny.tutorial.RestfulSpringBoot.repository;

import org.springframework.data.repository.CrudRepository;

import johnny.tutorial.RestfulSpringBoot.domain.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

}
