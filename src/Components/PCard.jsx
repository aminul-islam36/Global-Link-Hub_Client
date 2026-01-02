import { Link } from "react-router-dom";
import Loader from "./Loader";

const PCard = ({ product }) => {
  const { name, image, price, available_quantity } = product;

  return (
    <div>
      {product ? (
        <div className="card bg-base-100 w-full border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow duration-300">
          <figure className="px-10 pt-10">
            <img
              src={image}
              alt="Shoes"
              className="rounded-xl w-full h-auto aspect-2/1 object-cover border border-gray-200"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {name.length > 50 ? name.slice(0, 35) + " ..." : name}
            </h2>
            <div className="flex gap-5">
              <h2 className="flex ">Price : ${price}</h2>
              <h2 className="">{available_quantity} Products Available</h2>
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
