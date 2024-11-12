import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <Container className="px-5">
        <Row className="pb-5 d-flex justify-content-center w-100">
          <Col className="d-flex flex-column align-items-center pt-5 borderBottom">
            <h2>Helmet Brand</h2>
            <div className="d-flex flex-column gap-1 footerBrand pb-3">
              <a href="">KYT</a>
              <a href="">Evo</a>
              <a href="">HJC</a>
              <a href="">LS2</a>
            </div>
          </Col>
          <Col
            md={5}
            className="d-flex flex-column align-items-center pt-5 borderBottom"
          >
            <h2>About Us</h2>
            <p>
              RIDER-SHIELD is operated by 2G – a legacy distributor of KYT and
              Evo helmets. <br />
              Our company specializes in importing and marketing motorcycle
              accessories.
            </p>
          </Col>

          <Col className="d-flex flex-column align-items-center pt-5 borderBottom">
            <h2>Contact Us</h2>
            <div className="d-flex gap-2">
              <i
                className="pi pi-phone"
                style={{ fontSize: "1.5rem", color: "white" }}
              ></i>
              <p>09123456789</p>
            </div>
            <div className="d-flex gap-2">
              <i
                className="pi pi-envelope"
                style={{ fontSize: "1.5rem", color: "white" }}
              ></i>
              <p>ridershield@gmail.com</p>
            </div>
          </Col>
        </Row>
        <Row className="pb-3">
          <Col className="d-flex justify-content-center">
            <p>&copy; 2024 Rider-Shield</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
