import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useEffect } from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import useApi from "../utils/http";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "antd";
import "./Product.css";

const Product = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { setSelectedProduct } = useContext(AppContext);
  const [mainImage, setMainImage] = useState("");
  const [minorImage, setMinorImage] = useState([]);
  const { selectedProduct } = useContext(AppContext);
  const { cart } = useContext(AppContext);
  const { setCart } = useContext(AppContext);
  const { currency } = useContext(AppContext);
  const { setPayoutOrder } = useContext(AppContext);
  const { setPayoutTotal } = useContext(AppContext);
  const [selectedSize, setSelectedSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [likeImages, setLikeImages] = useState([]);

  const handleClick = (size) => {
    setSelectedSize(size);
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const file = selectedProduct.image.split(",");
        setMainImage(file[0]); // fetch main image
        setMinorImage(file.slice(-3)); // fetch the last 3 images
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();

    const style = selectedProduct.style;

    async function fetchProducts() {
      const { data } = await api.get(`products/${style}`);
      const shuffledData = data.sort(() => 0.5 - Math.random()); // shuffle the data or randomize the data
      const selectedItem = shuffledData.slice(0, 4);
      const excludeSelected = selectedItem.filter(
        (item) => item.id !== selectedProduct.id
      );
      setLikeImages(excludeSelected);
    }
    fetchProducts();

    return () => {};
  }, [selectedProduct]);

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  // swap minor images with main image
  function handleImageClick(image, i) {
    const newMinorImages = [...minorImage];
    newMinorImages[i] = mainImage;

    setMainImage(image);
    setMinorImage(newMinorImages);
  }

  function handleLike(image) {
    const category = image.category;
    const brand = image.brand;
    const name = image.name;
    setSelectedProduct(image);
    localStorage.setItem("selectedProducts", JSON.stringify(image));

    navigate(`/product/${category}/${brand}/${name}`);
  }

  // Add item to cart saved in localStorage
  const handleCart = (cartItem) => {
    setCart((prevCart) => {
      const updatedCart = Array.isArray(prevCart)
        ? [...prevCart, { ...cartItem, quantity: quantity, size: selectedSize }]
        : [cartItem];
      return updatedCart;
    });
  };

  const handleShopNow = (productItem) => {
    const file = [
      { ...productItem, number_order: quantity, size: selectedSize },
    ];

    setPayoutOrder(file);
    localStorage.setItem("payout", JSON.stringify(file));

    setPayoutTotal(productItem.price);
    localStorage.setItem("total", JSON.stringify(productItem.price));

    navigate("/payout");
  };

  const firstImages = likeImages.map((item) => item.image.split(",")[0]);

  return (
    <>
      <div className="productBased">
        <Container className="productContainer">
          <Row>
            <Col xs={12} md={6}>
              <Row>
                <Col xs={12}>
                  <img
                    src={mainImage}
                    alt="Main Image"
                    className="prodImageMain"
                  />
                </Col>
              </Row>
              <Row>
                {minorImage.map((image, i) => (
                  <Col xs={4} key={i}>
                    <img
                      src={image}
                      className="prodImageMinor"
                      onClick={() => handleImageClick(image, i)}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={12} md={6}>
              <h2>{selectedProduct.name}</h2>
              <p>
                Brand: <b>{selectedProduct.brand}</b>
              </p>
              <p>Price: {currency(selectedProduct.price)}</p>
              <p>
                Size: <span>{selectedSize}</span>
              </p>
              <div className="sizeBtn">
                {sizes.map((size) => (
                  <button
                    value={size}
                    key={size}
                    onClick={() => handleClick(size)}
                    className={`size-button ${
                      selectedSize === size ? "active" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p>Quantity:</p>
              <div className="quantity">
                <Button onClick={decreaseQuantity}>-</Button>
                <Input value={quantity} readOnly />
                <Button onClick={increaseQuantity}>+</Button>
              </div>
              <button onClick={() => handleCart(selectedProduct)}>
                Add to Cart
              </button>
              <button
                className="prodBtn"
                onClick={() => handleShopNow(selectedProduct)}
              >
                BUY NOW
              </button>
              <p>{selectedProduct.details}</p>
            </Col>
          </Row>
          <Row className="mayLike">
            <Col xs={12}>
              <p>YOU MAY ALSO LIKE . . .</p>
            </Col>
            {likeImages.map((image, i) => (
              <Col className="likeCard" xs={6} md={3} key={i}>
                <Card
                  hoverable
                  style={{
                    width: 400,
                  }}
                  cover={<img alt="" src={firstImages[i]} />}
                  onClick={() => handleLike(image)}
                  className="likeCarded"
                >
                  <p>{image.brand}</p>
                  <p>{image.name}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Product;
