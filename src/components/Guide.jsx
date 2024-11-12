import { useNavigate } from "react-router-dom";
import useApi from "../utils/http";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Helmet from "../assets/moto.jpg";
import Gear from "../assets/gear.jpg";
import Accessories from "../assets/accessories.jpg";
import "./Guide.css";

const Guide = () => {
  const { setStyleProducts } = useContext(AppContext);
  const api = useApi();
  const navigate = useNavigate();

  const handleChooseKind = async (category) => {
    try {
      const categories = Array.isArray(category) ? category : [category];
      const productRequests = categories.map((cat) =>
        api.get(`/product/${cat}`)
      );
      const responses = await Promise.all(productRequests);
      const allProducts = responses.flatMap((response) => response.data);

      setStyleProducts(allProducts);
      localStorage.setItem("styleProducts", JSON.stringify(allProducts));
      navigate(`/product/${categories.join("&&")}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChooseAll = async (category) => {
    try {
      const { data } = await api.get("/products");
      setStyleProducts(data);
      localStorage.setItem("styleProducts", JSON.stringify(data));
      navigate(`/product/${category}`);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <main>
      <Container className="pt-4 ">
        <Row className="p-5 d-flex gap-3">
          <Col
            md={5}
            className="d-flex flex-column justify-content-center gap-4 productGuide"
          >
            <h2>Product Guide</h2>
            <p>
              Get informed about the products we carry as well as the features
              of each as we aim to arm you with comfortable, safe and high
              quality gear.
            </p>
            <button
              className="btn btn-light"
              onClick={() => handleChooseAll("all")}
            >
              View All
            </button>
          </Col>

          <Col md={2} className="imagePosition rowHeight">
            <img
              src={Helmet}
              alt=""
              onClick={() =>
                handleChooseKind(["fullFace", "openFace", "offRoad"])
              }
            />
            <p className="guideText">Helmet</p>
          </Col>
          <Col md={2} className="imagePositions rowHeight">
            <img
              src={Gear}
              alt="gear"
              onClick={() => handleChooseKind("gear")}
            />
            <p className="guideText">Gear</p>
          </Col>
          <Col md={2} className="imagePosition rowHeight">
            <img
              src={Accessories}
              alt="accessories"
              onClick={() => handleChooseKind("accessories")}
            />
            <p className="guideText">Accessories</p>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Guide;
