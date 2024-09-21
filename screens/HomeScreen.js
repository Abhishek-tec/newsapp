import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchBreakingNews, fetchRecommendedNews } from "../utils/Apikey";
import Loading from "../components/Loading";
import BreakingNews from "../components/BreakingNews";
import { StatusBar } from "expo-status-bar";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import RecommendedNews from "../components/RecommendedNewsList";
import { useColorScheme } from "nativewind"; // Correct usage of nativewind

const HomeScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme(); // Using nativewind for theming
  const [breakingNews, setBreakingNews] = useState([]);
  const [recommendedNews, setRecommendedNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    getBreakingNews();
    getRecommendedNews();
  }, [isFocused]);

  const getBreakingNews = async () => {
    setLoading(true);
    try {
      const data = await fetchBreakingNews();
      if (data && data.articles) setBreakingNews(data.articles);
    } catch (error) {
      console.log("Error Getting Breaking News:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendedNews = async () => {
    setLoading(true);
    try {
      const response = await fetchRecommendedNews();
      if (response && response.articles) setRecommendedNews(response.articles);
    } catch (error) {
      console.log("Error Getting Recommended News:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        colorScheme === "dark" ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <View style={[styles.headers]}>
        <Text
          style={[
            styles.topheading,
            colorScheme === "dark" ? styles.darkText : styles.lightText,
          ]}
        >
          STACK NEWS
        </Text>
        <View style={styles.subHeaders}>
          <Switch
            value={colorScheme === "dark"}
            onValueChange={toggleColorScheme}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <FontAwesome
              name="search"
              size={24}
              color={colorScheme === "dark" ? "white" : "red"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.headline]}>
        <Text
          style={[
            styles.heading,
            colorScheme === "dark" ? styles.darkText : styles.lightText,
          ]}
        >
          Breaking News
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: colorScheme === "dark" ? "white" : "black",
          }}
        >
          View All
        </Text>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <View>
          <BreakingNews data={breakingNews} />
        </View>
      )}

      <ScrollView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <RecommendedNews
              data={recommendedNews}
              title={"Recommended News"}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    marginTop: 20,
  },
  subHeaders: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginRight: 10,
  },
  topheading: {
    fontSize: hp(2.8),
    fontWeight: "bold",
  },
  headline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
    marginLeft: 10,
  },
  heading: {
    fontSize: hp(2.3),
    fontWeight: "bold",
  },
  darkBackground: {
    backgroundColor: "#121212",
  },
  lightBackground: {
    backgroundColor: "#ffffff",
  },
  darkText: {
    color: "#00FF00",
  },
  lightText: {
    color: "#000000",
  },
});
