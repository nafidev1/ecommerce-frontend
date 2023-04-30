import { useToast } from "@chakra-ui/react";
import { useReducer } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { CartReducer } from "../reducers/CartReducer";
import { ax } from "../utils/constants";
import { CategoryContext } from "./CategoryContext";

const INITIAL_STATE = {
  cart: [],
  error: null,
  loading: false,
  counter: 0,
  total: 0
};

export const CartContext = createContext(INITIAL_STATE);

export const CartContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(CartReducer, INITIAL_STATE);
    
  return (
    <CartContext.Provider
      value={{
        cart: cartState.cart,
        error: cartState.error,
        total: cartState.total,
        loading: cartState.loading,
        counter: cartState.counter,
        cartDispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
