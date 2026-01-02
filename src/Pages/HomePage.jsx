import Hero from "../Components/Hero";
import TransportationModes from "../Components/TransportationModes ";
import ContactUS from "../Components/ContactUS";
import Testimonials from "../Components/Testimonials";
import LatestProducts from "../Components/LatestProducts";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <LatestProducts />
      <TransportationModes />
      <Testimonials />
      <ContactUS />
    </div>
  );
};

export default HomePage;
