import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsCircleFill } from "react-icons/bs";
import { TbTruck, TbTruckOff } from "react-icons/tb";
import productImg from "../assets/product-sample.png";

function OrderItem({
  name = "XXX",
  status = "XXX",
  isDelivery = true,
  desc = "XXX",
  quantity = 1,
  price = 999,
  image = productImg,
  isSelected,
  index,
}) {
  const [isLessThanSM] = useMediaQuery("(max-width: 30em)");
  const [isLessThanMD] = useMediaQuery("(max-width: 55em)");
  return (
    <Flex
      gap={4}
      alignItems={"start"}
      minH="120px"
      cursor={"pointer"}
      _hover={{ bg: "teal.100" }}
      p={isLessThanSM ? 1 : 4}
      bg={isSelected === index && "gray.100"}
      borderRadius="xl"
    >
      <Box h="100%">
        <Image
          maxH="100%"
          minH="50%"
          src={image}
          borderRadius="2xl"
          objectFit={"cover"}
        />
      </Box>
      <VStack alignItems={"start"} spacing={1}>
        <Heading as="h5" size={isLessThanSM ? "sm" : "md"}>
          {name}
        </Heading>
        <HStack>
          <BsCircleFill size="10px" color="#37a169" />
          <Text fontSize="sm" color={"gray.500"}>
            {status}
          </Text>
        </HStack>
        <HStack>
          {isDelivery ? (
            <TbTruck fontSize="sm" color="#37a169" />
          ) : (
            <TbTruckOff fontSize="sm" color="#37a169" />
          )}
          <Text
            fontSize="sm"
            color={"gray.500"}
            textDecoration={!isDelivery && "line-through"}
          >
            Delivery
          </Text>
        </HStack>
        <Text color={"gray.500"}>{desc}</Text>
      </VStack>
      <Spacer />
      <Stack
        direction={isLessThanMD ? "column" : "row"}
        align="center"
        h="80%"
        spacing={5}
      >
        <Heading as="h5" size={isLessThanSM ? "sm" : "md"}>
          {quantity}x
        </Heading>
        <Heading as="h5" size={isLessThanSM ? "sm" : "md"} color="#f0752f">
          ${price}
        </Heading>
      </Stack>
    </Flex>
  );
}

export default OrderItem;
