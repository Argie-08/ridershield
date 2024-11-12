import Hero from "../components/Hero";
import Featured from "../components/Featured";
import Guide from "../components/Guide";
import Location from "../components/Location";
import Review from "../components/Review";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Guide />
      <Location />
      <Review />
    </>
  );
};

export default Home;
