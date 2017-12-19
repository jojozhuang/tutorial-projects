import React from 'react'

const ProductEdit = () => (
  <div className="container">
  <h2  >Create New Product</h2>
  <h2 >Edit Product</h2>
  <form className="form-horizontal" >
    <div className="form-group" >
      <label className="control-label col-sm-2" htmlFor="id">Product ID:</label>
      <div className="col-sm-10">
        <input className="form-control" disabled type="text" name="id" />
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="name">Product Name:</label>
      <div className="col-sm-10">
        <input className="form-control" placeholder="Enter product name" type="text" name="productName" />
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="price">Price:</label>
      <div className="col-sm-10">
          <input className="form-control" placeholder="Enter price" type="text" name="price" />
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="image">Image:</label>
      <div className="col-sm-10">
          <input type="hidden" name="image" />
          <img src="{{productForm.value.image}}" className="img-thumbnail" width="80" height="80" />
          <label className="btn btn-success" htmlFor="fileSelector">
              <input id="fileSelector" type="file" style={{display: 'none'}} />
              Choose Image
          </label>
          <span className='label label-info'></span>
          <span><button type="button" className="btn btn-primary" >Upload</button></span>
      </div>
    </div>
    <div className="form-group">
      <div className="col-sm-offset-2 col-sm-10">
        <input type="submit" className="btn btn-primary" value="Save" />
      </div>
    </div>
  </form>
</div>
)

export default ProductEdit