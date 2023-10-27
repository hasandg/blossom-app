import useUserGlobalStore from "@/store/useUserGlobalStore";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppStackNavigator from "./app-stack-navigator";
import AuthStackNavigator from "./auth-stack-navigator";

const Navigation = () => {
  const { user } = useUserGlobalStore();
  //const user= undefined
  console.dir("user with dir:     ", user)
  console.log("user with json:     ", JSON.stringify(user, null, 2));
  return (
    <NavigationContainer>
      {user ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;