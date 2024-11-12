import Carousel from "react-bootstrap/Carousel";
import Pic1 from "../assets/h5.png";
import Pic4 from "../assets/h3.png";
import Pic5 from "../assets/h4.png";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import useApi from "../utils/http";
import { useContext } from "react";
import { AppContext } from "../AppContext";

const Hero = () => {
  const api = useApi();
  const { setStyleProducts } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleShop(all) {
    const { data } = await api.get("/products");
    setStyleProducts(data);
    localStorage.setItem("styleProducts", JSON.stringify(data));

    navigate(`/product/${all}`);
  }

  return (
    <div className="carouselBody">
      <Carousel fade>
        <Carousel.Item interval={5000}>
          <img src={Pic4} alt="" />
          <Carousel.Caption>
            <h3>
              Limited products <br />
              don't miss it 10% <br />
              discount crazy
            </h3>
            <p className="borderBtn">
              Place an order for a product to support your driving style
            </p>
            <button className="btn btn-light" onClick={() => handleShop("all")}>
              SHOP NOW
            </button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img src={Pic5} alt="" />
          <Carousel.Caption>
            <h3>
              Be different <br />
              Be Rare <br />
              Standout from the pack
            </h3>
            <p className="borderBtn">
              Place an order for a product to support your driving style
            </p>
            <button className="btn btn-light" onClick={() => handleShop("all")}>
              SHOP NOW
            </button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img src={Pic1} alt="" />
          <Carousel.Caption>
            <h3>
              Rule the road <br />
              but First <br />
              wear the Crown
            </h3>
            <p className="borderBtn">
              Place an order for a product to support your driving style
            </p>
            <button className="btn btn-light" onClick={() => handleShop("all")}>
              SHOP NOW
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Hero;
