import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./contexts/cart/cartProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
