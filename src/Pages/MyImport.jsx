import React, { useState } from "react";
import Swal from "sweetalert2";
import { IoIosRemoveCircle } from "react-icons/io";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { Helmet } from "react-helmet-async";
import ProductQuickViewModal from "../Components/ProductQuickViewModal";
import Loader from "../Components/Loader";
import { useQuery } from "@tanstack/react-query";
import Title from "../utilities/Title";

const MyImport = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const axiosURL = useAxios();

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["importedProducts"],
    queryFn: async () => {
      const res = await axiosURL.get(`/importedProducts?email=${user.email}`);
      return res.data;
    },
  });

  //  Quick View Handler
  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  //  Delete Handler
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    });

    if (result.isConfirmed) {
      const res = await axiosURL.delete(`importedProducts/${id}`);
      if (res.data.deletedCount) {
        Swal.fire("Removed!", "Your product has been removed.", "success");
        refetch();
      }
    }
  };

  return (
    <div className="w-11/12 mx-auto pt-5 overflow-x-hidden">
      <Helmet>
        <title>My Import</title>
      </Helmet>

      {isLoading ? (
        <Loader />
      ) : products.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-gray-600">
            No Products Available
          </h2>
          <p className="text-gray-500 mt-2">
            You haven't added any products yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Title>My All Imports - {products.length} </Title>
          <table className="table">
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="grid grid-cols-2 md:table">
                  <td className="lg:max-w-2/12 lg:w-full">
                    <img
                      className="w-full max-w-[250px] h-auto aspect-2/1 rounded-2xl shadow-sm object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </td>

                  <td className="lg:max-w-6/12 lg:w-full">
                    <h2 className="font-bold md:text-lg">
                      {product.name.slice(0, 35) + "..."}
                    </h2>
                  </td>

                  <td>
                    <button
                      onClick={() => handleQuickView(product)}
                      className="btn btn-success text-white"
                    >
                      Quick View
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-accent text-white"
                    >
                      Remove <IoIosRemoveCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/*  Modal */}
      {isModalOpen && (
        <ProductQuickViewModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyImport;
