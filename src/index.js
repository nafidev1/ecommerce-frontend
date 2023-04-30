import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { CategoryContextProvider } from "./contexts/CategoryContext";
import { CartContextProvider } from "./contexts/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <CartContextProvider>
      <AuthContextProvider>
        <CategoryContextProvider>
          <App />
        </CategoryContextProvider>
      </AuthContextProvider>
    </CartContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
