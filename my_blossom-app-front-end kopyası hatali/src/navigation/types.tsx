import { CompositeNavigationProp, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type RootBottomParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Today: undefined;
  Completed: undefined;
  Categories: undefined;
};

export type HomeStackParamList = {
    Home: undefined 
    EditTask: undefined
}

export type CategoriesStackParamList = {
    Categories: undefined
    Category: {
        id: string
    }
    CreateCategory: {
        id? : string
    }
}

export type AppStackParamList = {
    root: NavigatorScreenParams<RootBottomParamList>
    Settings: undefined
}

export type RootStackParamList = {
    AppStack: NavigatorScreenParams<AppStackParamList>
    AuthStack: NavigatorScreenParams<AuthStackParamList>
}

declare global {
    namespace ReactNavigation{
        interface RootParamList extends RootStackParamList {}
    }
}

export type AuthScreenNavigationType<
RouteName extends keyof AuthStackParamList
> = CompositeNavigationProp<
NativeStackNavigationProp<AuthStackParamList, RouteName>,
NativeStackNavigationProp<AppStackParamList, "Root">
>