import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const PUModal = ({ modalRef, edit, axiosURL, user, refetch }) => {
  const { register, handleSubmit } = useForm({
    values: {
      productName: edit?.name,
      productRUL: edit?.image,
      productPrice: edit?.price,
      originCountry: edit?.origin_country,
      rating: edit?.rating,
      quantity: edit?.availableQuantity,
    },
  });

  const handleUpdate = async (data) => {
    const updateProduct = {
      name: data.productName,
      image: data.productRUL,
      price: Number(data.productPrice),
      origin_country: data.originCountry,
      rating: Number(data.rating),
      availableQuantity: Number(data.quantity),
      buyer_email: user.email,
    };

    const res = await axiosURL.put(`/products/${edit?._id}`, updateProduct);
    if (res.data.modifiedCount) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      modalRef.current.close();
      refetch();
    }
  };

  return (
    <div>
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
                <form onSubmit={handleSubmit(handleUpdate)}>
                  <fieldset className="fieldset  *:w-full">
                    {/* Product Name  */}
                    <label className="label">Product Name</label>
                    <input
                      type="text"
                      {...register("productName")}
                      className="input"
                      defaultValue={edit?.name}
                      placeholder="Product Name..."
                    />
                    {/* Product Image URL  */}
                    <label className="label">Product Image</label>
                    <input
                      type="text"
                      {...register("productRUL")}
                      defaultValue={edit?.image}
                      className="input"
                      placeholder="Product Image..."
                    />

                    {/* Product Price  */}

                    <label className="label">Product Price</label>
                    <input
                      type="number"
                      {...register("productPrice")}
                      defaultValue={edit?.price}
                      className="input no-spinner"
                      placeholder="Product Price..."
                    />

                    {/* Product  Origin Country  */}
                    <label className="label">Origin Country</label>
                    <input
                      type="text"
                      {...register("originCountry")}
                      className="input"
                      defaultValue={edit?.origin_country}
                      placeholder="Origin Country"
                    />

                    {/* Product Rating  */}
                    <label className="label">Product Rating</label>
                    <input
                      type="number"
                      {...register("rating")}
                      min="0"
                      step="0.01"
                      defaultValue={edit?.rating}
                      className="input no-spinner"
                      placeholder="product quality"
                    />

                    {/* Product  Available quantity  */}
                    <label className="label">Available quantity</label>
                    <input
                      type="number"
                      {...register("quantity")}
                      defaultValue={edit?.availableQuantity}
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

export default PUModal;
