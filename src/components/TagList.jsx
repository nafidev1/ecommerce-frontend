import {
  Box,
  HStack,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import { ax } from "../utils/constants.js";

function TagList(isEnabled = true) {
  const { categoryDispatch, currentType, currentIndex } =
    useContext(CategoryContext);
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(false);

  const viewTabs = async () => {
    setLoading(true);
    try {
      const res = await ax.get(
        `/tag/?categoryType=${currentType.toLowerCase()}`
      );
      setTabs(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    viewTabs();
  }, [currentType]);

  const changeTab = (tab, index) =>
    categoryDispatch({
      type: "SET_CURRENT_TAB",
      payload: { tag: tab?.tag, index: index },
    });

  return (
    <HStack overflowX="auto" width="100%" alignSelf="start">
      <Tabs
        variant="soft-rounded"
        colorScheme="teal"
        isLazy
        index={isEnabled === false ? undefined : currentIndex}
      >
        <Box overflowX={"auto"} width="100%">
          {loading ? (
            <Skeleton w={"60vw"}>
              <div>x</div>
            </Skeleton>
          ) : (
            <TabList minWidth="200px">
              <Tab
                textOverflow={"hidden"}
                isDisabled={!isEnabled}
                onClick={() => changeTab(undefined, 0)}
              >
                Home
              </Tab>
              {tabs.map((tab, index) => (
                <Tab
                  textOverflow={"hidden"}
                  isDisabled={!isEnabled}
                  key={tab._id}
                  onClick={() => changeTab(tab, index + 1)}
                >
                  {tab.tag}
                </Tab>
              ))}
            </TabList>
          )}
        </Box>
      </Tabs>
    </HStack>
  );
}

export default TagList;
