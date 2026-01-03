import { Link } from "react-router-dom";

const ProductQuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className=" rounded-xl bg-base-100 w-11/12 md:w-3/4 lg:w-1/2 p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 btn btn-sm btn-circle"
        >
          ✕
        </button>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg aspect-3/2 object-cover"
          />

          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

            <p className="mb-1">
              <strong>Origin Country:</strong> {product.origin_country}
            </p>

            <p className="mb-1">
              <strong>Price:</strong> {product.price}
            </p>

            <p className="mb-1">
              <strong>Available Quantity:</strong> {product.importQty}
            </p>

            <p className="mb-3">
              <strong>Rating:</strong> {product.rating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;
