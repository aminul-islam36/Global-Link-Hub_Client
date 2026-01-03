import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { Helmet } from "react-helmet-async";
import Loader from "../Components/Loader";
import { useQuery } from "@tanstack/react-query";
import PUModal from "../Components/PUModal";

const MyExport = () => {
  const { user } = useAuth();
  const axiosURL = useAxios();
  const modalRef = useRef();
  const [edit, setEdit] = useState();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", user.email],
    enabled: !!user.email,
    queryFn: async () => {
      const res = await axiosURL.get(`/products?email=${user.email}`);
      return res.data;
    },
  });
  const products = data?.result || [];
  const total = data?.total || 0;
  const handleDelete = async (id) => {
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
      if (res.data?.deletedCount) {
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your Product has been deleted.",
          icon: "success",
        });
      }
    }
  };

  const handleEdit = (product) => {
    modalRef.current.showModal();
    setEdit(product);
  };

  //----------- DownLoad CSV------------
  const csvDownloadHandle = () => {
    // --------------CSV header----------------
    const headers = ["Name", "Price", "Quantity", "Origin Country", "Rating"];

    // --------------------------------CSV rows----------------

    const rows = products.map((product) => [
      `"${product.name}"`,
      product.price,
      product.availableQuantity,
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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-11/12 mx-auto pt-5">
      <Helmet>
        <title>My Export</title>
      </Helmet>
      <div className="overflow-x-auto">
        {products.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl lg:text-4xl font-semibold text-accent mb-2 border-b border-b-accent pb-5">
              No Products Available
            </h2>
            <p className="text-gray-500 mt-2">
              You haven't added any products yet. Add a product to see it here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-hidden">
            <div className="flex justify-between py-5  border-b border-b-accent mb-5 ">
              <h2 className="text-2xl text-accent">My All Exports- {total}</h2>
              <button
                className="btn btn-accent text-white"
                onClick={csvDownloadHandle}
              >
                Download All
              </button>
            </div>
            <table className="table">
              <tbody>
                {products.map((product) => (
                  <tr
                    data-aos="flip-up"
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
                          {product.availableQuantity}
                        </h2>
                        <h2>
                          <strong>Rating</strong> : {product.rating}
                        </h2>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn btn-success text-white"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(product._id)}
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
      <PUModal
        modalRef={modalRef}
        edit={edit}
        axiosURL={axiosURL}
        user={user}
        refetch={refetch}
      />
    </div>
  );
};

export default MyExport;
