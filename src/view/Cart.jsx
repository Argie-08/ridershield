import Container from "react-bootstrap/Container";
import { useState, useRef } from "react";
import { useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { AppContext } from "../AppContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Input } from "antd";
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
import { Flex, Spin } from "antd";

import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { currency } = useContext(AppContext);
  const { cart } = useContext(AppContext);
  const { quantity } = useContext(AppContext);
  const { setQuantity } = useContext(AppContext);
  const { total } = useContext(AppContext);
  const { setTotal } = useContext(AppContext);
  const { setPayoutTotal } = useContext(AppContext);
  const { setPayoutOrder } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const images = cart.map((item) => item.image.split(",")[0]);

  const increaseQuantity = (index) => {
    setQuantity((prevQuantities) =>
      prevQuantities.map((qty, i) => (i === index ? qty + 1 : qty))
    );
  };

  const decreaseQuantity = (index) => {
    setQuantity((prevQuantities) =>
      prevQuantities.map((qty, i) => (i === index && qty > 1 ? qty - 1 : qty))
    );
  };

  const calculateTotal = (price, quantity) => {
    return price * quantity;
  };

  //delete item from local storage
  const handlelocalstorageDelete = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.location.reload();
  };

  const backToShop = () => {
    navigate("/product/All");
  };

  const subTotalPrice = cart.reduce(
    (total, item, index) => total + item.price * quantity[index],
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    //to incorporate quantity in the form submission and append number_order to the cart data
    const cartData = cart.map((item, i) => ({
      ...item,
      number_order: quantity[i],
    }));
    setPayoutOrder(cartData);
    localStorage.setItem("payout", JSON.stringify(cartData));

    setLoading(true);

    setTimeout(() => {
      navigate("/payout");
    }, 2000);
    setReload(!reload);
  };

  useEffect(() => {
    setTotal(currency(subTotalPrice));
  }, [subTotalPrice]);

  const handleStorageTotal = () => {
    setPayoutTotal(subTotalPrice);
    localStorage.setItem("total", JSON.stringify(subTotalPrice));
  };

  return (
    <div className="cartParent">
      <form onSubmit={handleSubmit}>
        <Flex gap="middle" vertical>
          <Spin spinning={loading} size="large"></Spin>
          <Container className="cartContainer">
            <Row style={{ marginTop: "6rem" }}>
              <Col xs={12} className="headerCart">
                <h2>Your Cart</h2>
                <p onClick={backToShop}>Continue Shopping</p>
              </Col>
            </Row>
            <Row style={{ marginTop: "2rem" }}>
              <Col xs={12}>
                <Table hover>
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th>QUANTITY</th>
                      <th style={{ textAlign: "end" }}>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          <p>Your cart is empty...</p>
                        </td>
                      </tr>
                    ) : (
                      cart.map((item, index) => (
                        <tr key={index} className="cartRow">
                          <td className="cartItems">
                            <img src={images[index]} alt="product" />
                            <div>
                              <h4>{item.name}</h4>
                              <p> {currency(item.price)}</p>
                              <p>Size: {item.size}</p>
                            </div>
                          </td>

                          <td className="quantityDelete">
                            <div className="cartQuantityBox">
                              <div className="quantity">
                                <Button onClick={() => decreaseQuantity(index)}>
                                  -
                                </Button>
                                <Input value={quantity[index]} readOnly />
                                <Button onClick={() => increaseQuantity(index)}>
                                  +
                                </Button>
                              </div>
                              <i
                                className="pi pi-trash"
                                style={{ fontSize: "1.5rem" }}
                                onClick={() =>
                                  handlelocalstorageDelete(item.id)
                                }
                              ></i>
                            </div>
                          </td>
                          <td style={{ textAlign: "end" }}>
                            {currency(
                              calculateTotal(item.price, quantity[index])
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row style={{ paddingBottom: "3rem" }}>
              <Col>
                <div className="cartSubTotal">
                  <p>
                    Subtotal:
                    <span>{total}</span>
                  </p>
                  <p>Shipping calculated at checkout</p>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={subTotalPrice <= 0}
                    onClick={handleStorageTotal}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Flex>
      </form>
    </div>
  );
};

export default Cart;
