import React, { use } from "react";
import SingleProduct from "./SingleProduct";

const Products = ({ productsPromise }) => {
  const products = use(productsPromise);
  console.log(products);

  return (
    <div>
      <h2 className="text-center text-6xl font-bold py-5 ">
        Our Latest Popular Products
      </h2>
      <div className="mx-auto w-11/12 grid grid-cols-3 gap-5 py-5 ">
        {products.map((product) => (
          <SingleProduct key={product.id} prduct={product}></SingleProduct>
        ))}
      </div>
    </div>
  );
};

export default Products;
