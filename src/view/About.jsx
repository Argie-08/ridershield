import "./About.css";
import Ride from "../assets/aboutImg.jpg";
import belowRide from "../assets/aboutImg2.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <>
      <div className="about">
        <img src={Ride} alt="" />
        <p>TRUSTED. TESTED. PROVEN</p>
      </div>
      <div className="aboutContentParent">
        <Container className="aboutContent">
          <Row>
            <Col md={6} xs={12}>
              <img src={belowRide} alt="" />
            </Col>
            <Col md={6} xs={12} className="aboutContentText">
              <h3>PERFORM AT HIGHEST LEVEL</h3>
              <p>
                At Rider Shield, we incorporate over years of experience in
                world-class competition into sleek, race-engineered helmets
                designed to protect and perform. Our designs offer optimal
                ventilation and aerodynamics while maintaining the highest level
                of crash protection. Since 2018, Rider Shield’s intense focus on
                the competitive environment allows us to produce a helmet with
                quality and function designed to perform at the highest level of
                motorsports and performance. Rider Shield now brings its
                industry leading safety, style, and service to one of the most
                innovative motorcycle markets in the country.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default About;
