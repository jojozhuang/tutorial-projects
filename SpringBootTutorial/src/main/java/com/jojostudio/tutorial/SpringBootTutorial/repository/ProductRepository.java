package com.jojostudio.tutorial.SpringBootTutorial.repository;

import org.springframework.data.repository.CrudRepository;

import com.jojostudio.tutorial.SpringBootTutorial.domain.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

}
