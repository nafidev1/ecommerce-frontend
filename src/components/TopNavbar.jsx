import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { FaBars, FaSearch } from "react-icons/fa";
import { GoListUnordered } from "react-icons/go";
import { HiShoppingCart } from "react-icons/hi";
import { IoMdAdd, IoMdLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import useCart from "../hooks/useCart";
import { ax } from "../utils/constants";
import CustomNavLink from "./CustomNavLink";
import PrivateComponent from "./PrivateComponent";
import SearchBar from "./SearchBar";

function TopNavbar() {
  const [isLessThanSM] = useMediaQuery("(max-width: 30em)");
  const [isShowSearch, setIsShowSearch] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sidePadding = 4;
  const navigate = useNavigate();

  const { user, loading, authDispatch } = useContext(AuthContext);
  const { counter } = useContext(CartContext);

  async function handleLogout() {
    authDispatch({ type: "AUTH_START" });
    try {
      await ax.post("/auth/logout");
      authDispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (err) {
      authDispatch({ type: "AUTH_FAILURE", payload: err.response?.data });
    }
  }

  return isShowSearch ? (
    <Flex
      mt={4}
      width="100%"
      justifyContent="center"
      flexDir="row"
      pr={sidePadding}
      pl={sidePadding}
    >
      <SearchBar setIsShowSearch={setIsShowSearch} withCancelButton={true} />
    </Flex>
  ) : (
    <Flex
      justifyContent={isLessThanSM ? "end" : "space-between"}
      flexDir="row"
      mt={4}
      pr={sidePadding}
      pl={sidePadding}
    >
      {/* if less than SM, show home icon otherwise logo */}
      {!isLessThanSM && (
        <Link to="/">
          <Flex flexDir="column" justifyContent="center">
            <Image src={logo} w={"130px"} />
          </Flex>
        </Link>
      )}

      {!isLessThanSM && (
        <Box w="30%">
          <SearchBar
            setIsShowSearch={true}
            withCancelButton={false}
            label="big"
          />
        </Box>
      )}

      <HStack spacing={2}>
        {isLessThanSM && (
          <>
            <IconButton
              size={"md"}
              colorScheme="teal"
              aria-label="Search"
              icon={<FaSearch />}
              isRound={true}
              onClick={() => setIsShowSearch(!isShowSearch)}
            />
            <PrivateComponent
              defaultComp={
                <CustomNavLink
                  route="/login"
                  ariaText="Logout"
                  icon={<IoMdLogIn size="100%" />}
                  iconVariant="solid"
                />
              }
              authComp={
                <IconButton
                  size={"md"}
                  colorScheme="teal"
                  aria-label="Navbar"
                  icon={<FaBars />}
                  isRound={true}
                  onClick={onOpen}
                />
              }
            />
          </>
        )}
        {!isLessThanSM && (
          <>
            <PrivateComponent
              defaultComp={
                <CustomNavLink
                  route="/login"
                  ariaText="Logout"
                  icon={<IoMdLogIn size="100%" />}
                  iconVariant="solid"
                />
              }
              authComp={
                <>
                  <IconButton
                    disabled={loading}
                    onClick={handleLogout}
                    size={"md"}
                    colorScheme="teal"
                    isRound={true}
                    aria-label="Logout"
                    icon={<BiLogOutCircle size="100%" />}
                    variant="ghost"
                  />
                  <CustomNavLink
                    route="/add/category"
                    ariaText="Add Product"
                    icon={<IoMdAdd size="80%" />}
                  />

                  <Box pos={"relative"}>
                    <Box pos={"absolute"} top="-2" zIndex={1}>
                      <Badge borderRadius="full" px="2" colorScheme="red">
                        {counter}
                      </Badge>
                    </Box>

                    <CustomNavLink
                      route="/cart"
                      ariaText="Cart"
                      icon={<HiShoppingCart size="80%" />}
                      iconVariant="ghost"
                    />
                  </Box>

                  <CustomNavLink
                    route="/orders"
                    ariaText="Orders"
                    icon={<GoListUnordered size="70%" />}
                  />
                </>
              }
            />
          </>
        )}
      </HStack>

      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="teal" />
          <DrawerHeader borderBottomWidth="1px">
            <Link to="/">
              <Image src={logo} w={"100px"} />
            </Link>
          </DrawerHeader>
          <DrawerBody>
            <VStack as="nav" alignItems="start" spacing={2}>
              <CustomNavLink
                label="small"
                route="/add/category"
                ariaText="Add Product"
                icon={<AiOutlinePlus size="80%" />}
                text="Add Product"
              />
              <CustomNavLink
                label="small"
                route="/cart"
                ariaText="Cart"
                icon={<HiShoppingCart size="80%" />}
                text="Cart"
              />
              <CustomNavLink
                label="small"
                route="/orders"
                ariaText="Orders"
                icon={<GoListUnordered size="70%" />}
                text="My Orders"
              />
              {user !== null && (
                <CustomNavLink
                  label="small"
                  handleClick={handleLogout}
                  ariaText="Logout"
                  icon={<BiLogOutCircle size="100%" />}
                  iconVariant="ghost"
                  text="Log Out"
                />
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default TopNavbar;
