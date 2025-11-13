import React, { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import { LuCirclePlus } from "react-icons/lu";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AddProduct = () => {
  const { user } = useContext(AuthContext);

  const addNewProductHandle = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productRUL = form.productRUL.value;
    const productPrice = form.productPrice.value;
    const originCountry = form.originCountry.value;
    const rating = form.rating.value;
    const quantity = form.quantity.value;
    const newProduct = {
      name: productName,
      image: productRUL,
      price: productPrice,
      origin_country: originCountry,
      rating,
      available_quantity: quantity,
      created_At: new Date(),
      seller_email: user.email,
    };

    fetch("https://global-link-hub.vercel.app/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          form.reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your product has been added",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="hero bg-base-200 py-5 lg:py-20">
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <div className="card bg-base-100 w-full max-w-120 shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-center font-semibold text-xl">
            Add New Product For Selling{" "}
          </h2>
          <form onSubmit={addNewProductHandle}>
            <fieldset className="fieldset  *:w-full">
              {/* Product Name  */}
              <label className="label">Product Name</label>
              <input
                type="text"
                required
                name="productName"
                className="input"
                placeholder="Product Name..."
              />
              {/* Product Image  */}
              <label className="label">Product Image</label>
              <input
                type="text"
                required
                name="productRUL"
                className="input"
                placeholder="Product Image..."
              />

              {/* Product Price  */}

              <label className="label">Product Price</label>
              <input
                type="number"
                required
                name="productPrice"
                className="input no-spinner"
                placeholder="Product Price..."
              />

              {/* Product Origin Country  */}
              <label className="label">Origin Country</label>
              <input
                type="text"
                required
                name="originCountry"
                className="input"
                placeholder="Origin Country"
              />

              {/* Product Rating  */}
              <label className="label">Product Rating</label>
              <input
                type="number"
                required
                name="rating"
                min="0"
                step="0.01"
                className="input no-spinner"
                placeholder="product quality"
              />
              {/* Product Available quantity  */}

              <label className="label">Available quantity</label>
              <input
                type="number"
                name="quantity"
                className="input no-spinner"
                placeholder="Available quantity"
              />

              <button className="btn btn-accent text-white mt-4">
                Add New Product <LuCirclePlus />
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
