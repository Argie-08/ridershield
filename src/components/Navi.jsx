import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import Logo from "../assets/logo2.png";
import Logo2 from "../assets/logo3.png";
import "./Navi.css";
import { AppContext } from "../AppContext";

const Navi = () => {
  const navigate = useNavigate();

  const { cart } = useContext(AppContext);
  const { allProducts } = useContext(AppContext);
  const { setStyleProducts } = useContext(AppContext);
  const [length, setLength] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const cartLength = cart.length;
    setLength(cartLength);
  }, [cart]);

  function home() {
    navigate("/");
    window.scrollTo(0, 0);
  }

  function navigateCart() {
    navigate("/cart");
    window.scrollTo(0, 0);
  }

  const closeSideBar = () => {
    const sidebar = document.getElementById("check");
    sidebar.checked = false;
  };

  const handleSideBarOffRoad = (e) => {
    e.preventDefault();
    navigate("/about");
    window.scrollTo(0, 0);
    closeSideBar();
  };
  const handleSideBarOpenFace = (e) => {
    e.preventDefault();
    navigate("/contact-us");
    closeSideBar();
  };
  const handleHomePhone = () => {
    navigate("/");
    window.scrollTo(0, 0);
    closeSideBar();
  };

  const handleAbout = (e) => {
    e.preventDefault();
    navigate("/about");
    window.scrollTo(0, 0);
  };

  const handleContact = () => {
    navigate("/contact-us", { replace: true });
    window.scrollTo(0, 0);
  };

  const handleHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };
  const handleShop = () => {
    setStyleProducts(allProducts);
    localStorage.setItem("styleProducts", JSON.stringify(allProducts));
    navigate("product/shop");
    window.scrollTo(0, 0);
    closeSideBar();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const searchFilter = allProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(search.replace(/\s+/g, "").toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase()) ||
        item.style.toLowerCase().includes(search.toLowerCase())
    );

    if (searchFilter.length == 0) {
      setStyleProducts(allProducts);
      localStorage.setItem("styleProducts", JSON.stringify(allProducts));

      navigate("/product/all");
      window.scrollTo(0, 0);
      setSearch("");
    } else {
      setStyleProducts(searchFilter);
      localStorage.setItem("styleProducts", JSON.stringify(searchFilter));

      navigate(`/product/${search}`);
      window.scrollTo(0, 0);
      setSearch("");
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <div className="d-flex gap-3" onClick={home}>
            <img src={Logo} alt="" className="logoMain" />
            <img src={Logo2} alt="" className="logoSub" />
          </div>
        </li>
        <li className="hideOnMobile" onClick={handleHome}>
          <a href="">HOME</a>
        </li>
        <li className="hideOnMobile" onClick={handleShop}>
          <a href="">SHOP</a>
        </li>
        <li className="hideOnMobile" onClick={handleAbout}>
          <a href="">ABOUT US</a>
        </li>
        <li className="hideOnMobile" onClick={handleContact}>
          <a href="">CONTACT US</a>
        </li>

        <div className="uLine d-flex gap-2">
          <InputText
            v-model="value1"
            placeholder="Search"
            className="searchBox"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputIcon
            className="pi pi-search"
            onClick={handleSearch}
          ></InputIcon>
        </div>
        <div className="cartItems" onClick={navigateCart}>
          <i className="pi pi-shopping-cart"></i>
          {length > 0 && <span className="cartCount">{length}</span>}
        </div>
        <input type="checkbox" id="check" />
        <div className="toggle">
          <span className="top_line common"></span>
          <span className="middle_line common"></span>
          <span className="bottom_line common"></span>
        </div>

        <ul className="sidebar">
          <li className="closed"></li>
          <li>
            <a href="" onClick={handleHomePhone}>
              HOME
            </a>
          </li>
          <li>
            <a href="" onClick={handleShop}>
              SHOP
            </a>
          </li>
          <li>
            <a href="" onClick={handleSideBarOffRoad}>
              ABOUT US
            </a>
          </li>
          <li>
            <a href="" onClick={handleSideBarOpenFace}>
              CONTACT US
            </a>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default Navi;
