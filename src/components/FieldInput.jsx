import {
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import React from "react";

function FieldInput({ label, isError = false, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={(meta.error && meta.touched) || isError}>
      <Field
        as={label === "textbox" ? Textarea : Input}
        //   onChange onBlur value
        {...field}
        {...props}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default FieldInput;
