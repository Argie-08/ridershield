import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Store from "../assets/shop.jpg";
import { Dialog } from "primereact/dialog";
import "./Location.css";

const Location = () => {
  const [visible, setVisible] = useState(false);

  return (
    <article>
      <Container className="shopDialog">
        <Row className="d-flex gap-4">
          <Col className="storeImageFrame">
            <img src={Store} alt="" />
          </Col>
          <Col
            md={4}
            className="d-flex flex-column justify-content-center gap-4 shopLocation"
          >
            <h2>Shop in Store</h2>
            <p>Visit our stores in Turno and Sta.Filomena, Dipolog City</p>
            <button onClick={() => setVisible(true)}>View Location</button>
          </Col>
        </Row>
        <Dialog
          header="Our Locations"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <Row>
            <Col md={6} xs={12}>
              <div className="locationAddress">
                <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                  RIDER SHIELD
                </p>
                <p>Turno Branch</p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d378.36649902154477!2d123.35178123284733!3d8.582267479581525!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x325495e10c24848d%3A0x9c2262b74ab09d97!2sH9J2%2BWQJ%2C%20Dipolog%20-%20Polanco%20-%20Oroquieta%20Rd%2C%20Dipolog%20City%2C%20Zamboanga%20del%20Norte%2C%20Philippines!5e1!3m2!1sen!2sus!4v1730937807490!5m2!1sen!2sus"
                width="100%"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                className="addressMap mb-4"
              ></iframe>
            </Col>
            <Col md={6} xs={12}>
              <div className="locationAddress">
                <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                  RIDER SHIELD
                </p>
                <p>CitiMall Branch</p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d318.17569175018696!2d123.33947459948249!3d8.571929066492837!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3254967042b60e5f%3A0xd7f4be73a1615b43!2sLUCKY%20STORE!5e1!3m2!1sen!2sus!4v1730938731336!5m2!1sen!2sus"
                width="100%"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                className="addressMap mb-4"
              ></iframe>
            </Col>
          </Row>
        </Dialog>
      </Container>
    </article>
  );
};

export default Location;
