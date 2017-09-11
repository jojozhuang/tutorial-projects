package com.jojostudio.tutorial.SprintBootTutorial.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jojostudio.tutorial.SprintBootTutorial.domain.Product;
import com.jojostudio.tutorial.SprintBootTutorial.repository.ProductRepository;

@RestController
@RequestMapping("/products")
public class ProductController {
    ProductRepository productRepository;
    
    @Autowired
    public ProductController(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @RequestMapping("/")
    public Iterable<Product> list(){
        return productRepository.findAll();
    }
    
    @RequestMapping("/{id}")
    public Product read(@PathVariable(value="id") long id){
        return productRepository.findOne(id);
    }
}
