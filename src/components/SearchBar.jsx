import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  StackDivider,
  Tag,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import { ax } from "../utils/constants";

function SearchBar({ setIsShowSearch, withCancelButton, label = "small" }) {
  const [isLessThanSM] = useMediaQuery("(max-width: 30em)");
  const [isOpen, setIsOpen] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const isSearchActive = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchSearchResults = async () => {
      try {
        const res = await ax.get("/category/search/?search=" + searchQuery);
        setSearchRes(res.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };
    fetchSearchResults();
    setLoading(false);
  }, [searchQuery]);

  const handleTextChange = (text) => {
    setSearchQuery(text);
    isSearchActive.current = true;
    setIsOpen(searchRes.length > 0 && isSearchActive.current);
  };

  return (
    <Popover isOpen={isOpen} autoFocus={false} w="100%">
      <PopoverTrigger>
        <VStack>
          <InputGroup w="100%">
            <Input
              ref={isSearchActive}
              type="text"
              placeholder="Search"
              focusBorderColor="#25ABB2"
              onChange={(e) => handleTextChange(e.target.value)}
            />

            {withCancelButton && label === "small" ? (
              <InputRightElement>
                <IconButton
                  size={"sm"}
                  colorScheme="teal"
                  aria-label="Search"
                  icon={<ImCross />}
                  onClick={() => setIsShowSearch(false)}
                />
              </InputRightElement>
            ) : isOpen ? (
              <InputRightElement>
                <IconButton
                  size={"sm"}
                  colorScheme="teal"
                  aria-label="Search"
                  icon={<ImCross />}
                  onClick={() => setIsOpen(false)}
                />
              </InputRightElement>
            ) : (
              <InputRightElement>
                <IconButton
                  size={"sm"}
                  colorScheme="teal"
                  aria-label="Search"
                  icon={<FaSearch />}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </VStack>
      </PopoverTrigger>
      <PopoverContent w={isLessThanSM ? "90vw" : "50vw"}>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          align="stretch"
          maxH={"50vh"}
          overflowY={"auto"}
        >
          {loading
            ? Array.from({ length: 3 }, (item, index) => (
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
            : searchRes?.map((item) => (
                <Link to={`/buy/${item.type}/${item._id}`} key={item._id}>
                  <HStack
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                    p={2}
                    align="start"
                  >
                    {!isLessThanSM && (
                      <Image
                        boxSize={"60px"}
                        src={item?.picture}
                        borderRadius="2xl"
                        objectFit={"cover"}
                      />
                    )}
                    <VStack alignItems={"start"}>
                      <Heading as="h5" size={isLessThanSM ? "sm" : "md"}>
                        {item.productName}
                      </Heading>
                      <Text fontSize="xs" color="#773903">
                        {item?.tags?.map((tag) => (
                          <Tag
                            key={tag}
                            size="sm"
                            variant="solid"
                            colorScheme="teal"
                            mr={2}
                          >
                            {tag}
                          </Tag>
                        ))}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Rating
                      initialRating={item?.numberOfLikes}
                      readonly={true}
                      emptySymbol={<FaStar color="#bbb" />}
                      fullSymbol={<FaStar color="#ffc107" />}
                      emptyColor="#bbb"
                      fullColor="#ffc107"
                    />
                  </HStack>
                </Link>
              ))}
        </VStack>
      </PopoverContent>
    </Popover>
  );
}

export default SearchBar;
