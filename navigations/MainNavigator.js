import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AntDesign, Feather } from "@expo/vector-icons";
import DiscoverScreen from "../screens/DiscoverScreen";
import SavedScreen from "../screens/SavedScreen";
import SearchScreen from "../screens/SearchScreen";
import NewsDetails from "../screens/NewsDetails";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  const BottomTabs = () => {
    return (
      <Tab.Navigator options={{ animation: "slide_from_right" }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { fontSize: hp(1.5) },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={hp(2.6)}
                color={focused ? "green" : "black"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{
            tabBarLabel: "Discover",
            tabBarLabelStyle: { fontSize: hp(1.5) },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="find"
                size={hp(2.6)}
                color={focused ? "green" : "black"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Save"
          component={SavedScreen}
          options={{
            tabBarLabel: "Save",
            tabBarLabelStyle: { fontSize: hp(1.5) },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="bookmark"
                size={hp(2.6)}
                color={focused ? "green" : "black"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: "Search",
            tabBarLabelStyle: { fontSize: hp(1.5) },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="search"
                size={hp(2.6)}
                color={focused ? "green" : "black"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={BottomTabs}
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetails}
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
