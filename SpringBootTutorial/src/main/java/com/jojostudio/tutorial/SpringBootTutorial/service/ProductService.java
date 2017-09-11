package com.jojostudio.tutorial.SpringBootTutorial.service;

import com.jojostudio.tutorial.SpringBootTutorial.domain.Product;

public interface ProductService {
    Iterable<Product> list();
    
    Product create(Product product);
    
    Product read(long id);
    
    Product update(long id, Product product);
    
    void delete(long id);
}
