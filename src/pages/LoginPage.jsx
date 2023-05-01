import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Hide,
  HStack,
  Image,
  Input,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoginImage from "../assets/login-image.png";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import useCart from "../hooks/useCart";
import { ax } from "../utils/constants";

function LoginPage() {
  const [isLessThanSM] = useMediaQuery("(max-width: 62em)");
  const { loading, authDispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    user !== null && navigate("/");
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: async (values, action) => {
      authDispatch({ type: "AUTH_START" });
      try {
        const res = await ax.post("/auth/login", values);
        authDispatch({ type: "AUTH_SUCCESS", payload: res.data });
        navigate(-1) || navigate("/");
      } catch (err) {
        authDispatch({ type: "AUTH_FAILURE", payload: err.response?.data });
      }
    },
  });

  return (
    <HStack w="100%" h="100vh">
      <Hide below="base">
        <Flex
          w="100%"
          h="100%"
          maxW={{ base: "0%", sm: "0%", lg: "60%", xl: "60%" }}
          pos="relative"
        >
          <Image fit="cover" w="100%" h="100%" src={LoginImage} />

          <Flex
            flexDir="column"
            justifyContent="end"
            h="100%"
            pb="10"
            pl="5"
            pr="5"
            pos="absolute"
            display={isLessThanSM ? "none" : "flex"}
          >
            <Heading
              as="h1"
              fontWeight="bold"
              color="white"
              fontSize={{ sm: "5xl", lg: "6xl" }}
            >
              Safe & Reliable
            </Heading>
            <Text color="white" fontWeight="semibold" fontSize="2xl">
              We Help Students Sell Services and Goods Across the Campus.
              Students can register and start selling their past books or offer
              help to other students. Together we are stronger!
            </Text>
          </Flex>
        </Flex>
      </Hide>

      <VStack
        w="100%"
        h="100%"
        p={8}
        alignItems="start"
        justifyContent="center"
        spacing={5}
        maxW={{ base: "100%", sm: "100%", lg: "40%", xl: "40%" }}
      >
        <Image src={logo} w="130px" />
        <Heading as="h3" fontWeight="medium" fontSize="2xl">
          Login
        </Heading>
        <Heading as="h1" fontWeight="bold">
          Let Us Help You Wisely.
        </Heading>
        <Text fontSize={12}>
          Our Platform provides UiTM Students to sell services and product
          online.
        </Text>

        <VStack w="100%" spacing={5}>
          <FormControl isInvalid={formik.errors.email && formik.touched.email}>
            <Input
              placeholder="Email Address"
              type="email"
              focusBorderColor="#25ABB2"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formik.errors.password && formik.touched.password}
          >
            <Input
              placeholder="Password"
              type="password"
              focusBorderColor="#25ABB2"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            {/* {error && (
              <FormHelperText color={"red"}>{error?.message}</FormHelperText>
            )} */}
          </FormControl>

          <Button
            disabled={loading}
            color="white"
            colorScheme="green"
            width="100%"
            type="button"
            onClick={formik.handleSubmit}
          >
            Login
          </Button>

          <Box display="flex" justifyContent="center">
            <Text fontSize={14}>New here?</Text>
          </Box>
          <Button
            disabled={loading}
            width="100%"
            color="white"
            colorScheme="teal"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </VStack>
      </VStack>
    </HStack>
  );
}

export default LoginPage;
