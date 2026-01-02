import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import { Helmet } from "react-helmet-async";
import PCard from "../Components/PCard";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";

const AllProducts = () => {
  const axiosURL = useAxios();
  const [searchProduct, setSearchProduct] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosURL.get("/products");
      return res.data;
    },
  });

  const searchValue = (e) => {
    const search = e.target.value;
    setSearchProduct(search);
  };

  const filtaredProducts = products.filter((product) => {
    const searchValue = searchProduct.toLowerCase().trim();
    return product.name.toLowerCase().trim().includes(searchValue);
  });
  return (
    <div className="mx-auto w-11/12">
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <div className="flex gap-5 mt-5 lg:mt-10 flex-col md:flex-row justify-between border-b border-b-accent/30 pb-2">
        <h1 className=" font-bold text-2xl md:text-4xl lg:text-5xl text-accent ">
          All Products : {filtaredProducts.length}
        </h1>
        <input
          className="focus:outline-0 input"
          type="search"
          value={searchProduct}
          onChange={searchValue}
          placeholder="Search"
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 ">
          {filtaredProducts.length > 0 ? (
            filtaredProducts.map((product) => (
              <PCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3 text-xl">
              No products found 😢
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
