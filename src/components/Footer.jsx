import {
  Box,
  HStack,
  Image,
  StackDivider,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import logo from "../assets/logo.png";

function Footer() {
  const [isLessThanSM] = useMediaQuery("(max-width: 30em)");

  return (
    <HStack
      mt={3}
      width="100%"
      bgColor="#F8F8F8"
      p={8}
      divider={<StackDivider borderColor="gray.200" />}
      justifyContent="center"
      alignItems="start"
      spacing={5}
    >
      <VStack spacing="3" justifyContent="start" w="20%">
        <Box width="100%">
          <Image src={logo} w="130px" />
        </Box>
        <Text fontSize="sm" color="#6A6975">
          Your Ecommerce website helping out pastime sellers to sell
          merchandises and services
        </Text>
      </VStack>
      {!isLessThanSM && (<HStack alignItems="start">
        <VStack>
          <Text fontSize="sm">MENS</Text>
          <Text fontSize="xs">Shirts</Text>
          <Text fontSize="xs">Blazers</Text>
          <Text fontSize="xs">Trousers</Text>
          <Text fontSize="xs">Jeans</Text>
        </VStack>
        <VStack>
          <Text fontSize="sm">WOMENS</Text>
          <Text fontSize="xs">Dresses</Text>
          <Text fontSize="xs">Lingerie</Text>
          <Text fontSize="xs">Bags</Text>
          <Text fontSize="xs">Shoes</Text>
          <Text fontSize="xs">Hats</Text>
          <Text fontSize="xs">Jewellery</Text>
        </VStack>
        <VStack>
          <Text fontSize="sm">Kids</Text>
          <Text fontSize="xs">Sweaters</Text>
          <Text fontSize="xs">Shorts</Text>
          <Text fontSize="xs">Toys</Text>
          <Text fontSize="xs">T-shirts</Text>
        </VStack>
      </HStack>)}
    </HStack>
  );
}

export default Footer;
