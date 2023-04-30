import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import productSample from "../assets/product-sample.png";
import StarRating from "./StarRating";

function CategoryCard({ image, tags, price, name, rating, productId }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Card
      maxW="sm"
      variant="filled"
      bgColor="#F8F8F8"
      width="100%"
      borderRadius="lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardBody>
        <Box overflow="hidden">
          <Image
            src={image || productSample}
            alt="Category Image"
            borderRadius="lg"
            verticalAlign="middle"
            transition="all 0.5s ease"
            transform={isHovering ? "scale(1.3)" : "scale(1.0)"}
          />
        </Box>
        <HStack justifyContent="space-between">
          <VStack alignItems="start" justifyItems="start" spacing={1} mt={2}>
            <Text fontSize="xs" color="#773903">
              {tags?.map((tag) => (
                <Tag key={tag} variant="solid" colorScheme="teal" mr={2}>
                  {tag}
                </Tag>
              ))}
            </Text>
            <Heading size="md">{name}</Heading>
            <Rating
              readonly={true}
              initialRating={rating}
              emptySymbol={<FaStar color="#bbb" />}
              fullSymbol={<FaStar color="#ffc107" />}
              emptyColor="#bbb"
              fullColor="#ffc107"
            />
            {/* <StarRating isReadOnly={true} val={rating} id={productId} /> */}
            {/* <Text fontSize="xs" fontWeight="bold">
              4.5/5 Rating
            </Text> */}
          </VStack>
          <Heading size="md" color="#FF5D15">
            ${price}
          </Heading>
        </HStack>
      </CardBody>
    </Card>
  );
}

export default CategoryCard;
