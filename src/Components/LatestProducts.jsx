import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import PCard from "./PCard";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Title from "../utilities/Title";

const LatestProducts = () => {
  const axiosURL = useAxios();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["latestProduct"],
    queryFn: async () => {
      const res = await axiosURL.get("/products");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className=" py-4 lg:py-8 max-w-7xl mx-auto flex justify-center items-center flex-col space-y-5">
      <Title> Our Latest Popular Products</Title>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-2 lg:gap-4">
        {products?.result?.slice(0, 8).map((product) => (
          <PCard key={product._id} product={product}></PCard>
        ))}
      </div>

      <Link to="/all-products" className="btn btn-accent px-8 py-5 text-white">
        Show All Products
      </Link>
    </section>
  );
};

export default LatestProducts;
