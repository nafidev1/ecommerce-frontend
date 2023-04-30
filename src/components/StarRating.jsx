import { Box, CheckboxGroup, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { ax } from "../utils/constants";

function StarRating({ size, isReadOnly = true, val, id }) {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data, error, loading } = useFetch(`/rating/?categoryId=${id}`);
  useEffect(() => {
    setRating(data?.rating);
  }, [loading]);

  const createRating = async (newRating) => {
    setIsLoading(true);
    try {
      const res = await ax.post("/rating/", {
        rating: newRating,
        categoryId: id,
      });
      setRating(newRating);
    } catch (error) {
      console.log(error.response?.data);
    }
    setIsLoading(false);
  };
  return (
    // <p style={{ fontSize: size }}>
      <Rating
        rating={0}
        readonly={isReadOnly}
        initialRating={isReadOnly ? val : rating}
        emptySymbol={<FaStar color="#bbb" />}
        fullSymbol={<FaStar color="#ffc107" />}
        onChange={createRating}
        emptyColor="#bbb"
        fullColor="#ffc107"
      />
    // </p>
  );
}

export default StarRating;
