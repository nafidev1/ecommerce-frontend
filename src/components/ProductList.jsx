import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

import ProductItem from "./ProductItem";
import { useEffect } from "react";
import { useState } from "react";
import useCart from "../hooks/useCart";

function ProductList({ label, width, products = [] }) {
  return (
    <Card variant="unstyled" width={width || "100%"}>
      <CardHeader>
        <Heading size="lg">
          {label === "cart" ? "Cart" : "Items bought"}
        </Heading>
        <Divider orientation="horizontal" my={4} />
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4" w="100%">
          {products?.length === 0 ? (
            <Text fontSize="lg" textAlign={"center"} color="gray.500">
              Nothing to display
            </Text>
          ) : (
            products?.map((product) => {
              return (
                <ProductItem
                  isStarDisabled={label === "bought" ? false : true}
                  isNumInputDisabled={label === "bought" ? true : false}
                  name={product.category.productName}
                  key={label === "bought" ? product._id : product.category._id}
                  price={product.category.price}
                  isDelivery={product.category.isDelivery}
                  qty={product.quantity}
                  rating={product.category.numberOfLikes}
                  qtyAvailable={product.category.quantity}
                  image={product.category.picture}
                  productId={
                    label === "bought" ? product.category._id : product._id
                  }
                />
              );
            })
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default ProductList;
