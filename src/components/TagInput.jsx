import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import React from "react";

function TagInput({ label, focusBorderColor, ...props }) {
  const [field, meta] = useField(props);
  const toast = useToast();

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <Field {...field} {...props}>
        {({ field, form }) => (
          <Flex>
            <Box>
              {form.values.tags.map((tag, index) => (
                <Box as="span" key={index} mr={2}>
                  <Tag
                    size={"sm"}
                    key={"sm"}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="teal"
                  >
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton
                      onClick={() =>
                        form.setFieldValue(
                          "tags",
                          form.values.tags.filter((_, i) => i !== index)
                        )
                      }
                    />
                  </Tag>
                </Box>
              ))}
            </Box>
            <Input
              focusBorderColor={focusBorderColor}
              type="text"
              placeholder="Press Space to add tag"
              onKeyUp={(event) => {
                if (
                  (event.key === " " ||
                    event.code === "Space" ||
                    event.key === "Spacebar" ||
                    event.target.value[event.target.value.length - 1] ===
                      " ") &&
                  event.target.value.trim() !== ""
                ) {
                  if (form.values.tags.length >= 3) {
                    toast({
                      title: "Maximum 3 tags only",
                      status: "error",
                      isClosable: true,
                    });
                    return;
                  }
                  form.setFieldValue("tags", [
                    ...form.values.tags,
                    event.target.value,
                  ]);
                  event.target.value = "";
                }
              }}
            />
          </Flex>
        )}
      </Field>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default TagInput;
