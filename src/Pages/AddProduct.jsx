import { LuCirclePlus } from "react-icons/lu";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosURL = useAxios();

  const handleProduct = async (data) => {
    const newProduct = {
      name: data.productName,
      image: data.productRUL,
      price: Number(data.productPrice),
      origin_country: data.originCountry,
      rating: Number(data.rating),
      available_quantity: Number(data.quantity),
      created_At: new Date(),
      seller_email: user.email,
      description: data.textarea,
    };

    const res = await axiosURL.post("/products", newProduct);
    if (res.data.insertedId) {
      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your product has been added",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="hero bg-base-200 py-5 lg:py-20">
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <div className="card bg-base-100 w-full max-w-120 shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-center font-semibold text-xl">
            Add New Product For Selling{" "}
          </h2>
          <form onSubmit={handleSubmit(handleProduct)}>
            <fieldset className="fieldset  *:w-full">
              {/* Product Name  */}
              <label className="label">Product Name</label>
              <input
                type="text"
                {...register("productName", {
                  required: "Please enter Product name.",
                })}
                className="input"
                placeholder="Product Name..."
              />
              {/* Product Image  */}
              <label className="label">Product Image</label>
              <input
                type="text"
                required
                {...register("productRUL")}
                className="input"
                placeholder="Product Image..."
              />

              {/* Product Price  */}

              <label className="label">Product Price</label>
              <input
                type="number"
                required
                {...register("productPrice")}
                className="input no-spinner"
                placeholder="Product Price..."
              />

              {/* Product Origin Country  */}
              <label className="label">Origin Country</label>
              <input
                type="text"
                required
                {...register("originCountry")}
                className="input"
                placeholder="Origin Country"
              />

              {/* Product Rating  */}
              <label className="label">Product Rating</label>
              <input
                type="number"
                required
                {...register("rating")}
                min="0"
                step="0.01"
                className="input no-spinner"
                placeholder="product quality"
              />
              {/* Product Available quantity  */}

              <label className="label">Available quantity</label>
              <input
                type="number"
                {...register("quantity")}
                className="input no-spinner"
                placeholder="Available quantity"
              />

              <label className="label">Product Details</label>
              <textarea
                placeholder="Product Details"
                {...register("textarea")}
                className="textarea"
              ></textarea>
              <button className="btn btn-accent text-white mt-4">
                Add New Product <LuCirclePlus />
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
