import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../Contexts/AuthContext";
import { Link } from "react-router-dom";

const MyImport = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/importedProducts?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [user?.email]);

  const deleteProductHandle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/importedProducts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const reminingProducts = products.filter((p) => p._id != id);
              setProducts(reminingProducts);
              Swal.fire({
                title: "Deleted!",
                text: "Your Product has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto pt-5">
      <div className="overflow-x-auto">
        {products.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-gray-600">
              No Products Available
            </h2>
            <p className="text-gray-500 mt-2">
              You haven't added any products yet. Add a product to see it here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Products Details</th>
                  <th>Rating</th>
                  <th>Seller</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {products.map((product, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td className="flex-1">
                      <div className="flex items-start gap-3">
                        <img
                          className="w-60 h-auto aspect-2/1 rounded-2xl shadow-sm object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                        <div>
                          <div className="font-bold text-lg">
                            {product.name}
                          </div>
                          <div className="text-sm">
                            <strong>Origin Country</strong> :{" "}
                            {product.origin_country}
                          </div>
                          <div className="flex gap-4">
                            {" "}
                            <div className="text-sm">
                              <strong>Price</strong> : {product.price}
                            </div>
                          </div>
                          <strong>Available quantity</strong> :{" "}
                          {product.available_quantity}
                        </div>
                      </div>
                    </td>
                    <td>
                      <strong>Rating</strong> : {product.rating}
                    </td>
                    <td>{user.displayName}</td>
                    <td>
                      <Link to={`/viewDetails/${product._id}`}>
                        <button className="btn btn-success">View Deails</button>
                      </Link>
                    </td>
                    <th>
                      <button
                        onClick={() => deleteProductHandle(product._id)}
                        className="btn btn-accent"
                      >
                        Remove
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyImport;
