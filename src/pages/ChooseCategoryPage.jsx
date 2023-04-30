import {
  Heading,
  HStack,
  Image,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import productImg from "../assets/product-img.png";
import serviceImg from "../assets/service-img.png";

function ChooseCategoryPage() {
  const [isLessThanSM] = useMediaQuery("(max-width: 30em)");
  const productUrl = "/category/Product";
  const serviceUrl = "/category/Service";

  return (
    <PageWrapper>
      <VStack width="100%" spacing={4} mt={8} mb={8}>
        <Heading size="lg" as="h4">
          Start Selling
        </Heading>
        <Heading size="md" as="h4">
          Select Type
        </Heading>

        {isLessThanSM ? (
          <>
            <Link to={`${productUrl}`}>
              <Image w="200px" h="200px" src={productImg} />
            </Link>
            <Link to={`${serviceUrl}`}>
              <Image w="200px" h="200px" src={serviceImg} />
            </Link>
          </>
        ) : (
          <HStack>
            <Link to={`${productUrl}`}>
              <Image w="300px" h="300px" src={productImg} />
            </Link>

            <Link to={`${serviceUrl}`}>
              <Image w="300px" h="300px" src={serviceImg} />
            </Link>
          </HStack>
        )}
      </VStack>
    </PageWrapper>
  );
}

export default ChooseCategoryPage;
