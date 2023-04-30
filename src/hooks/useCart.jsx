import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { ax } from "../utils/constants";

const useCart = () => {
  const { cartDispatch, cart, error, counter, total } = useContext(CartContext);
  const toast = useToast();

  const addToCart = async (categoryId, quantity) => {
    cartDispatch({ type: "START_LOADING" });

    try {
      const res = await ax.post("/cart", { category: categoryId, quantity });
      cartDispatch({ type: "UPDATE_CART", payload: res.data?.categories });
    } catch (err) {
      cartDispatch({ type: "SET_ERROR", payload: err.response?.data?.message });
    }
    cartDispatch({ type: "STOP_LOADING" });
  };

  const refreshCartList = async () => {
    cartDispatch({ type: "START_LOADING" });
    let res;
    try {
      res = await ax.get("/cart/");
      cartDispatch({ type: "UPDATE_CART", payload: res.data });
    } catch (err) {
      console.log(err);
      cartDispatch({ type: "SET_ERROR", payload: err.response?.data });
    }
    cartDispatch({ type: "STOP_LOADING" });
  };

  const verifyCategoryToCart = (categoryId) => {
    let result = { isAdded: false, quantity: 1 };
    cart.some((item) => {
      if (item.category._id === categoryId) {
        result = { isAdded: true, quantity: item.quantity };
      }
    });
    return result;
  };

  useEffect(() => {
    cartDispatch({ type: "UPDATE_TOTAL" });
  }, [cart]);

  useEffect(() => {
    if (error)
      toast({
        title: error,
        status: "error",
        isClosable: true,
      });
    cartDispatch({ type: "SET_ERROR", payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return {
    addToCart,
    cart,
    refreshCartList,
    verifyCategoryToCart,
  };
};

export default useCart;
