import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { fetcher } from "@/services/config";
import { Box, Text } from "@/utils/theme";
import React from "react";
import useSWR from "swr";

const CategoryScreen = () => {


  return (
    <SafeAreaWrapper>
      <Box>
        <Text>Category Screen</Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CategoryScreen;
