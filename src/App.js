import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CategoryPage from "./pages/ChooseCategoryPage";
import AddCategory from "./pages/AddCategoryPage";
import BuyCategoryPage from "./pages/BuyCategoryPage";
import BuyingPage from "./pages/BuyingPage";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./contexts/CartContext";
import { AuthContext } from "./contexts/AuthContext";
import useCart from "./hooks/useCart";
import PrivateRoute from "./components/PrivateRoute";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ax } from "./utils/constants";
import OrderPage from "./pages/OrderPage";

function App() {
  const { user } = useContext(AuthContext);
  const { cartDispatch, cart } = useContext(CartContext);

  const { refreshCartList } = useCart();
  const [stripePromise, setStripePromise] = useState();

  useEffect(() => {
    const loadStripeAsync = async () => {
      const res = await ax.get("/payment/stripe_publishable_key");
      const pub_key = loadStripe(res.data);
      setStripePromise(pub_key);
    };
    loadStripeAsync();
  }, []);

  useEffect(() => {
    if (user) {
      const updateCart = async () => {
        await refreshCartList();
      };
      updateCart();
    } else {
      cartDispatch({ type: "UPDATE_CART", payload: [] });
    }
  }, [user]);

  return (
    <div>
      <ChakraProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/add/category"
            element={
              <PrivateRoute>
                <CategoryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/category/:cat"
            element={
              <PrivateRoute>
                <AddCategory />
              </PrivateRoute>
            }
          />
          <Route path="/buy/:cat/:id" element={<BuyCategoryPage />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Elements stripe={stripePromise}>
                  <BuyingPage />
                </Elements>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
