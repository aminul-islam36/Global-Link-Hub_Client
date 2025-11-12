import React, { useContext, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../Contexts/AuthContext";
import { FaRegClock, FaTruck } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";

const Details = () => {
  const { user } = useContext(AuthContext);
  const modalRef = useRef();
  const product = useLoaderData();
  const { name, price, origin_country, image, rating, available_quantity } =
    product;

  const [availableQuantity, setAvailableQuantity] =
    useState(available_quantity);
  const [importedQuantity, setImportedQuantity] = useState("");

  // ------------------------------------Open Modal Function --------------------------------------

  const importModalHandle = () => {
    modalRef.current.showModal();
  };

  // ------------------------------------Import Product Quantity Function --------------------------------------

  const importProductHandle = (e) => {
    e.preventDefault();

    const importQuantity = parseInt(e.target.quantity.value);
    console.log(importQuantity);
    setImportedQuantity(importQuantity);

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
    e.target.reset();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "successfully Imported !",
      showConfirmButton: false,
      timer: 3000,
    });
    const reminingQuantity = (product.available_quantity -= importQuantity);
    setAvailableQuantity(reminingQuantity);
  };
  return (
    <div>
      <div className="w-11/12 mx-auto py-12 my-5">
        <div className="card lg:card-side bg-base-200">
          {/* Product Image */}
          <figure className="lg:w-1/2 p-5">
            <img
              src={image}
              alt={name}
              className="rounded-xl w-auto max-w-full h-full object-cover"
            />
          </figure>

          {/* Product Details */}
          <div className="card-body gap-0 lg:w-1/2 p-0 lg:p-8">
            <h2 className="text-2xl lg:text-4xl font-bold">{name}</h2>
            <p className="text-xl font-semibold text-accent mt-2">
              <strong>Price : </strong>${price}
            </p>
            <p className="text-gray-600 text-lg mt-2">
              Origin: <span className="font-medium">{origin_country}</span>
            </p>
            <p className="text-gray-600 text-lg mt-1">
              Available Quantity:{" "}
              <span className="font-medium">{availableQuantity}</span>
            </p>
            <p className="text-gray-600 text-lg mt-1">
              Rating:{" "}
              <span className="font-medium text-yellow-500">{rating} ⭐</span>
            </p>
            <div className="delivary flex gap-2">
              {/* Delivery Time */}
              <div className="flex flex-col items-center text-center p-2 shadow rounded-lg bg-base-100">
                <FaTruck className="text-accent" size={22} />
                <h4 className="text-xs mt-1">Fast Delivery</h4>
              </div>

              {/* Shipping Info */}
              <div className="flex flex-col items-center text-center p-2 shadow rounded-lg bg-base-100">
                <FaRegClock className="text-accent" size={22} />
                <h4 className="text-xs mt-1">Free Shipping</h4>
              </div>

              {/* Return Policy */}
              <div className="flex flex-col items-center text-center p-2 shadow rounded-lg bg-base-100">
                <GoPlusCircle className="text-accent" size={22} />
                <h4 className="text-xs mt-1">Easy Returns</h4>
              </div>
            </div>

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

        <div className="mt-10 bg-base-100 p-0 lg:p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-3 text-accent">
            Product Description
          </h3>
          <p>
            At Global Link Hub, we provide fast, reliable, and secure
            transportation services designed to meet the needs of modern
            businesses and individuals. Our priority is ensuring that every
            shipment reaches its destination on time and in perfect condition.
            We understand that time and safety are crucial in logistics. why our
            operations are supported by advanced tracking systems, skilled
            drivers, and a well-maintained fleet to guarantee smooth and
            efficient delivery. From local distribution to international
            freight, we handle each shipment with care and precision.
            <span className="font-medium"> {origin_country}</span>.
          </p>
        </div>

        {/* ---------------------------------------Modal ------------------------------- */}

        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
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
                    onChange={(e) =>
                      setImportedQuantity(Number(e.target.value))
                    }
                    className="input w-full no-spinner focus:outline-0"
                    placeholder="type product quantity..."
                  />

                  <button
                    className="btn btn-accent text-white mt-4"
                    disabled={
                      importedQuantity !== "" &&
                      (importedQuantity < 0 ||
                        importedQuantity > availableQuantity)
                    }
                  >
                    Import your Product
                  </button>
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
