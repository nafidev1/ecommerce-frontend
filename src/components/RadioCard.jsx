import { Box, useMediaQuery, useRadio } from "@chakra-ui/react";

function RadioCard(props) {
  const [isLessThanSM] = useMediaQuery("(max-width: 30em)");

  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal",
          color: "white",
          borderColor: "teal",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        // w={isLessThanSM ? "100%" : "28"}
        px={3}
        py={2}
        fontSize={isLessThanSM && "15"}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default RadioCard;
