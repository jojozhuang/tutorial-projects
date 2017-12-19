import React from 'react'

const ProductList = () => (
  <div className="container">
    <h2>Products</h2>
    <p>Data from Restful API</p>

    <table className="table">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Image</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody >
          <tr>
            <td>1</td>
            <td>Xbox</td>
            <td>299.99</td>
            <td><img src="" className="img-thumbnail" width="80" height="80"/></td>
            <td><a className="btn btn-success" >Edit</a>&nbsp;<a className="btn btn-danger" >Delete</a></td>
          </tr>
      </tbody>
    </table>
  </div>
)

export default ProductList
