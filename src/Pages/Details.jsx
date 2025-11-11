import React, { useContext, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../Contexts/AuthContext";

const Details = () => {
  const { user } = useContext(AuthContext);
  const modalRef = useRef();
  const product = useLoaderData();
  const { name, price, origin_country, image, rating, available_quantity } =
    product;

  const [quantity, setQuantity] = useState(available_quantity);

  // ------------------------------------Open Modal Function --------------------------------------

  const importModalHandle = () => {
    modalRef.current.showModal();
  };

  // ------------------------------------Import Product Quantity Function --------------------------------------

  const importProductHandle = (e) => {
    e.preventDefault();

    const importQuantity = parseInt(e.target.quantity.value);
    console.log(importQuantity);

    fetch(`http://localhost:5000/products/quantity/${product._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        quantity: importQuantity,
        user_email: user.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data has been updated", data);
      });

    modalRef.current.close();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "successfully Imported !",
      showConfirmButton: false,
      timer: 3000,
    });
    const reminingQuantity = (product.available_quantity -= importQuantity);
    setQuantity(reminingQuantity);
  };
  return (
    <div>
      <div className="w-11/12 md:w-9/12 mx-auto py-12">
        <div className="card lg:card-side bg-base-200 shadow-xl">
          {/* Product Image */}
          <figure className="lg:w-1/2 p-5">
            <img
              src={image}
              alt={name}
              className="rounded-xl w-auto max-w-full h-full object-cover"
            />
          </figure>

          {/* Product Details */}
          <div className="card-body lg:w-1/2 p-8">
            <h2 className="card-title text-4xl font-bold">{name}</h2>
            <p className="text-gray-600 text-lg mt-2">
              Origin: <span className="font-medium">{origin_country}</span>
            </p>
            <p className="text-gray-600 text-lg mt-1">
              Available Quantity:{" "}
              <span className="font-medium">{quantity}</span>
            </p>
            <p className="text-gray-600 text-lg mt-1">
              Rating:{" "}
              <span className="font-medium text-yellow-500">{rating} ⭐</span>
            </p>
            <p className="text-3xl font-bold text-accent mt-4">${price}</p>

            <div className="card-actions mt-6">
              <button
                onClick={importModalHandle}
                className="btn btn-accent btn-lg text-white w-full"
              >
                Import Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3">Product Description</h3>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum metus ut orci lacinia, nec facilisis sapien ullamcorper.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. This
            product is high quality and comes directly from{" "}
            <span className="font-medium">{origin_country}</span>.
          </p>
        </div>

        {/* ---------------------------------------Modal ------------------------------- */}

        <dialog
          ref={modalRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="card-body p-0">
              <h2 className="card-title text-2xl font-bold"> {name}</h2>
              <form onSubmit={importProductHandle}>
                <fieldset className="fieldset">
                  <label className="label">
                    How many product you want to import ?{" "}
                  </label>
                  <input
                    type="number"
                    required
                    name="quantity"
                    max={available_quantity}
                    className="input w-full no-spinner"
                    placeholder="type product quantity..."
                  />

                  <button className="btn btn-neutral mt-4">Import</button>
                </fieldset>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Cencel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Details;
