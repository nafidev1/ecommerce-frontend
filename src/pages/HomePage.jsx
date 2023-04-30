import {
  Box,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  SkeletonCircle,
  SkeletonText,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ForYou from "../assets/for-you.png";
import LandingImg from "../assets/landing-img.png";
import CategoryCard from "../components/CategoryCard";
import PageWrapper from "../components/PageWrapper";
import CategoryOptions from "../components/CategoryOptions";
import TagList from "../components/TagList";
import { CategoryContext } from "../contexts/CategoryContext";
import useFetch from "../hooks/useFetch";

function HomePage() {
  const [isLessThanSM] = useMediaQuery("(max-width: 30em)");
  const [isLessThanMD] = useMediaQuery("(max-width: 48em)");

  const { currentTab, currentType, categoryDispatch } =
    useContext(CategoryContext);
  const categoriesUrl =
    currentTab === undefined
      ? `/category/type/${currentType}/`
      : `/category/type/${currentType}/?tags=${currentTab}`;
  const { data, error, loading, reFetch } = useFetch(categoriesUrl);
  // const { data, error, loading, reFetch } = useFetch('/');

  useEffect(() => {
    categoryDispatch({ type: "RESET_OPTIONS" });
  }, []);

  return (
    <PageWrapper>
      <VStack>
        {/* Top Section with landing image and CategoryOptions */}
        <Grid
          gridTemplateColumns="repeat(10, 1fr)"
          columnGap={isLessThanMD ? 2 : 4}
          my={4}
        >
          {!isLessThanSM && (
            <GridItem colSpan={2}>
              <CategoryOptions style={{ float: "left" }} />
            </GridItem>
          )}
          <GridItem colSpan={isLessThanSM ? 10 : 8}>
            <VStack alignItems="start">
              {isLessThanSM ? <CategoryOptions label="small" /> : <TagList />}

              {!isLessThanSM && (
                <Box>
                  <Image src={LandingImg} objectFit="cover" borderRadius="lg" />
                </Box>
              )}
            </VStack>
          </GridItem>
        </Grid>

        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={4} width="100%">
          {!isLessThanMD && <Image src={ForYou} />}
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
            : data?.map((category) => (
                <Link
                  to={`/buy/${category.type}/${category?._id}`}
                  key={category._id}
                >
                  <CategoryCard
                    productId={category?._id}
                    image={category?.picture}
                    tags={
                      currentTab === undefined
                        ? category.tags
                        : Array(currentTab)
                    }
                    price={category.price}
                    name={category.productName}
                    rating={category.numberOfLikes}
                  />
                </Link>
              ))}
        </SimpleGrid>
      </VStack>
    </PageWrapper>
    // <Flex justifyContent="space-between" flexDir="column" height="100vh">
    //   <Box pr={4} pl={4}>
    //     <TopNavbar />
    //     <Box height="100vh" bgColor="red" />
    //   </Box>
    //   <Footer />
    // </Flex>
  );
}

export default HomePage;
