// src/wrapper.js
import React, { FC, ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <div style={styles.wrapper}>{children}</div>;
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    textAlign: "center",
    justifyContent: "center",
    width: "1300px",
    maxWidth: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    gap: "16px",
    padding: "20px 0"
  },
};

export default Wrapper;
