import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Modal } from "antd";
import { Popover } from "antd";
import { Button } from "antd";
import { Accordion, AccordionTab } from "primereact/accordion";
import useApi from "../utils/http";
import "./Payout.css";
import "primeicons/primeicons.css";

const Payout = () => {
  const api = useApi();
  const { payoutTotal } = useContext(AppContext);
  const { currency } = useContext(AppContext);
  const { payoutOrder } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState([]);
  const [selectedRegioned, setSelectedRegioned] = useState("");
  const [cities, setCities] = useState([]);
  const [rate, setRate] = useState(0);
  const [total, setTotal] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    fetchCities();
  }, [selectedRegioned]);

  const handleRegionChange = (e) => {
    e.preventDefault();
    const selectedRegion = e.target.value;
    setSelectedRegioned(selectedRegion);
  };

  const handleCityChange = (e) => {
    e.preventDefault();
    const selectedRate = e.target.value;
    setRate(parseInt(selectedRate));

    const calculateTotal = payoutTotal + parseInt(selectedRate);
    setTotal(calculateTotal);
  };

  const fetchRegions = async () => {
    const { data } = await api.get("/rate");
    setRegion(data);
  };

  const fetchCities = async () => {
    if (selectedRegioned) {
      const { data } = await api.get(`/region/${selectedRegioned}`);
      const city = data.cities;
      setCities(city);
    }
  };

  const payoutImages = payoutOrder.map((item) => item.image.split(",")[0]);

  const calculateSubTotal = (price, quantity) => {
    return currency(price * quantity);
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const content = (
    <div>
      <p style={{ color: "rgba(0,0,0,.8)" }}>
        In case we need to contact you regarding your order.
      </p>
    </div>
  );
  const cardContent = (
    <div>
      <p style={{ color: "rgba(0,0,0,.8)" }}>
        3-digit security code usually found on the back of your card. American
        Express cards have a 4-digit code located on the front.
      </p>
    </div>
  );

  const handlePayment = async () => {
    setIsLoading(true);

    const amount = total * 100;

    try {
      const { data } = await api.post(`create-gcash-source/${amount}`);

      if (data.data && data.data.attributes.checkout_url) {
        window.location.href = data.data.attributes.checkout_url;
      } else {
        alert("Failed to create GCash payment source");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error processing payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Row className="payout">
          <Col xs={12} md={6} className="payoutData">
            <div>
              <h4>Contact</h4>
              <FloatingLabel
                controlId="floatingInput"
                label="Email or mobile phone number"
              >
                <Form.Control type="text" placeholder="name@example.com" />
              </FloatingLabel>
            </div>
            <div className="paddingTop">
              <h4>Delivery</h4>
              <div className="addressGap">
                <FloatingLabel controlId="floatingSelect" label="Region">
                  <Form.Select
                    aria-label="Floating label select example"
                    onChange={handleRegionChange}
                  >
                    <option hidden>Select Region</option>
                    {region.map((regions) => (
                      <option
                        key={regions.id}
                        className="regionName"
                        value={regions.id}
                      >
                        {regions.region}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingSelect"
                  label="Cities/ Municipalities"
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    onChange={handleCityChange}
                  >
                    <option hidden>Select City/ Municipality</option>
                    {cities.map((city, i) => (
                      <option key={i} value={city.rates[0].rate}>
                        {city.city}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Barangay">
                  <Form.Control type="text" placeholder="name@example.com" />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Landmark (optional)"
                >
                  <Form.Control type="text" placeholder="name@example.com" />
                </FloatingLabel>
                <Row className="buyerNames">
                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="floatingInput" label="First Name">
                      <Form.Control
                        type="text"
                        placeholder="name@example.com"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="floatingInput" label="Last Name">
                      <Form.Control
                        type="text"
                        placeholder="name@example.com"
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Phone Number"
                  className="phoneContainer"
                >
                  <Form.Control type="text" placeholder="name@example.com" />
                  <Popover content={content}>
                    <i
                      className="pi pi-question-circle phoneIcon"
                      style={{ fontSize: "1rem" }}
                    ></i>
                  </Popover>
                </FloatingLabel>
              </div>
            </div>
            <div className="paddingTop payment">
              <h4>Payment</h4>
              <p>All transactions are secure and encrypted.</p>
              <div className="card">
                <Accordion activeIndex={0}>
                  <AccordionTab
                    header={
                      <div className="cardHeader">
                        <p>Gcash</p>
                        <img
                          src="https://1000logos.net/wp-content/uploads/2023/05/GCash-Logo.png"
                          alt="Gcash icon"
                          style={{ width: "70px" }}
                        />
                      </div>
                    }
                  >
                    <div className="ps-4 pe-4 pb-4 gcashContainer">
                      <div className="piContainer">
                        <i className="pi pi-window-maximize"></i>
                      </div>
                      <p className="clickingPay">
                        After clicking "Pay with Gcash", you will be redirected
                        to Gcash to complete your purchase securely.
                      </p>
                      <Button
                        className="gcashPayBtn"
                        type="primary"
                        disabled={isLoading}
                        onClick={handlePayment}
                      >
                        Pay with Gcash
                      </Button>
                    </div>
                  </AccordionTab>
                  <AccordionTab
                    header={
                      <div className="cardHeader">
                        <p>Bank Transfer</p>
                        <img
                          src="https://t4.ftcdn.net/jpg/04/73/84/61/360_F_473846184_0k637f6855ZJqaulKqAmgJTEVGVibR1P.jpg"
                          alt="Bank transfer icon"
                          style={{ width: "70px" }}
                        />
                      </div>
                    }
                  >
                    <div className="p-4 gcashContainer">
                      <div className="cardDetailsContainer">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Card Number"
                          className="phoneContainer"
                        >
                          <Form.Control
                            type="number"
                            placeholder="Card Number"
                          />
                          <i
                            className="pi pi-lock phoneIcon"
                            style={{ fontSize: "1rem" }}
                          ></i>
                        </FloatingLabel>
                        <Row>
                          <Col md={6} xs={12}>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Expiration Date (MM/YY)"
                              className="phoneContainer"
                            >
                              <Form.Control
                                type="number"
                                placeholder="Card Expiration Date"
                              />
                            </FloatingLabel>
                          </Col>
                          <Col md={6} xs={12}>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Security Code"
                              className="phoneContainer"
                            >
                              <Form.Control
                                type="text"
                                placeholder="card security code"
                              />
                              <Popover content={cardContent}>
                                <i
                                  className="pi pi-question-circle phoneIcon"
                                  style={{ fontSize: "1rem" }}
                                ></i>
                              </Popover>
                            </FloatingLabel>
                          </Col>
                        </Row>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Name on Card"
                          className="phoneContainer"
                        >
                          <Form.Control type="number" placeholder="Card Name" />
                        </FloatingLabel>
                      </div>

                      <Button className="gcashPayBtn" type="primary">
                        Pay now
                      </Button>
                    </div>
                  </AccordionTab>
                </Accordion>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} className="itemOut">
            <Row className="itemOutOrder">
              {payoutOrder.map((item, index) => (
                <Col key={index} xs={12} className="payoutParentContainer">
                  <div className="payoutContainer">
                    <img src={payoutImages[index]} alt="" />
                    <div className="payoutLabel">
                      <h5>{item.name}</h5>
                      <p>
                        {item.brand} <span>{item.size}</span>{" "}
                        <span>Quantity: {item.number_order}</span>
                      </p>
                    </div>
                  </div>
                  <div className="payoutSubTotal">
                    <p>{calculateSubTotal(item.price, item.number_order)}</p>
                  </div>
                </Col>
              ))}
              <Col xs={12} className="payoutSubtotal">
                <p>Subtotal</p>
                <p>{currency(payoutTotal)}</p>
              </Col>
              <Col xs={12} className="payoutShipping">
                <p>
                  Shipping
                  <span>
                    <i
                      className="pi pi-question-circle"
                      style={{ fontSize: "1rem" }}
                      onClick={showModal}
                    ></i>
                  </span>
                </p>
                <p>{rate === "" ? 0 : currency(rate)}</p>
              </Col>
              <Col xs={12} className="payoutTotal">
                <p>Total</p>
                <p>
                  {total === "" ? "Enter Shipping Address" : currency(total)}
                </p>
              </Col>
            </Row>
          </Col>
          <Col xs={12} className="pb-4">
            <div className="paddingTop mobilePayment">
              <h4>Payment</h4>
              <p>All transactions are secure and encrypted.</p>
              <div className="card">
                <Accordion activeIndex={0}>
                  <AccordionTab
                    header={
                      <div className="cardHeader">
                        <p>Gcash</p>
                        <img
                          src="https://1000logos.net/wp-content/uploads/2023/05/GCash-Logo.png"
                          alt="Gcash icon"
                          style={{ width: "70px" }}
                        />
                      </div>
                    }
                  >
                    <div className="ps-4 pe-4 pb-4 gcashContainer">
                      <div className="piContainer">
                        <i className="pi pi-window-maximize"></i>
                      </div>
                      <p className="clickingPay">
                        After clicking "Pay with Gcash", you will be redirected
                        to Gcash to complete your purchase securely.
                      </p>
                      <Button
                        className="gcashPayBtn"
                        type="primary"
                        onClick={handlePayment}
                      >
                        Pay with Gcash
                      </Button>
                    </div>
                  </AccordionTab>
                  <AccordionTab
                    header={
                      <div className="cardHeader">
                        <p>Bank Transfer</p>
                        <img
                          src="https://t4.ftcdn.net/jpg/04/73/84/61/360_F_473846184_0k637f6855ZJqaulKqAmgJTEVGVibR1P.jpg"
                          alt="Bank transfer icon"
                          style={{ width: "70px" }}
                        />
                      </div>
                    }
                  >
                    <div className="p-4 gcashContainer">
                      <div className="cardDetailsContainer">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Card Number"
                          className="phoneContainer"
                        >
                          <Form.Control
                            type="number"
                            placeholder="Card Number"
                          />
                          <i
                            className="pi pi-lock phoneIcon"
                            style={{ fontSize: "1rem" }}
                          ></i>
                        </FloatingLabel>
                        <Row className="cardGap">
                          <Col md={6} xs={12}>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Expiration Date (MM/YY)"
                              className="phoneContainer"
                            >
                              <Form.Control
                                type="number"
                                placeholder="Card Expiration Date"
                              />
                            </FloatingLabel>
                          </Col>
                          <Col md={6} xs={12}>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Security Code"
                              className="phoneContainer"
                            >
                              <Form.Control
                                type="text"
                                placeholder="card security code"
                              />
                              <Popover content={cardContent}>
                                <i
                                  className="pi pi-question-circle phoneIcon"
                                  style={{ fontSize: "1rem" }}
                                ></i>
                              </Popover>
                            </FloatingLabel>
                          </Col>
                        </Row>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Name on Card"
                          className="phoneContainer"
                        >
                          <Form.Control type="number" placeholder="Card Name" />
                        </FloatingLabel>
                      </div>

                      <Button className="gcashPayBtn" type="primary">
                        Pay now
                      </Button>
                    </div>
                  </AccordionTab>
                </Accordion>
              </div>
            </div>
          </Col>
          <Modal
            open={open}
            centered
            title="Shipping Policy"
            onCancel={handleCancel}
            footer={[]}
          >
            <p>
              Tracking information for orders placed on weekends will not be
              available until Monday.
            </p>
            <p>
              Rider Shield strives to ship all orders within 2-7 days of placing
              an order.
            </p>
            <p style={{ fontStyle: "italic" }}>
              *Shipping restrictions apply: We do not ship to overseas.
            </p>
            <h5>EXCHANGES</h5>
            <p>
              We only exchange goods if they are defective or damaged. In
              circumstances where you consider that a product is defective, you
              should promptly contact us at ridershield.com with details of the
              product and the defect.
            </p>
            <h5>RETURN SHIPPING COST</h5>
            <p>
              To return your product, please contact us by email at
              customer@ridershield.com to receive shipping instructions.
            </p>
            <p>
              You will be responsible for paying for shipping costs for
              returning your item. Shipping costs are non-refundable. If you
              receive a refund, the cost of return shipping will be deducted
              from your refund.
            </p>
            <h5>DEFECTIVE PRODUCT</h5>
            <p>
              We have high standards of quality control, but in an unlikely case
              of receiving a defective or damaged item, we’ll exchange it free
              of charge.
            </p>
          </Modal>
        </Row>
      </Container>
    </>
  );
};

export default Payout;
