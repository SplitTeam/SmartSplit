
  import { createRoot } from "react-dom/client";
  import App from "./App";
  // Import compiled Tailwind utilities first (generated `index.css`) so all
  // utility classes are available, then load `globals.css` which contains
  // project-specific rules and the custom cursor styles that should override
  // defaults when necessary.
  // @ts-ignore: allow importing CSS without type declarations
  import "./index.css";
  // @ts-ignore: allow importing CSS without type declarations
  import "./styles/globals.css";
  import React from "react";
  import CustomCursor from "./components/CustomCursor";

  createRoot(document.getElementById("root")!).render(
    <>
      <App />
      <CustomCursor />
    </>
  );
