export const CategoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_TAB":
      return {
        ...state,
        currentTab: action.payload.tag,
        currentIndex: action.payload.index,
      };
    case "SET_CURRENT_TYPE":
      return { ...state, currentType: action.payload };
    case "INITIAL_OPTIONS":
      return {
        currentTab: undefined,
        currentType: action.payload,
        currentIndex: 0,
      };
    case "RESET_OPTIONS":
      return {
        currentTab: undefined,
        currentType: "product",
        currentIndex: 0,
      };
    default:
      throw Error("Category Selection Reducer Error");
  }
};
