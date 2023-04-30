import { useReducer } from "react";
import { createContext } from "react";
import { CategoryReducer } from "../reducers/CategoryReducer";

const INITIAL_STATE = {
  currentTab: undefined,
  currentType: "product",
  currentIndex: 0,
};

export const CategoryContext = createContext(INITIAL_STATE);

export const CategoryContextProvider = ({ children }) => {
  const [categoryState, categoryDispatch] = useReducer(
    CategoryReducer,
    INITIAL_STATE
  );
  return (
    <CategoryContext.Provider
      value={{
        currentTab: categoryState.currentTab,
        currentType: categoryState.currentType,
        currentIndex: categoryState.currentIndex,
        categoryDispatch,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
