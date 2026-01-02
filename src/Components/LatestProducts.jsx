import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import PCard from "./PCard";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

const LatestProducts = () => {
  const axiosURL = useAxios();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["latestProduct"],
    queryFn: async () => {
      const res = await axiosURL.get("/products");
      return res.data;
    },
  });

  return (
    <div className="flex flex-col justify-center items-center py-5 lg:py-15">
      <h2 className="text-center text-4xl lg:text-6xl font-bold py-5 text-accent ">
        Our Latest Popular Products
      </h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mx-auto w-11/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-3 lg:gap-5 py-5 ">
          {products.slice(0, 8).map((product) => (
            <PCard key={product._id} product={product}></PCard>
          ))}
        </div>
      )}

      <Link to="/all-products" className="btn btn-accent px-8 py-5 text-white">
        Show All Products
      </Link>
    </div>
  );
};

export default LatestProducts;
