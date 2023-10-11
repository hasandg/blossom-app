import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { fetcher } from "@/services/config";
import { Box, Text } from "@/utils/theme";
import React from "react";
import useSWR from "swr";

const HomeScreen = () => {

const {data, isLoading} = useSWR("category", fetcher)

console.log('data in home screen', JSON.stringify(data, null, 2))

  return (
    <SafeAreaWrapper>
      <Box>
        <Text>Home</Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
