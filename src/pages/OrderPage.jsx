import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SkeletonCircle,
  SkeletonText,
  Stack,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import OrderItem from "../components/OrderItem";
import PageWrapper from "../components/PageWrapper";
import ReadOnlyMap from "../components/ReadOnlyMap";
import useFetch from "../hooks/useFetch.jsx";

function OrderPage() {
  const [isLessThanSM] = useMediaQuery("(max-width: 30em)");
  const [isLessThanMD] = useMediaQuery("(max-width: 48em)");

  const { data, error, loading } = useFetch("/payment/orders");
  const [isSelected, setIsSelected] = useState(0);
  const [lat, setLat] = useState(undefined);
  const [long, setLong] = useState(undefined);

  useEffect(() => {
    setLat(data && data[0]?.latitude);
    setLong(data && data[0]?.longitude);
  }, [data]);

  const itemClickHandler = (idx, lat, long) => {
    setIsSelected(idx);
    setLat(lat);
    setLong(long);
  };

  return (
    <PageWrapper>
      <VStack w="100%" alignItems={"start"} spacing={6} mt={4}>
        <Heading as="h2" size="lg">
          Orders Received
        </Heading>
        <Divider orientation="horizontal" />
        <Grid
          gridTemplateColumns={isLessThanMD ? "1fr" : "repeat(10, 1fr)"}
          gap={10}
          w="100%"
        >
          <GridItem colSpan={isLessThanMD ? "1fr" : 4}>
            <Stack
              dir="column"
              spacing={4}
              w="100%"
              divider={<Divider orientation="horizontal" />}
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
                : isLessThanMD
                ? data?.map((item, index) => (
                    <Popover
                      isLazy={true}
                      placement="bottom"
                      key={item._id}
                      w="100%"
                    >
                      <PopoverTrigger>
                        <Box
                          role={"button"}
                          onClick={() =>
                            itemClickHandler(
                              index,
                              item?.latitude,
                              item?.longitude
                            )
                          }
                        >
                          <OrderItem
                            name={item?.category?.productName}
                            status={item?.status}
                            isDelivery={item?.category?.isDelivery}
                            desc={item?.description}
                            quantity={item?.quantity}
                            price={item?.category?.price}
                            image={item?.category?.picture}
                            isSelected={isSelected}
                            index={index}
                          />
                        </Box>
                      </PopoverTrigger>
                      <PopoverContent w="90vw">
                        <PopoverHeader fontWeight="semibold">
                          Location
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Box h="300px" w="100%">
                            <ReadOnlyMap lat={lat} long={long} />
                          </Box>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  ))
                : data?.map((item, index) => (
                    <Box
                      onClick={() =>
                        itemClickHandler(index, item?.latitude, item?.longitude)
                      }
                      key={item._id}
                    >
                      <OrderItem
                        index={index}
                        isSelected={isSelected}
                        name={item?.category?.productName}
                        status={item?.status}
                        isDelivery={item?.category?.isDelivery}
                        desc={item?.description}
                        quantity={item?.quantity}
                        price={item?.category?.price}
                        image={item?.category?.picture}
                      />
                    </Box>
                  ))}
            </Stack>
          </GridItem>

          {!isLessThanMD && (
            <GridItem colSpan={6} flex="1" height={"70vh"}>
              <ReadOnlyMap lat={lat} long={long} />
            </GridItem>
          )}
        </Grid>
      </VStack>
    </PageWrapper>
  );
}

export default OrderPage;
