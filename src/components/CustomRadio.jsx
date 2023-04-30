import { FormControl, Stack, useRadioGroup } from "@chakra-ui/react";
import { Field, useField } from "formik";
import React from "react";
import RadioCard from "./RadioCard";

function CustomRadio(props) {
  const options = ["Delivery", "No Delivery"];

  const [field, meta, form] = useField(props);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "isDelivery",
    defaultValue: "Delivery",
    onChange: form.setValue,
  });

  const group = getRootProps();

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <Field {...field} {...props}>
        {({ field, form }) => (
          <Stack direction={"row"} {...group}>
            {options.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </Stack>
        )}
      </Field>
    </FormControl>
  );
}

export default CustomRadio;
