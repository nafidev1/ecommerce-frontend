import {
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import React, { useEffect, useState } from "react";
import uploadImg from "../assets/uploading-img.png";
import convertImage from "../utils/imageUpload";

function ImageInput({ label = "large", ...props }) {
  const [field, meta, form] = useField(props);
  const [image, setImage] = useState(undefined);

  const handleImage = async (file) => {
    const converted = await convertImage(file);
    setImage(converted);
  };

  useEffect(() => {
    form.setValue(image);
  }, [image]);
  return (
    <FormControl isInvalid={meta.error}>
      <Field {...field} {...props}>
        {({ field, form }) => (
          <VStack align="stretch" alignItems={label !== "large" && "center"}>
            <Image
              src={image === undefined ? uploadImg : image}
              boxSize={label === "large" ? "70%" : "120px"}
              borderRadius="md"
            />
            <Input
              type="file"
              size="sm"
              width="70%"
              onChange={(e) => handleImage(e.target.files[0])}
            />
          </VStack>
        )}
      </Field>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default ImageInput;
