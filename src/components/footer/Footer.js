import React from "react";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundColor: "#8dc647" }}>
      <div
        className="footer__container"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          marginTop: "20px",
          color: "white",
        }}
      >
        <p>
          <strong>© 2023 CoinGecko</strong>
        </p>
      </div>
    </div>
  );
};

export default Footer;
