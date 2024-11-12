import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Spin } from "antd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Racing from "../assets/kyt.png";
import Sport from "../assets/evo.png";
import Open from "../assets/openface.png";
import OffRoad from "../assets/tour.png";
import { AppContext } from "../AppContext";
import useApi from "../utils/http";
import React from "react";
import featureVid from "../assets/1c.mp4";

import "./Featured.css";

const Featured = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { setStyleProducts } = useContext(AppContext);
  const [loading, setLoading] = React.useState(false);

  async function handleRacing(racing) {
    const { data } = await api.get(`/products/${racing}`);
    setStyleProducts(data);
    localStorage.setItem("styleProducts", JSON.stringify(data));

    navigate(`/product/${racing}`);
    window.scrollTo(0, 0);
  }

  async function handleTour(tour) {
    const { data } = await api.get(`/products/${tour}`);
    setStyleProducts(data);
    localStorage.setItem("styleProducts", JSON.stringify(data));

    navigate(`/product/${tour}`);
    window.scrollTo(0, 0);
  }

  async function handleOpenFace(cruise) {
    const { data } = await api.get(`/products/${cruise}`);
    setStyleProducts(data);
    localStorage.setItem("styleProducts", JSON.stringify(data));

    navigate(`/product/${cruise}`);
    window.scrollTo(0, 0);
  }

  async function handleOffRoad(adventure) {
    const { data } = await api.get(`/products/${adventure}`);
    setStyleProducts(data);
    localStorage.setItem("styleProducts", JSON.stringify(data));

    navigate(`/product/${adventure}`);
    window.scrollTo(0, 0);
  }

  return (
    <Spin spinning={loading}>
      <section>
        <video autoPlay loop muted playsInline>
          <source src={featureVid} type="video/mp4" />
        </video>
        <Container>
          <Row>
            <Col>
              <p>
                <span>SHOP IN LINE WITH YOUR </span>
                <span className="rideText">MOTORCYCLE</span>
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex gap-4">
              <Card onClick={() => handleRacing("racing")}>
                <Card.Img variant="top" src={Racing} className="racing kyt" />
                <Card.Body>
                  <Card.Title>RACING</Card.Title>
                </Card.Body>
              </Card>

              <Card onClick={() => handleTour("tour")}>
                <Card.Img variant="top" src={Sport} className="racing" />
                <Card.Body>
                  <Card.Title>TOUR</Card.Title>
                </Card.Body>
              </Card>
              <Card onClick={() => handleOpenFace("cruise")}>
                <Card.Img variant="top" src={Open} className="racing" />
                <Card.Body>
                  <Card.Title>CRUISE</Card.Title>
                </Card.Body>
              </Card>
              <Card onClick={() => handleOffRoad("adventure")}>
                <Card.Img variant="top" src={OffRoad} className="racing" />
                <Card.Body>
                  <Card.Title>ADVENTURE</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>{" "}
    </Spin>
  );
};

export default Featured;
