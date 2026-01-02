import React, { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaRegClock,
  FaTruck,
  FaGlobeAmericas,
  FaBoxOpen,
} from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Details = () => {
  const modalRef = useRef();
  const { user } = useAuth();
  const axiosURL = useAxios();
  const product = useLoaderData();
  const {
    name,
    price,
    origin_country,
    image,
    rating,
    available_quantity,
    description,
  } = product;

  const [availableQuantity, setAvailableQuantity] =
    useState(available_quantity);
  const [importedQuantity, setImportedQuantity] = useState("");

  const importModalHandle = () => modalRef.current.showModal();

  const importProductHandle = async (e) => {
    e.preventDefault();
    const importQuantity = parseInt(e.target.quantity.value);

    try {
      await axiosURL.put(`/products/quantity/${product._id}`, {
        quantity: importQuantity,
        user_email: user.email,
      });
      setAvailableQuantity((prev) => prev - importQuantity);
      Swal.fire({
        icon: "success",
        title: "Successfully Imported!",
        text: `${importQuantity} units added to your inventory.`,
        timer: 2000,
        showConfirmButton: false,
      });
      modalRef.current.close();
      e.target.reset();
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.log(err);
    }
  };

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      <Helmet>
        <title>{name} | Details</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb - Optional but professional */}
        <nav className="text-sm mb-6 text-gray-500">
          <span>Products</span> /{" "}
          <span className="text-accent font-semibold">{name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-base-200 rounded-3xl overflow-hidden  border border-base-300">
          {/* Left: Product Image Section */}
          <div className="relative group overflow-hidden bg-white flex items-center justify-center p-8">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="badge badge-accent p-4 text-white font-bold shadow-lg">
                New Arrival
              </span>
            </div>
          </div>

          {/* Right: Product Content Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-base-content">
                {name}
              </h1>
            </div>

            <div className="flex items-center mt-4 gap-4">
              <div className="rating rating-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    className={`mask mask-star-2 ${
                      star <= Math.round(rating)
                        ? "bg-yellow-400"
                        : "bg-gray-300"
                    }`}
                    readOnly
                  />
                ))}
              </div>
              <span className="text-sm font-medium opacity-70">
                ({rating} Customer Rating)
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-accent">${price}</span>
              <span className="text-lg opacity-60 line-through">
                ${(price * 1.2).toFixed(2)}
              </span>
            </div>

            <div className="divider my-6"></div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-y-4 mb-8">
              <div className="flex items-center gap-3">
                <FaGlobeAmericas className="text-accent" />
                <span className="text-sm italic">
                  Origin: <strong>{origin_country}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaBoxOpen className="text-accent" />
                <span className="text-sm">
                  Stock: <strong>{availableQuantity} units</strong>
                </span>
              </div>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: <FaTruck />, label: "Express" },
                { icon: <FaRegClock />, label: "24/7 Support" },
                { icon: <GoPlusCircle />, label: "Insurance" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-3 rounded-2xl bg-base-100 border border-base-300 transition-all hover:shadow-md"
                >
                  <span className="text-accent text-xl mb-1">{item.icon}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={importModalHandle}
              className="btn btn-accent btn-xl text-lg h-16 shadow-xl hover:shadow-accent/40 text-white border-none rounded-2xl"
              disabled={availableQuantity === 0}
            >
              {availableQuantity > 0 ? "Add to Inventory" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16 p-8 lg:p-12 rounded-3xl shadow-sm border border-base-200">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-accent rounded-full inline-block"></span>
            Product Overview
          </h3>
          <p className="text-lg leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Modal - Modernized */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box rounded-3xl p-8 max-w-md">
          <h2 className="text-2xl font-black mb-2 italic">Refill Stock</h2>
          <p className="text-sm opacity-70 mb-6">
            Enter the quantity you want to import from {origin_country}.
          </p>

          <form onSubmit={importProductHandle} className="space-y-6">
            <div className="form-control">
              <input
                type="number"
                name="quantity"
                required
                max={availableQuantity}
                min="1"
                onChange={(e) => setImportedQuantity(Number(e.target.value))}
                className="input w-full text-center font-bold text-lg no-spinner focus:outline-0"
                placeholder="0"
              />
              <label className="label">
                <span className="label-text-alt text-error font-semibold">
                  Max allowed: {availableQuantity}
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => modalRef.current.close()}
                className="btn btn-ghost flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-accent flex-[2] text-white"
                disabled={
                  !importedQuantity ||
                  importedQuantity < 1 ||
                  importedQuantity > availableQuantity
                }
              >
                Confirm Import
              </button>
            </div>
          </form>
        </div>
        <form
          method="dialog"
          className="modal-backdrop bg-black/40 backdrop-blur-sm"
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Details;
