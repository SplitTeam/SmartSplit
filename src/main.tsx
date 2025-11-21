
  import { createRoot } from "react-dom/client";
  import App from "./App";
  // @ts-ignore: allow importing CSS without type declarations
  import "./index.css";
  import React from "react";
  import CustomCursor from "./components/CustomCursor";

  createRoot(document.getElementById("root")!).render(
    <>
      <App />
      <CustomCursor />
    </>
  );
