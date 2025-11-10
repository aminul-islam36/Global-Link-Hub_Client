import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import Loading from "../Components/Loading";
import Swal from "sweetalert2";

const MyExport = () => {
  const { user } = useContext(AuthContext);
  const modalRef = useRef();
  const [products, setProducts] = useState([]);
  const [editOldProduct, setEditOldProduct] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/products?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [user.email]);

  const deleteProductHandle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const reminingProducts = products.filter((p) => p._id != id);
              setProducts(reminingProducts);
              Swal.fire({
                title: "Deleted!",
                text: "Your Product has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const editProductHandle = (product) => {
    modalRef.current.showModal();
    setEditOldProduct(product);
  };

  const updateProductHandle = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productRUL = form.productRUL.value;
    const productPrice = form.productPrice.value;
    const originCountry = form.originCountry.value;
    const rating = form.rating.value;
    const quantity = form.quantity.value;
    const updateProduct = {
      name: productName,
      image: productRUL,
      price: productPrice,
      origin_country: originCountry,
      rating,
      available_quantity: quantity,
      created_At: new Date(),
      buyer_email: user.email,
    };

    fetch(`http://localhost:5000/products/${editOldProduct?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          const updatedProducts = products.map((product) =>
            product._id === editOldProduct._id
              ? { ...product, ...updateProduct }
              : product
          );
          setProducts(updatedProducts);
        }

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        modalRef.current.close();
        console.log("data Updated ", data);
      });
    console.log(updateProduct);
  };
  return (
    <div className="w-11/12 mx-auto pt-5">
      <div className="overflow-x-auto">
        {products.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-gray-600">
              No Products Available
            </h2>
            <p className="text-gray-500 mt-2">
              You haven't added any products yet. Add a product to see it here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Products Details</th>
                  <th>Rating</th>
                  <th>Seller</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {products.map((product, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td className="flex-1">
                      <div className="flex items-start gap-3">
                        <img
                          className="w-60 h-auto aspect-2/1 rounded-2xl shadow-sm object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                        <div>
                          <div className="font-bold text-lg">
                            {product.name}
                          </div>
                          <div className="text-sm">
                            <strong>Origin Country</strong> :{" "}
                            {product.origin_country}
                          </div>
                          <div className="flex gap-4">
                            {" "}
                            <div className="text-sm">
                              <strong>Price</strong> : {product.price}
                            </div>
                          </div>
                          <strong>Available quantity</strong> :{" "}
                          {product.available_quantity}
                        </div>
                      </div>
                    </td>
                    <td>
                      <strong>Rating</strong> : {product.rating}
                    </td>
                    <td>{user.displayName}</td>
                    <td>
                      <button
                        onClick={() => editProductHandle(product)}
                        className="btn btn-success"
                      >
                        Update
                      </button>
                    </td>
                    <th>
                      <button
                        onClick={() => deleteProductHandle(product._id)}
                        className="btn btn-accent"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --------------------------Modal---------------------------------------------  */}
      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          {/* --------------------------modal Body---------------------------------------------  */}
          <div className="hero bg-base-200">
            <div className="card bg-base-100 w-full max-w-120 shrink-0">
              <div className="card-body">
                <h2 className="text-center font-semibold text-xl">
                  Update YourProduct
                </h2>
                <form onSubmit={updateProductHandle}>
                  <fieldset className="fieldset  *:w-full">
                    {/* Product Name  */}
                    <label className="label">Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      className="input"
                      defaultValue={editOldProduct?.name}
                      placeholder="Product Name..."
                    />
                    {/* Product Image URL  */}
                    <label className="label">Product Image</label>
                    <input
                      type="text"
                      name="productRUL"
                      defaultValue={editOldProduct?.image}
                      className="input"
                      placeholder="Product Image..."
                    />

                    {/* Product Price  */}

                    <label className="label">Product Price</label>
                    <input
                      type="number"
                      name="productPrice"
                      defaultValue={editOldProduct?.price}
                      className="input no-spinner"
                      placeholder="Product Price..."
                    />

                    {/* Product  Origin Country  */}
                    <label className="label">Origin Country</label>
                    <input
                      type="text"
                      name="originCountry"
                      className="input"
                      defaultValue={editOldProduct?.origin_country}
                      placeholder="Origin Country"
                    />

                    {/* Product Rating  */}
                    <label className="label">Product Rating</label>
                    <input
                      type="number"
                      name="rating"
                      min="0"
                      step="0.01"
                      defaultValue={editOldProduct?.rating}
                      className="input no-spinner"
                      placeholder="product quality"
                    />

                    {/* Product  Available quantity  */}
                    <label className="label">Available quantity</label>
                    <input
                      type="number"
                      defaultValue={editOldProduct?.available_quantity}
                      name="quantity"
                      className="input no-spinner"
                      placeholder="Available quantity"
                    />

                    <button className="btn btn-accent text-white mt-4">
                      Update Product
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>

          {/* modal body end  */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cencel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyExport;
