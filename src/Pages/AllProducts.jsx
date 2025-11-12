import React, { useEffect, useState } from "react";
import SingleProduct from "../Components/SingleProduct";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  const searchValue = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    setSearchProduct(searchValue);
  };

  const filtaredProducts = products.filter((product) => {
    const searchValue = searchProduct.toLowerCase().trim();
    return product.name.toLowerCase().trim().includes(searchValue);
  });
  return (
    <div className="mx-auto w-11/12">
      <div className="flex justify-between border-b border-b-accent/30 pb-2">
        <h1 className=" font-bold text-2xl md:text-4xl lg:text-5xl text-accent ">
          All Products : {filtaredProducts.length}
        </h1>
        <input
          className="focus:outline-0 input"
          type="search"
          required
          value={searchProduct}
          onChange={searchValue}
          placeholder="Search"
        />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 ">
        {filtaredProducts.length > 0 ? (
          filtaredProducts.map((singleProduct) => (
            <SingleProduct
              key={singleProduct._id}
              singleProduct={singleProduct}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3 text-xl">
            No products found 😢
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
