<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="Johnny.JSPTutorial.Beans.Product"%>
<%@page import="Johnny.JSPTutorial.Dao.ProductDao"%>
<%@page import="java.util.List"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
    String id = request.getParameter("id");
    String errmsg = "";
    String productname = "";
    String price = "";
    
    if (id == null || id.isEmpty()) {
        errmsg = "Invalid parameter!";
    } else {
        int productid = Integer.parseInt(id);
        if ("GET".equalsIgnoreCase(request.getMethod())) {
            Product product = ProductDao.getProduct(productid);
            productname = product.getProductName();
            price = Double.toString(product.getPrice());
        } else {
            productname = request.getParameter("productname");
            price = request.getParameter("price");

            if(productname == null || productname.isEmpty()){
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
                Product product = ProductDao.getProduct(productid);
                product.setProductName(productname);
                product.setPrice(dprice);
                // update
                ProductDao.update(product);
                response.sendRedirect("productlist.jsp");
            }
        }
    }
    
    pageContext.setAttribute("errmsg", errmsg);
    pageContext.setAttribute("id", id);
    pageContext.setAttribute("productname", productname);
    pageContext.setAttribute("price", price);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JSP Tutorial</title>
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
        <input class="form-control" id="productname" placeholder="Enter product name" name="productname" value="${productname}">
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