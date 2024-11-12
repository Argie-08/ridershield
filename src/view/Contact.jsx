import { useState, useRef } from "react";
import "./Contact.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import emailjs from "@emailjs/browser";
import { Toast } from "primereact/toast";
import "primeicons/primeicons.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const toastCenter = useRef(null);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_zei31jn", "template_el3kb0j", form.current, {
        publicKey: "G-5bEETicw3G5C5Dj",
      })
      .then(
        () => {
          showMessage(toastCenter, "info");
          setName("");
          setEmail("");
          setPhone("");
          setComment("");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const showMessage = (ref, severity) => {
    ref.current.show({
      severity: severity,
      summary: "Message Sent",
      detail: "We will get back to you as soon as possible.",
      life: 3000,
      style: { padding: "1rem" },
    });
  };

  return (
    <div className="contactParent">
      <Toast ref={toastCenter} position="top-center" />;
      <Container className="contact">
        <Row>
          <Col className="columnContainer">
            <form ref={form} onSubmit={sendEmail}>
              <div className="contactContainer">
                <h2>CONTACT US TODAY</h2>
                <p>
                  We’re here for all your questions regarding our products, as
                  well any inquiries up to and including media, press,
                  sponsorship, demos, and events.
                </p>

                <h3>GET IN TOUCH</h3>
                <div className="contactDetails">
                  <Row>
                    <Col md={6} xs={12}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Full Name"
                        className="contactInputContainer"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          name="name"
                          required
                        />
                        <i
                          className="pi pi-user-plus inputIconContact"
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "1.5rem",
                          }}
                        ></i>
                      </FloatingLabel>
                    </Col>
                    <Col md={6} xs={12}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email*"
                        className="contactInputContainer"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Email*"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          name="email"
                          required
                        />
                        <i
                          className="pi pi-envelope inputIconContact"
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "1.5rem",
                          }}
                        ></i>
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Phone Number"
                    className="contactInputContainer "
                  >
                    <Form.Control
                      type="text"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      name="phone"
                      required
                      className=""
                    />
                    <i
                      className="pi pi-phone inputIconContact"
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "1.5rem",
                      }}
                    ></i>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Message"
                    className="contactInputContainer"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Message"
                      style={{ height: "150px" }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      name="comment"
                    />
                  </FloatingLabel>
                  <button type="submit">Send</button>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
