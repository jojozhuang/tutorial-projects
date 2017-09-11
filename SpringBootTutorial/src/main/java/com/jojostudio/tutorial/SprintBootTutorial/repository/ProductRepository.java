package com.jojostudio.tutorial.SprintBootTutorial.repository;

import org.springframework.data.repository.CrudRepository;

import com.jojostudio.tutorial.SprintBootTutorial.domain.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

}
