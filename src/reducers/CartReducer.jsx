export const CartReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "START_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "UPDATE_CART":
      return {
        ...state,
        cart: action.payload,
        counter: action.payload?.length,
        loading: false,
      };
    case "UPDATE_QTY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item._id === action.payload.id)
            return { ...item, quantity: action.payload.qty };
          return item;
        }),
      };
    case "UPDATE_TOTAL":
      return {
        ...state,
        total: state.cart.reduce(
          (acc, current) => acc + current.category.price * current.quantity,
          0
        ),
      };
    default:
      throw Error("Cart Reducer Error");
  }
};

