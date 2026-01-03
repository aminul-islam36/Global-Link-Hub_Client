import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import {
  FaRegClock,
  FaTruck,
  FaGlobeAmericas,
  FaBoxOpen,
} from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Loader from "../Components/Loader";

const Details = () => {
  const modalRef = useRef();
  const { id } = useParams();
  const { user } = useAuth();
  const axiosURL = useAxios();

  const [importQty, setImportQty] = useState(0);

  /* =========================
     FETCH SINGLE PRODUCT
  ========================== */
  const {
    data: product,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["product", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosURL.get(`/products/${id}`);
      return res.data;
    },
  });

  /* =========================
     LOADING & ERROR STATES
  ========================== */
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error text-lg">
          {error?.message || "Failed to load product"}
        </p>
      </div>
    );
  }

  /* =========================
     HANDLERS
  ========================== */
  const openModal = () => modalRef.current.showModal();

  const handleImport = async (e) => {
    e.preventDefault();
    try {
      await axiosURL.put(`/products/quantity/${product._id}`, {
        quantity: importQty,
        user_email: user?.email,
      });

      Swal.fire({
        icon: "success",
        title: "Stock Updated!",
        text: `${importQty} units added successfully`,
        timer: 1800,
        showConfirmButton: false,
      });

      // Refetch product after update
      refetch();

      modalRef.current.close();
      setImportQty(0);
    } catch (err) {
      Swal.fire(`"Error", "Failed to update stock", "error" ${err}`);
    }
  };

  /* =========================
     UI
  ========================== */
  return (
    <div className="bg-base-100 min-h-screen pb-20">
      <Helmet>
        <title>{product.name} | Details</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 opacity-70">
          <Link to={-1}>Products</Link> /{" "}
          <span className="text-accent">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 bg-base-200 rounded-3xl border border-base-300 overflow-hidden">
          {/* IMAGE */}
          <div className="bg-white p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[400px] object-contain"
            />
          </div>

          {/* INFO */}
          <div className="p-8 flex flex-col">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="rating rating-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    readOnly
                    className={`mask mask-star-2 ${
                      star <= Math.round(product.rating)
                        ? "bg-yellow-400"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm opacity-70">({product.rating})</span>
            </div>

            {/* Price */}
            <div className="mt-5 flex gap-3 items-center">
              <span className="text-xl lg:text-3xl font-bold text-accent">
                ৳{product.price}
              </span>
              <span className="line-through opacity-60">
                ৳{(product.price * 1.1).toFixed(2)}
              </span>
            </div>

            <div className="divider my-6" />

            {/* Meta */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <FaGlobeAmericas className="text-accent" />
                <span>{product.origin_country}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaBoxOpen className="text-accent" />
                <span>{product.availableQuantity} in stock</span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: <FaTruck />, label: "Fast Delivery" },
                { icon: <FaRegClock />, label: "24/7 Support" },
                { icon: <GoPlusCircle />, label: "Insurance" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center bg-base-100 p-3 rounded-xl border"
                >
                  <span className="text-accent text-xl">{item.icon}</span>
                  <span className="text-xs mt-1">{item.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={openModal}
              disabled={product.availableQuantity === 0}
              className="btn btn-accent text-white h-14"
            >
              {product.availableQuantity > 0
                ? "Add to Inventory"
                : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-14 p-8 border rounded-3xl">
          <h3 className="text-2xl font-bold mb-4">Product Overview</h3>
          <p className="leading-relaxed opacity-80">{product.description}</p>
        </div>
      </div>

      {/* MODAL */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box rounded-3xl">
          <h2 className="text-xl font-bold mb-4">Import Stock</h2>

          <form onSubmit={handleImport} className="space-y-4">
            <input
              type="number"
              min={1}
              max={product.availableQuantity}
              required
              value={importQty}
              onChange={(e) => setImportQty(Number(e.target.value))}
              className="input w-full text-center no-spinner"
              placeholder="Quantity"
            />

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
                className="btn btn-accent text-white flex-1"
                disabled={
                  importQty < 1 || importQty > product.availableQuantity
                }
              >
                Confirm
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button />
        </form>
      </dialog>
    </div>
  );
};

export default Details;
