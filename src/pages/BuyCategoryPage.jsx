import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Tag,
  Text,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useNavigate, useParams } from "react-router-dom";
import productSample from "../assets/product-sample.png";
import CategoryOptions from "../components/CategoryOptions";
import PageWrapper from "../components/PageWrapper";
import PrivateComponent from "../components/PrivateComponent";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import useCart from "../hooks/useCart";
import useFetch from "../hooks/useFetch";

function BuyCategoryPage() {
  const toast = useToast();
  const [isLessThanSM] = useMediaQuery("(max-width: 30em)");
  const [isLessThanMD] = useMediaQuery("(max-width: 48em)");

  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const { user } = useContext(AuthContext);
  const { cartDispatch, cart, loading } = useContext(CartContext);

  const navigate = useNavigate();
  const { cat, id } = useParams();

  const { data, error, loading: pageLoading } = useFetch(`/category/${id}`);
  const { addToCart, verifyCategoryToCart } = useCart();

  const quantityErrorHandler = () => {
    toast({
      title: `Do not exceed the limit`,
      status: "error",
      isClosable: true,
    });
    setQuantity(1);
  };

  const addToCartHandler = async () => {
    if (user === null) {
      navigate("/login");
    } else {
      await addToCart(id, quantity);
    }
  };

  useEffect(() => {
    const isAddedInfo = verifyCategoryToCart(id);
    setIsAdded(isAddedInfo.isAdded);
    setQuantity(isAddedInfo.quantity);
  }, [cart]);

  return (
    <PageWrapper>
      <Grid
        gridTemplateColumns="repeat(10, 1fr)"
        columnGap={isLessThanMD ? 2 : 4}
        mt={5}
      >
        {pageLoading ? (
          <Box padding="6" boxShadow="lg" bg="white" width={"80vw"}>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        ) : (
          <>
            {!isLessThanSM && (
              <GridItem colSpan={2}>
                <CategoryOptions page="buypage" />
              </GridItem>
            )}
            <GridItem colSpan={isLessThanSM ? 10 : 8}>
              <VStack alignSelf="start" width="100%">
                {isLessThanSM && (
                  <CategoryOptions label="small" page="buypage" />
                )}

                <Grid
                  templateColumns="repeat(10, 1fr)"
                  columnGap={isLessThanMD ? 0 : 7}
                  rowGap={isLessThanMD ? 7 : 0}
                  width="100%"
                >
                  <GridItem colSpan={isLessThanMD ? 10 : 5}>
                    <Image
                      w="full"
                      src={data?.picture || productSample}
                      borderRadius="2xl"
                    />
                  </GridItem>
                  <GridItem colSpan={isLessThanMD ? 10 : 5}>
                    <Card variant="filled" bgColor="#F8F8F8" borderRadius="2xl">
                      <CardHeader>
                        <HStack spacing={4}>
                          {data?.tags.map((tag) => (
                            <Tag
                              key={tag}
                              variant="solid"
                              bgColor={"#773903"}
                              size="md"
                            >
                              {tag}
                            </Tag>
                          ))}
                        </HStack>

                        <Heading size="lg" mt={4}>
                          {data?.productName}
                        </Heading>
                      </CardHeader>
                      <CardBody>
                        <Box display={"block"} w="full">
                          <Text width="100%" display={"block"}>
                            {data?.description}
                          </Text>
                        </Box>
                      </CardBody>
                      <CardFooter>
                        <HStack justifyContent="space-between" width="100%">
                          <Text
                            fontSize="3xl"
                            fontWeight="bold"
                            color="#FF5D15"
                          >
                            ${data?.price}
                          </Text>
                          <PrivateComponent
                            authComp={
                              // <StarRating size={isLessThanSM ? "md" : "lg"} val={data?.numberOfLikes} />
                              <Rating
                                initialRating={data?.numberOfLikes}
                                emptySymbol={<FaStar color="#bbb" />}
                                fullSymbol={<FaStar color="#ffc107" />}
                                emptyColor="#bbb"
                                fullColor="#ffc107"
                              />
                            }
                          />
                        </HStack>
                      </CardFooter>
                    </Card>

                    <NumberInput
                      defaultValue={quantity || 1}
                      min={1}
                      max={data?.quantity}
                      mt={6}
                      focusBorderColor="teal"
                      value={quantity}
                      onChange={(val) => setQuantity(val)}
                      onInvalid={quantityErrorHandler}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                    <Stack
                      direction="row"
                      width="100%"
                      my={6}
                      justifyContent={"end"}
                    >
                      <Button
                        colorScheme="teal"
                        borderRadius="3xl"
                        px={5}
                        onClick={addToCartHandler}
                        disabled={loading}
                      >
                        {isAdded ? "Update to Cart" : "Add to Cart"}
                      </Button>
                      {/* <IconButton
                        onClick={() => setIsLiked(!isLiked)}
                        disabled={isLiked}
                        icon={isLiked ? <BsSuitHeartFill /> : <BsSuitHeart />}
                        variant="ghost"
                        colorScheme="red"
                      /> */}
                    </Stack>
                  </GridItem>
                </Grid>
              </VStack>
            </GridItem>
          </>
        )}
      </Grid>
    </PageWrapper>
  );
}

export default BuyCategoryPage;
