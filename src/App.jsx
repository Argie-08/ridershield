import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./view/Home";
import Fullface from "./view/Fullface";
import Navi from "./components/Navi";
import About from "./view/About";
import Footer from "./components/Footer";
import Product from "./view/Product";
import Cart from "./view/Cart";
import Payout from "./view/Payout";
import Contact from "./view/Contact";
import "./App.css";
import "primeicons/primeicons.css";
import useApi from "./utils/http";
import { AppContext } from "./AppContext";

const App = ({}) => {
  const api = useApi();
  const [allProducts, setAllProducts] = useState([]);

  const [styleProducts, setStyleProducts] = useState(() => {
    const storedProducts = localStorage.getItem("styleProducts");
    return storedProducts ? JSON.parse(storedProducts) : [];
  }); //This is how you get the value of styleProducts set in Featured.jsx

  const [helmetOption, setHelmetOption] = useState("All");
  const [fullFace, setFullFace] = useState("");
  const [offRoad, setOffRoad] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(() => {
    const storedSelectedProducts = localStorage.getItem("selectedProducts");
    return storedSelectedProducts ? JSON.parse(storedSelectedProducts) : [];
  });

  const [payoutTotal, setPayoutTotal] = useState(() => {
    const storedPayoutTotal = localStorage.getItem("total");
    return storedPayoutTotal ? JSON.parse(storedPayoutTotal) : [];
  });

  const [payoutOrder, setPayoutOrder] = useState(() => {
    const storedPayoutOrder = localStorage.getItem("payout");
    return storedPayoutOrder ? JSON.parse(storedPayoutOrder) : [];
  });

  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [quantity, setQuantity] = useState(() => {
    return cart.map((item) => item.quantity);
  });

  useEffect(() => {
    setQuantity(cart.map((item) => item.quantity));
  }, [cart]);

  const [total, setTotal] = useState(0);

  const currency = (data) =>
    data.toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
    });

  useEffect(() => {
    async function products() {
      const { data } = await api.get("/products");
      setAllProducts(data);
    }
    products();
    return () => {};
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          setHelmetOption,
          helmetOption,
          fullFace,
          setFullFace,
          offRoad,
          setOffRoad,
          styleProducts,
          setStyleProducts,
          selectedProduct,
          setSelectedProduct,
          cart,
          setCart,
          currency,
          quantity,
          setQuantity,
          total,
          setTotal,
          payoutTotal,
          setPayoutTotal,
          payoutOrder,
          setPayoutOrder,
          allProducts,
        }}
      >
        <Navi />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:data" element={<Fullface />} />
          <Route path="product/:category/:brand/:name" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payout" element={<Payout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
        <Footer />
      </AppContext.Provider>
    </>
  );
};

export default App;
