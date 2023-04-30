import {
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { CardElement } from "@stripe/react-stripe-js";
import { Field, useField } from "formik";
import React from "react";

function CardInput({ setIsCardValid, ...props }) {
  const [field, meta, form] = useField(props);
  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <Field
        as={CardElement}
        //   onChange onBlur value
        {...field}
        {...props}
        onChange={(event) => {
          form.setValue(field.name, event.complete);
          form.setTouched(field.name, true, false);
          setIsCardValid(event.complete);
        }}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default CardInput;
