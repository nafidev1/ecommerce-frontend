import { HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function CustomNavLink({
  label = "big",
  size = "md",
  route,
  iconVariant = "solid",
  iconColor = "teal",
  ariaText,
  icon,
  handleClick = undefined,
  linkWidth = "100%",
  text,
}) {
  return label === "big" ? (
    <Link to={route}>
      <IconButton
        variant={iconVariant}
        size={size}
        colorScheme={iconColor}
        aria-label={ariaText}
        isRound={true}
        icon={icon}
        onClick={handleClick}
      />
    </Link>
  ) : (
    <Link to={route} style={{ width: linkWidth }} onClick={handleClick}>
      <HStack color="teal" spacing={2}>
        <IconButton
          size="sm"
          variant="ghost"
          aria-label={ariaText}
          isRound={true}
          icon={icon}
        />
        <Text fontWeight="medium" fontSize="md">
          {text}
        </Text>
      </HStack>
    </Link>
  );
}

export default CustomNavLink;
