import Loader from "@/components/shared/loader";
import NavigateBack from "@/components/shared/navigate-back";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { today } from "@/components/tasks/task-actions";
import { HomeStackParamList } from "@/navigation/types";
import axiosInstance, { fetcher } from "@/services/config";
import { ICategory, ITask } from "@/types";
import { Box, Text, Theme } from "@/utils/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { format, isToday } from "date-fns";
import React, { useState } from "react";
import { FlatList, Pressable, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

type EditTaskRouteType = RouteProp<HomeStackParamList, "EditTask">;

const updateTaskRequest = async (url: string, { arg }: { arg: ITask }) => {
  try {
    await axiosInstance.put(url + "/" + arg._id, {
      ...arg,
    })
  } catch (error) {
    console.log("error in updateTaskRequest", error);
    throw error;
  }
};
const deleteTaskRequest = async (url: string, { arg }: { arg:{id: string }}) => {
  try {
    await axiosInstance.delete(url + "/" + arg.id)
  } catch (error) {
    console.log("error in deleteTaskRequest", error);
    throw error;
  }
};

const EditTaskScreen = () => {
  const theme = useTheme<Theme>();
  const route = useRoute<EditTaskRouteType>();
  const navigation = useNavigation();

  const { trigger } = useSWRMutation("tasks/edit", updateTaskRequest);
  const { trigger: triggerDelete } = useSWRMutation("tasks/", deleteTaskRequest);

  const { task } = route.params;

  const [updatedTask, setUpdatedTask] = useState(task);

  const { mutate } = useSWRConfig();

  const [isSelectingCategory, setIsSelectingCategory] =
    useState<boolean>(false);
  const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false);

  const { data: categories, isLoading } = useSWR<ICategory[]>(
    "categories",
    fetcher
  );

  const deleteTask = async () => {
    console.log(`deleteTask called`);
    
   try {
      await triggerDelete{
        id: updatedTask._id      
        navigation.goBack();        
      }
      await mutate("tasks/");
      await mutate("tasks/today");
      await mutate("tasks/completed");
      console.log(`detete task ${updatedTask._id} with mutate tasks/tasks-by-categories/${updatedTask.categoryId}`);      
      await mutate(`tasks/tasks-by-categories/${updatedTask.categoryId}`);

    } catch (error) {
     console.log("error in deleteTask",error);
     throw (error)
   }
  };

  const updateTask = async () => {
    console.log(`updateTask called`);
    
    try {
      if (updateTask.name.length.toString().trim().length > 0) {
        await trigger({ ...updatedTask });
        await revalidateLiveQueries();
        // await mutate("tasks/");
        // await mutate("tasks/today");
        // await mutate("tasks/completed");
        // console.log(`update task ${updatedTask._id} with mutate tasks/tasks-by-categories/${updatedTask.categoryId}`);      
        // await mutate(`tasks/tasks-by-categories/${updatedTask.categoryId}`);
        navigation.goBack();
      }
    } catch (error) {
      console.log("error in updateTask", error);
      throw error;
    }
  };

  if (isLoading || !categories) {
    return <Loader />;
  }

  const selectedCategory = categories?.find(
    (_category) => _category._id === updatedTask.categoryId
  );

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <NavigateBack />
          <Pressable onPress={deleteTask}>
            <MaterialCommunityIcons
              name="delete"
              size={24}
              color={theme.colors.rose500}
            />
          </Pressable>
        </Box>
        <Box height={20} />
        <Box
          bg="lightGray"
          px="4"
          py="3.5"
          borderRadius="rounded-5xl"
          flexDirection="row"
          position="relative"
        >
          <TextInput
            placeholder="Create a new task"
            style={{
              paddingVertical: 8,
              paddingHorizontal: 8,
              fontSize: 16,
              width: "50%",
            }}
            maxLength={36}
            textAlignVertical="center"
            value={updatedTask.name}
            onChangeText={(text) => {
              setUpdatedTask((prev) => {
                return {
                  ...prev,
                  name: text,
                };
              });
            }}
            onSubmitEditing={updateTask}
          />
          <Box flexDirection="row" alignItems="center">
            <Pressable
              onPress={() => {
                setIsSelectingDate((prev) => !prev);
              }}
            >
              <Box
                flexDirection="row"
                alignContent="center"
                bg="white"
                p="2"
                borderRadius="rounded-xl"
              >
                <Text>
                  {isToday(new Date(updatedTask.date))
                    ? "Today"
                    : format(new Date(updatedTask.date), "MMM dd")}
                </Text>
              </Box>
            </Pressable>
            <Box width={12} />
            <Pressable
              onPress={() => {
                setIsSelectingCategory((prev) => !prev)
              }}
            >
              <Box
                bg="white"
                flexDirection="row"
                alignItems="center"
                p="2"
                borderRadius="rounded-xl"                
              >
                <Box
                  width={12}
                  height={12}
                  borderRadius="rounded"
                  borderWidth={2}
                  mr="1"
                  style={{
                    borderColor: selectedCategory?.color.code,
                  }}
                ></Box>
                <Text
                  style={{
                    color: selectedCategory?.color.code,
                  }}
                >
                  {selectedCategory?.name}
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>
        {isSelectingCategory && (
          <Box alignItems="flex-end" my="4" justifyContent="flex-end">
            <FlatList
              data={categories}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    onPress={() => {
                      setUpdatedTask((prev) => {
                        return { ...prev, categoryId: item._id };
                      });
                      setIsSelectingCategory(false);
                    }}
                  >
                    <Box
                      bg="gray250"
                      p="2"
                      borderTopStartRadius={
                        index === 0 ? "rounded-3xl" : "none"
                      }
                      borderTopEndRadius={index === 0 ? "rounded-3xl" : "none"}
                      borderBottomStartRadius={
                        categories?.length - 1 === index ? "rounded-2xl" : "none"
                      }
                      borderBottomEndRadius={
                        categories?.length - 1 === index ? "rounded-2xl" : "none"
                      }
                    >
                      <Box flexDirection="row">
                        <Text>{item.icon.symbol}</Text>
                        <Text
                          ml="2"
                          fontWeight={
                            updatedTask.categoryId === item._id ? "700" : "400"
                          }
                        >
                          {item.name}
                        </Text>
                      </Box>
                    </Box>
                  </Pressable>
                );
              }}
            />
          </Box>
        )}
        <Box>
          {isSelectingDate && (
            <Box>
              <Calendar
                minDate={format(today, "Y-MM-dd")}
                onDayPress={(day) => {
                  setIsSelectingDate(false);
                  const selectedDate = new Date(day.dateString).toISOString();
                  setUpdatedTask((prev) => {
                    return { ...prev, date: selectedDate };
                  });
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default EditTaskScreen;
