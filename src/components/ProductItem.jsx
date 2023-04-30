import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Text,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { HiStar } from "react-icons/hi";
import productImg from "../assets/product-sample.png";
import { CartContext } from "../contexts/CartContext";
import StarRating from "./StarRating";

function ProductItem({
  name = "XXX",
  price = "XXX",
  isDelivery = true,
  qty = "XXX",
  rating = "XXX",
  qtyAvailable = "XXX",
  image = productImg,
  productId,
  isNumInputDisabled = false,
  isStarDisabled = true,
}) {
  const toast = useToast();
  const [isLessThanSM] = useMediaQuery("(max-width: 30em)");
  //   const [isLessThanMD] = useMediaQuery("(max-width: 48em)");
  const [quantity, setQuantity] = useState(qty || 1);
  const { cartDispatch } = useContext(CartContext);
  useEffect(() => {
    cartDispatch({
      type: "UPDATE_QTY",
      payload: { id: productId, qty: quantity },
    });
  }, [quantity]);

  const quantityErrorHandler = () => {
    toast({
      title: `Do not exceed the limit`,
      status: "error",
      isClosable: true,
    });
    setQuantity(1);
  };
  return (
    <Flex gap={4} alignItems={"start"} h="120px">
      <Box h="100%">
        <Image
          maxH="80%"
          minH="50%"
          src={image}
          borderRadius="2xl"
          objectFit={"cover"}
        />
      </Box>

      <VStack alignItems="start">
        <Heading as="h5" size={isLessThanSM ? "sm" : "md"}>
          {name}
        </Heading>
        {!isLessThanSM && (
          <Text fontSize={"sm"} color="#707070">
            <StarRating
              isReadOnly={isStarDisabled}
              val={rating}
              id={productId}
            />
            {/* 4.5/5 <Icon as={HiStar} /> */}
          </Text>
        )}
        <Text fontSize={isLessThanSM ? "xs" : "sm"} color="#707070">
          {isDelivery ? "Providing Delivery" : "Not Providing Delivery"}
        </Text>
      </VStack>
      <Spacer />
      <Flex flexDir="column" justifyContent="space-between" h="100%">
        <Heading as="h5" size={isLessThanSM ? "sm" : "md"}>
          ${price}
        </Heading>
        <Box width={isLessThanSM ? "60px" : "71px"}>
          <NumberInput
            size={isLessThanSM ? "xs" : "sm"}
            defaultValue={1}
            min={1}
            max={qtyAvailable}
            focusBorderColor="teal"
            value={quantity}
            onChange={(val) => setQuantity(val)}
            onInvalid={quantityErrorHandler}
            disabled={isNumInputDisabled}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ProductItem;
