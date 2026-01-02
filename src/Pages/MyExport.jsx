import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { Helmet } from "react-helmet-async";
import Loader from "../Components/Loader";
import { useForm } from "react-hook-form";

const MyExport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef();
  const { user, loading } = useAuth();
  const axiosURL = useAxios();
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [editOldProduct, setEditOldProduct] = useState();
  useEffect(() => {
    if (!user?.email) return;
    axiosURL.get(`/products?email=${user.email}`).then((res) => {
      setProducts(res.data);
      setIsLoading(false);
    });
  }, [user.email, axiosURL]);

  const deleteProductHandle = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const res = await axiosURL.delete(`products/${id}`);
      if (res.data.deletedCount) {
        const reminingProducts = products.filter((p) => p._id != id);
        setProducts(reminingProducts);
        Swal.fire({
          title: "Deleted!",
          text: "Your Product has been deleted.",
          icon: "success",
        });
      }
    }
  };

  const editProductHandle = (product) => {
    modalRef.current.showModal();
    setEditOldProduct(product);
  };

  const updateProductHandle = async (data) => {
    const updateProduct = {
      name: data.productName,
      image: data.productRUL,
      price: data.productPrice,
      origin_country: data.originCountry,
      rating: data.rating,
      available_quantity: data.quantity,
      created_At: new Date(),
      buyer_email: user.email,
    };

    const res = await axiosURL.put(
      `/products/${editOldProduct?._id}`,
      updateProduct
    );
    if (res.data.modifiedCount) {
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
  };

  //----------- DownLoad CSV------------

  const csvDownloadHandle = () => {
    // --------------CSV header----------------
    const headers = ["Name", "Price", "Quantity", "Origin Country", "Rating"];

    // --------------------------------CSV rows----------------

    const rows = products.map((product) => [
      `"${product.name}"`,
      product.price,
      product.available_quantity,
      `"${product.origin_country}"`,
      product.rating,
    ]);

    //  ---------------------------------- CSV Content -------------------------

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    // ----------------------------------------Blobl Create --------------------------------

    const blob = new Blob([csvContent], { type: "text/csv" });

    // ---------------------------Link Create ------------------------------

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `products-${new Date().toISOString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-11/12 mx-auto pt-5">
      <Helmet>
        <title>My Export</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          {products.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-2xl lg:text-4xl font-semibold text-accent mb-2 border-b border-b-accent pb-5">
                No Products Available
              </h2>
              <p className="text-gray-500 mt-2">
                You haven't added any products yet. Add a product to see it
                here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto overflow-y-hidden">
              <div className="flex justify-between py-5  border-b border-b-accent mb-5 ">
                <h2 className="text-2xl text-accent">
                  My All Exports - {products.length}
                </h2>
                <button
                  className="btn btn-accent text-white"
                  onClick={csvDownloadHandle}
                >
                  Download All
                </button>
              </div>
              <table className="table">
                <tbody>
                  {/* row 1 */}

                  {products.map((product) => (
                    <tr
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-offset="100"
                      key={product._id}
                      className="grid grid-cols-2 md:table"
                    >
                      <td className="lg:max-w-2/12 lg:w-full">
                        <img
                          className="w-full max-w-[250px] h-auto aspect-2/1 rounded-2xl shadow-sm object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </td>
                      <td className="lg:max-w-6/12 lg:w-full">
                        <div>
                          <h2 className="md:text-lg md:font-semibold">
                            {product.name}
                          </h2>
                          <h3 className="text-sm">
                            <strong>Origin Country</strong> :{" "}
                            {product.origin_country}
                          </h3>
                          <h3 className="text-sm">
                            <strong>Price</strong> : {product.price}
                          </h3>
                          <h2>
                            <strong>Available quantity</strong> :{" "}
                            {product.available_quantity}
                          </h2>
                          <h2>
                            <strong>Rating</strong> : {product.rating}
                          </h2>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => editProductHandle(product)}
                          className="btn btn-success text-white"
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteProductHandle(product._id)}
                          className="btn btn-accent text-white"
                        >
                          Delete <RiDeleteBin6Fill />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

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
                <form onSubmit={handleSubmit(updateProductHandle)}>
                  <fieldset className="fieldset  *:w-full">
                    {/* Product Name  */}
                    <label className="label">Product Name</label>
                    <input
                      type="text"
                      {...register("productName")}
                      className="input"
                      defaultValue={editOldProduct?.name}
                      placeholder="Product Name..."
                    />
                    {/* Product Image URL  */}
                    <label className="label">Product Image</label>
                    <input
                      type="text"
                      {...register("productRUL")}
                      defaultValue={editOldProduct?.image}
                      className="input"
                      placeholder="Product Image..."
                    />

                    {/* Product Price  */}

                    <label className="label">Product Price</label>
                    <input
                      type="number"
                      {...register("productPrice")}
                      defaultValue={editOldProduct?.price}
                      className="input no-spinner"
                      placeholder="Product Price..."
                    />

                    {/* Product  Origin Country  */}
                    <label className="label">Origin Country</label>
                    <input
                      type="text"
                      {...register("originCountry")}
                      className="input"
                      defaultValue={editOldProduct?.origin_country}
                      placeholder="Origin Country"
                    />

                    {/* Product Rating  */}
                    <label className="label">Product Rating</label>
                    <input
                      type="number"
                      {...register("rating")}
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
                      {...register("quantity")}
                      defaultValue={editOldProduct?.available_quantity}
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
