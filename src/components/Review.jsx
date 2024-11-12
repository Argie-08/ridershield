import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Gears from "../assets/gear.jpg";
import "./Review.css";

const Review = () => {
  return (
    <summary>
      <Container>
        <Row>
          <Col>
            <h2>Our sincere review</h2>
            <Carousel className="pt-5">
              <Carousel.Item>
                <p>I highly recommend this business!</p>
                <div className="d-flex w-100 justify-content-center align-items-center gap-3 reviewUser">
                  <img src={Gears} alt="" />
                  <div>
                    <h5>Potential Buyer</h5>
                    <i
                      className="pi pi-star px-1"
                      style={{ fontSize: "1rem" }}
                    ></i>
                    <i
                      className="pi pi-star px-1"
                      style={{ fontSize: "1rem" }}
                    ></i>
                    <i
                      className="pi pi-star px-1"
                      style={{ fontSize: "1rem" }}
                    ></i>
                    <i
                      className="pi pi-star px-1"
                      style={{ fontSize: "1rem" }}
                    ></i>
                    <i
                      className="pi pi-star px-1"
                      style={{ fontSize: "1rem" }}
                    ></i>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <p>I highly recommend this business!</p>
                <div className="d-flex w-100 justify-content-center align-items-center gap-3 reviewUser">
                  <img src={Gears} alt="" />
                  <div>
                    <h5>Potential Buyer</h5>
                    <i
                      className="pi pi-star px-1"
                      style={{ fontSize: "1rem" }}
                    ></i>
                    <i
                      className="pi pi-star px-1"
                      style={{ fontSize: "1rem" }}
                    ></i>
                    <i
                      className="pi pi-star px-1"
                      style={{ fontSize: "1rem" }}
                    ></i>
                    <i
                      className="pi pi-star px-1"
                      style={{ fontSize: "1rem" }}
                    ></i>
                    <i
                      className="pi pi-star px-1"
                      style={{ fontSize: "1rem" }}
                    ></i>
                  </div>
                </div>
              </Carousel.Item>
              {/* <Carousel.Item>
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item> */}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </summary>
  );
};

export default Review;
