export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "AUTH_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return {
        loading: action.payload,
        ...state,
      };
    default:
      throw Error("Auth Reducer Error");
  }
};
