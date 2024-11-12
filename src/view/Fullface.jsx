import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PagesHero from "../components/PagesHero";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "primereact/card";
import { Pagination } from "antd";
import { Button, Modal } from "antd";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import useApi from "../utils/http";
import "./Fullface.css";

const Fullface = () => {
  const { styleProducts } = useContext(AppContext);
  const { currency } = useContext(AppContext);
  const api = useApi();
  const navigate = useNavigate();
  const { setStyleProducts } = useContext(AppContext);
  const { setSelectedProduct } = useContext(AppContext);
  const [filterOut, setFilterOut] = useState(styleProducts);
  const [filterBrand, setFilterBrand] = useState("All");
  const [resultBrand, setResultBrand] = useState(styleProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("low");
  const [sortingOut, setSortingOut] = useState(styleProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    let filteredProducts = styleProducts;
    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (data) => data.category === selectedCategory
      );
    }
    setFilterOut(filteredProducts);
    setResultBrand(filteredProducts);
  }, [styleProducts, selectedCategory]);

  useEffect(() => {
    if (filterBrand === "All") {
      setResultBrand(filterOut);
    } else {
      setResultBrand(filterOut.filter((data) => data.brand === filterBrand));
    }
  }, [filterBrand, filterOut]);

  useEffect(() => {
    let sortedResults = [...resultBrand];
    if (selectedSort === "low") {
      sortedResults.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "high") {
      sortedResults.sort((a, b) => b.price - a.price);
    }
    setSortingOut(sortedResults);
  }, [selectedSort, resultBrand]);

  function capitalizeAndSpace(input) {
    const str = String(input);
    const capitalized = str.replace(/\b\w/g, (char) => char.toUpperCase());
    const spaced = capitalized.replace(/([A-Z])/g, " $1").trim();
    return spaced;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedResults = sortingOut.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  //fetch the first image of the product
  const firstImages = paginatedResults.map((item) => item.image.split(",")[0]);

  async function handleModal(fileData) {
    const category = fileData.category;
    const brand = fileData.brand;
    const name = fileData.name;

    setSelectedProduct(fileData);
    localStorage.setItem("selectedProducts", JSON.stringify(fileData));

    navigate(`/product/${category}/${brand}/${name}`);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function handleCategoryAll(all) {
    const { data } = await api.get("/products");
    setStyleProducts(data);
    localStorage.setItem("styleProducts", JSON.stringify(data));

    navigate(`/product/${all}`);
  }
  async function handleCategoryFullFace(fullface) {
    const { data } = await api.get(`/product/${fullface}`);
    setStyleProducts(data);
    localStorage.setItem("styleProducts", JSON.stringify(data));

    navigate(`/product/${fullface}`);
  }

  return (
    <div className="fullface">
      <PagesHero />
      <Container className="productBasis">
        <Row className="containeRow">
          <Col xs={4} md={3} className="bgMenu pt-3">
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ marginBottom: "1rem" }}>Products Available</h3>
              <div className="prodOptions">
                <label htmlFor="all">
                  <input
                    type="radio"
                    id="all"
                    name="helmetRider"
                    onClick={() => handleCategoryAll("all")}
                  />
                  All
                </label>
                <label htmlFor="fullface">
                  <input
                    type="radio"
                    id="fullface"
                    name="helmetRider"
                    onClick={() => handleCategoryFullFace("fullFace")}
                  />
                  Full Face
                </label>
                <label htmlFor="adventure">
                  <input
                    type="radio"
                    id="adventure"
                    name="helmetRider"
                    onClick={() => handleCategoryFullFace("offRoad")}
                  />
                  Adventure
                </label>
                <label htmlFor="cruise">
                  <input
                    type="radio"
                    id="cruise"
                    name="helmetRider"
                    onClick={() => handleCategoryFullFace("openFace")}
                  />
                  Cruise
                </label>
                <label htmlFor="gear">
                  <input
                    type="radio"
                    id="gear"
                    name="helmetRider"
                    onClick={() => handleCategoryFullFace("gear")}
                  />
                  Gear
                </label>
                <label htmlFor="accessories">
                  <input
                    type="radio"
                    id="accessories"
                    name="helmetRider"
                    onClick={() => handleCategoryFullFace("accessories")}
                  />
                  Accessories
                </label>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "2rem" }}>
              <h3 style={{ marginBottom: "1rem" }}>Filter by Brand</h3>
              <select
                onChange={(e) => setFilterBrand(e.target.value)}
                value={filterBrand}
              >
                <option value="All">All</option>
                {[...new Set(filterOut.map((item) => item.brand))].map(
                  (brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  )
                )}
              </select>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "2rem" }}>
              <h3 style={{ marginBottom: "1rem" }}>Sort by Price</h3>
              <select
                onChange={(e) => setSelectedSort(e.target.value)}
                value={selectedSort}
              >
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>
          </Col>
          <Col xs={8} md={9} className="parentResult">
            <Row>
              {paginatedResults.map((price, i) => {
                return (
                  <Col
                    xl={3}
                    md={4}
                    sm={6}
                    key={i}
                    style={{ cursor: "pointer" }}
                    className="cardCase"
                  >
                    <div className="card bg-white p-2 shadow-sm cardImages mt-4">
                      <img src={firstImages[i]} alt="" />
                      <p className="m-0 text-dark">{price.brand}</p>
                      <Card title={price.name} className="shadow-none">
                        <p className="m-0 text-dark">{currency(price.price)}</p>
                      </Card>
                      <Button
                        className="btnCheckOut px-5"
                        color="dark"
                        variant="solid"
                        onClick={() => handleModal(price)}
                      >
                        CHECK-OUT
                      </Button>
                    </div>
                  </Col>
                );
              })}
            </Row>
            <Row className="paginationKey">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={sortingOut.length}
                onChange={handlePageChange}
                style={{
                  margin: "20px 0px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  gap: "5px",
                }}
              />
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal
        title={modalData.name}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default Fullface;
