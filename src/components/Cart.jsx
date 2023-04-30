import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik, yupToFormErrors } from "formik";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import FieldInput from "./FieldInput";
import * as Yup from "yup";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import ProductList from "./ProductList";
import { useState } from "react";
import Map from "./Map";
import CardInput from "./CardInput";
import { useEffect } from "react";
import { ax } from "../utils/constants";
import { useNavigate } from "react-router-dom";

function Cart({ products }) {
  //   const [isLessThanSM] = useMediaQuery("(max-width: 30em)");
  const [isLessThanMD] = useMediaQuery("(max-width: 48em)");
  const { loading, cart, total, cartDispatch } = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState("");
  const [isCardValid, setIsCardValid] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const res = await ax.post("/payment/initialize", { total });
        setClientSecret(res.data?.clientSecret);
      } catch (error) {
        console.log(error.response?.data);
      }
    };
    total > 0 && getClientSecret();
    console.log(clientSecret);
  }, [total]);

  return (
    <Grid templateColumns="repeat(10, 1fr)">
      <GridItem colSpan={isLessThanMD ? 10 : 5}>
        {loading ? (
          Array.from({ length: 3 }, (item, index) => (
            <Box padding="6" boxShadow="lg" bg="white" key={index}>
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
          ))
        ) : (
          <ProductList label="cart" products={products} />
        )}
      </GridItem>

      <GridItem
        colSpan={isLessThanMD ? 10 : 5}
        ml={isLessThanMD ? 0 : 10}
        mt={isLessThanMD ? 10 : 0}
      >
        <VStack
          w="100%"
          h="100%"
          alignItems="start"
          // justifyContent="center"
          spacing={5}
        >
          <Box w="full">
            <Heading size="lg">Payment</Heading>
            <Divider orientation="horizontal" my={4} />
            <Formik
              initialValues={{
                description: "",
                location: "",
                card: "",
              }}
              validationSchema={Yup.object({
                description: Yup.string().required("Description required"),
                location: Yup.string().required("Location required"),
                card: Yup.string().required("Card required"),
              })}
              onSubmit={async (values, actions) => {
                setPaymentLoading(true);
                try {
                  await stripe
                    .confirmCardPayment(clientSecret, {
                      payment_method: {
                        card: elements.getElement(CardElement),
                      },
                    })
                    .then(async (result) => {
                      values.card = "paid";
                      const res = await ax.post("/payment/create", {
                        cart,
                        values,
                      });
                      console.log(res.data);
                      console.log("cart", cart);

                      cartDispatch({ type: "UPDATE_CART", payload: [] });

                      toast({
                        title: "Purchased 🥳!",
                        status: "success",
                        isClosable: true,
                      });
                      navigate("/");
                    });
                } catch (error) {
                  console.log(error.response?.data);
                  toast({
                    title: error.response?.data?.message,
                    status: "error",
                    isClosable: true,
                  });
                }
                setPaymentLoading(false);
              }}
            >
              {(formik) => (
                <Grid
                  w="full"
                  h="full"
                  templateColumns="repeat(2, 1fr)"
                  gap={2}
                >
                  <GridItem colSpan={2}>
                    <Map name="location" />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FieldInput
                      placeholder="Description"
                      focusBorderColor="#25ABB2"
                      name="description"
                    />
                  </GridItem>

                  <GridItem colSpan={2}>
                    <CardInput name="card" setIsCardValid={setIsCardValid} />
                  </GridItem>

                  <GridItem colSpan={2}>
                    <Button
                      disabled={!isCardValid || paymentLoading || total <= 0}
                      width="100%"
                      colorScheme="green"
                      type="button"
                      onClick={formik.handleSubmit}
                    >
                      {paymentLoading ? <Spinner /> : `Pay $${total}`}
                    </Button>
                  </GridItem>
                </Grid>
              )}
            </Formik>
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
}

export default Cart;
