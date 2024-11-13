import "./PagesHero.css";
import evo from "../assets/1c-a.mp4";
import fullFace from "../assets/1a-a.mp4";
import racing from "../assets/1b-a.mp4";
import openFace from "../assets/1d-a.mp4";
import offRoad from "../assets/1e-a.mp4";
import helmet from "../assets/1f-a.mp4";
import accessories from "../assets/1g.mp4";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PagesHero = () => {
  const location = useLocation();
  const bgBasis = location.pathname;

  const [video, setVideo] = useState(null);

  useEffect(() => {
    const allContents = document.getElementById("allContents");

    if (bgBasis === "/product/offRoad") {
      setVideo(offRoad);
      allContents.innerHTML = "Off Road";
    } else if (bgBasis === "/product/openFace") {
      setVideo(openFace);
      allContents.innerHTML = "Open Faces";
    } else if (bgBasis === "/product/fullFace") {
      setVideo(fullFace);
      allContents.innerHTML = "Full Face";
    } else if (bgBasis === "/product/gear") {
      setVideo(fullFace);
      allContents.innerHTML = "Gear";
    } else if (bgBasis === "/product/accessories") {
      setVideo(accessories);
      allContents.innerHTML = "Accessories";
    } else if (bgBasis === "/product/cruise") {
      setVideo(evo);
      allContents.innerHTML = "Cruise";
    } else if (bgBasis === "/product/tour") {
      setVideo(helmet);
      allContents.innerHTML = "Tour";
    } else if (bgBasis === "/product/racing") {
      setVideo(racing);
      allContents.innerHTML = "Racing";
    } else if (bgBasis === "/product/adventure") {
      setVideo(offRoad);
      allContents.innerHTML = "Adventure";
    } else if (bgBasis === "/product/fullFace&&openFace&&offRoad") {
      setVideo(helmet);
      allContents.innerHTML = "Helmet";
    } else {
      setVideo(openFace);
      allContents.innerHTML = "Products";
    }

    return () => {};
  }, [bgBasis]);

  return (
    <div className="pageshero">
      {video && (
        <video key={video} autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
        </video>
      )}
      <div className="textLight">
        <p className="performance">PERFORMANCE</p>
        <p id="allContents" className="m-0"></p>
      </div>
    </div>
  );
};

export default PagesHero;
