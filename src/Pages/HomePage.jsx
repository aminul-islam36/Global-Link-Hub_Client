import Hero from "../Components/Hero";
import TransportationModes from "../Components/TransportationModes ";
import ContactUS from "../Components/ContactUS";
import Testimonials from "../Components/Testimonials";
import LatestProducts from "../Components/LatestProducts";
import FAQ from "../Components/FAQ";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="px-4">
        <LatestProducts />
        <TransportationModes />
        <Testimonials />
        <FAQ />
        <ContactUS />
      </div>
    </div>
  );
};

export default HomePage;
