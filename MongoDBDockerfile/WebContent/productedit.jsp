<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="johnny.mongodbtutorial.model.Product"%>
<%@page import="johnny.mongodbtutorial.dao.ProductDao"%>
<%@page import="java.util.List"%>
<%@page import="com.mongodb.MongoClient"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
    String id = request.getParameter("id");
    String errmsg = "";
    String name = "";
    String price = "";
    
    if (id == null || id.isEmpty()) {
        errmsg = "Invalid parameter!";
    } else {
        MongoClient mongo = (MongoClient) request.getServletContext()
                .getAttribute("MONGO_CLIENT");
        ProductDao productDao = new ProductDao(mongo);
        if ("GET".equalsIgnoreCase(request.getMethod())) {
            Product product = productDao.getProduct(id);
            name = product.getName();
            price = Double.toString(product.getPrice());
        } else {
            name = request.getParameter("name");
            price = request.getParameter("price");

            if(name == null || name.isEmpty()){
                errmsg = "Product name can't be empty!";
            }else if(price == null || price.isEmpty()){
                errmsg = "Price can't be empty!";
            }

            double dprice = 0.0;
            if (errmsg.isEmpty()) {
                try {
                    dprice = Double.parseDouble(price);
                } catch (NumberFormatException nfe) {
                    errmsg = "Price must be number!";
                }
                Product product = productDao.getProduct(id);
                product.setName(name);
                product.setPrice(dprice);
                // update
                productDao.update(product);
                response.sendRedirect("productlist.jsp");
            }
        }
    }
    
    pageContext.setAttribute("errmsg", errmsg);
    pageContext.setAttribute("id", id);
    pageContext.setAttribute("name", name);
    pageContext.setAttribute("price", price);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>MongoDB Tutorial</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<jsp:include page="header.jsp" />
<div class="container">
  <h2>Edit Product</h2>
  <h3 style='color:red'>${errmsg}</h3>
  <form class="form-horizontal" action="productedit.jsp?id=${id}" method="Post">
    <input type="hidden" name="id" value="${id}">
    <div class="form-group">
      <label class="control-label col-sm-2" for="email">Product Name:</label>
      <div class="col-sm-10">
        <input class="form-control" id="name" placeholder="Enter product name" name="name" value="${name}">
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" for="pwd">Price:</label>
      <div class="col-sm-10">
        <input class="form-control" id="price" placeholder="Enter price" name="price" value="${price}">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>
  </form>
</div>
</body>
</html>