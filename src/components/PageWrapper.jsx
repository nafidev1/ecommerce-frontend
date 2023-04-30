import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";

function PageWrapper({ children }) {
  const [isLessThanSM] = useMediaQuery("(max-width: 30em)");
  return (
    <Flex justifyContent="space-between" flexDir="column" height="100vh">
      <Box pr={isLessThanSM ? 2 : 4} pl={isLessThanSM ? 2 : 4}>
        <TopNavbar />
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}

export default PageWrapper;
