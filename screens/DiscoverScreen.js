import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CategoriesCard from "../components/CategoriesCard";
import { categories } from "../constants/Category";
import { fetchDiscoverNews } from "../utils/Apikey";
import Loading from "../components/Loading";
import NewsSections from "../components/NewsSections";

const DiscoverScreen = ({ isActive }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [colorScheme, toggleColorScheme] = useColorScheme();
  const [activeCategory, setActiveCategory] = useState("Business");
  const [discoverNews, setDiscoverNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDiscoverNews();
  }, [isFocused, activeCategory]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    setDiscoverNews([]);
  };

  const getDiscoverNews = async () => {
    setLoading(true);
    try {
      const result = await fetchDiscoverNews(activeCategory);
      const filterNews = result.articles.filter(
        (articles) => articles.title !== "[Removed]"
      );
      setDiscoverNews(filterNews);
    } catch (error) {
      console.log("Error Getting Discover News:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ marginTop: 10 }}>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Discover</Text>
        <Text style={styles.subheaderText}>News from all over the world</Text>
        <View style={styles.searchbox}>
          <TouchableOpacity>
            <FontAwesome
              name="search"
              size={24}
              color={isActive ? "white" : "red"}
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search for news"
            style={styles.searchInput}
            onPress={() => navigation.navigate("Search")}
          />
        </View>
      </View>
      <View
        style={{ flexDirection: "row", marginTop: hp(2), marginLeft: hp(2.5) }}
      >
        <CategoriesCard
          categories={categories}
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: 10,
          marginLeft: 10,
          marginTop: 15,
        }}
      >
        <Text style={{ fontSize: hp(2.5), fontWeight: "bold" }}>Discover</Text>
        <Text style={{ fontSize: hp(2.2), fontWeight: "bold" }}>View All</Text>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: hp(30) }}>
          <NewsSections data={discoverNews} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginLeft: 15,
  },
  headerText: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#000",
  },
  subheaderText: {
    fontSize: 13,
  },
  searchbox: {
    flexDirection: "row",
    alignItems: "center",
    padding: hp(1.1),
    width: wp(90),
    backgroundColor: "lightgray",
    gap: 10,
    borderRadius: hp(4),
    marginTop: 20,
  },
});
