import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import { Helmet } from "react-helmet-async";
import PCard from "../Components/PCard";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import Title from "../utilities/Title";

const AllProducts = () => {
  const axiosURL = useAxios();
  const [searchProduct, setSearchProduct] = useState("");
  const [page, setPage] = useState(0);
  const limit = 10;
  const skip = page * limit;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const res = await axiosURL.get(`/products?limit=${limit}&skip=${skip}`);
      return res.data;
    },
  });
  const products = data?.result || [];
  const total = data?.total;
  const totalPage = Math.ceil(total / limit);
  const searchValue = (e) => {
    const search = e.target.value;
    setSearchProduct(search);
    setPage(0);
  };

  const filteredProducts = products.filter((product) => {
    const searchValue = searchProduct.toLowerCase().trim();
    return product.name.toLowerCase().trim().includes(searchValue);
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isError)
    return <p className="text-center text-red-500">Something went wrong</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <div className="flex gap-5 mt-5 lg:mt-10 flex-col md:flex-row justify-between border-b border-b-accent/30 pb-2">
        <Title>All Products : {total}</Title>
        <input
          className="focus:outline-0 input"
          type="search"
          value={searchProduct}
          onChange={searchValue}
          placeholder="Search"
        />
      </div>
      <div className="py-5">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <PCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3 text-xl">
              No products found 😢
            </p>
          )}
        </div>
        <div className="flex justify-center gap-2 mt-1">
          {[...Array(totalPage).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`btn ${
                page === p ? "btn-accent text-white" : "btn-outline"
              }`}
            >
              {p + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
