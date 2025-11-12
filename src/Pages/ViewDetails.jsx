import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const ViewDetails = () => {
  const product = useLoaderData();

  const {
    user_email,
    imported_quantity,
    origin_country,
    image,
    rating,
    price,
    name,
  } = product;
  console.log(product);

  return (
    <div className="mx-auto w-11/12">
      <div className="w-11/12 md:w-9/12 mx-auto py-12">
        <div className="bg-base-200">
          {/* Product Image */}
          <figure className="">
            <img
              src={image}
              alt={name}
              className="rounded-xl w-full h-full object-cover"
            />
          </figure>

          {/* Product Details */}
          <div className="text-center space-y-2 mt-5">
            <h2 className="text-4xl font-bold">Product Name : {name}</h2>
            <p className="text-2xl font-bold text-accent">
              Product Price : ${price}
            </p>
            <p className="text-gray-600 text-lg">
              Origin Country:{" "}
              <span className="font-medium">{origin_country}</span>
            </p>
            <p className="text-gray-600 text-lg">
              Imported Quantity:{" "}
              <span className="font-medium">{imported_quantity}</span>
            </p>
            <p className="text-gray-600 text-lg">
              Product Rating:{" "}
              <span className="font-medium text-yellow-500">{rating} ⭐</span>
            </p>

            <Link
              to="/myImport"
              className="btn btn-accent btn-lg text-white w-full md:max-w-1/2 md:w-[400px]"
            >
              Back to My Import Page
            </Link>
          </div>
        </div>

        <div className="mt-10 bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3">Product Description</h3>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum metus ut orci lacinia, nec facilisis sapien ullamcorper.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. This
            product is high quality and comes directly from{" "}
            <span className="font-medium">{name}</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
