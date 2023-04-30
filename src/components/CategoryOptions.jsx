import {
  Flex,
  HStack,
  Icon,
  Tab,
  TabList,
  Tabs,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import { tealColor } from "../utils/constants";
import { useEffect } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import TagList from "./TagList";

function CategoryOptions({ label = "big", page = "home" }) {
  const [isLessThanMD] = useMediaQuery("(max-width: 48em)");
  const [selected, setSelected] = useState("Products");
  const items = ["Products", "Services"];
  const { categoryDispatch } = useContext(CategoryContext);

  const { cat } = useParams();

  useEffect(() => {
    if (cat !== undefined) {
      cat === "product" ? setSelected("Products") : setSelected("Services");
    }
  });

  useEffect(() => {
    categoryDispatch({
      type: "INITIAL_OPTIONS",
      payload: selected.toString().slice(0, -1).toLowerCase(),
    });
  }, [selected]);
  return label === "big" ? (
    <VStack width="100%" bgColor="#F8F8F8" borderBottomRadius="xl">
      <Flex
        bgColor={tealColor}
        borderTopRadius="xl"
        width="100%"
        justifyContent="center"
        px={4}
        py={2}
      >
        <Text fontSize={isLessThanMD ? "md" : "xl"} color="white">
          Categories
        </Text>
      </Flex>

      {/* <Link to="" style={{ width: "100%" }}> */}
      {items.map((item) => (
        <HStack
          key={item}
          justifyContent="space-between"
          width="100%"
          px={4}
          py={2}
          cursor="pointer"
          onClick={() => page === "home" && setSelected(item)}
          bg={selected === item && tealColor}
          color={selected === item && "white"}
          borderRadius={selected && "md"}
        >
          <Text>{item}</Text>
          {!isLessThanMD && <Icon as={BsArrowRight} />}
        </HStack>
      ))}
    </VStack>
  ) : (
    <Tabs
      isFitted
      width="100%"
      colorScheme="teal"
      index={selected === "Products" ? 0 : 1}
    >
      <TabList mb="1em">
        {/* <Tab>Products</Tab>
          <Tab>Products</Tab> */}
        {items.map((item) => (
          <Tab
            onClick={() => setSelected(item)}
            key={item}
            isDisabled={page === "home" ? false : true}
          >
            {item}
          </Tab>
        ))}
      </TabList>
      {page === "home" && <TagList />}
    </Tabs>
  );
}

export default CategoryOptions;
