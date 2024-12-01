// src/Footer.js
import React from "react";
import Wrapper from "./wrapper";

function Footer() {
  return (
    <footer className="p-2 z-30" style={styles.footer}>
      <Wrapper>
        <div style={styles.footerMenu}>
          <p>&copy; 2024 GDG 3D-Avatar Team</p>
        </div>
      </Wrapper>
    </footer>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: "#282c34",
    // padding: "10px",
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  footerMenu: {},
};

export default Footer;
