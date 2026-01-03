import { Link } from "react-router-dom";
import Loader from "./Loader";

const PCard = ({ product }) => {
  const { name, image, price, availableQuantity } = product;

  return (
    <div>
      {product ? (
        <div className="card bg-base-100 w-full border border-gray-200/40 rounded-2xl overflow-hidden hover:shadow-sm transition">
          <img
            src={image}
            alt={name}
            className="w-full h-auto aspect-2/1 object-cover hover:scale-110 cursor-pointer transition"
          />
          <div className="card-body p-4">
            <h2 className="card-title">
              {name.length > 20 ? name.slice(0, 20) + " ..." : name}
            </h2>
            <div className="flex gap-5">
              <h2 className="flex ">Price : ${price}</h2>
              <h2 className="">{availableQuantity} Products Available</h2>
            </div>
            <div className="card-actions">
              <Link to={`/details/${product._id}`}>
                <button className="btn btn-accent text-white">
                  View Deails
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PCard;
