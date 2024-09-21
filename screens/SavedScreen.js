import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Loading from "../components/Loading";

const SavedScreen = () => {
  const colorScheme = useColorScheme();
  const [savedArticles, setSavedArticles] = useState([]);
  const [bookMarkStatus, setBookMarkStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };
  const formate = (isDate) => {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const date = new Date(isDate);
    return date.toLocaleDateString(undefined, options);
  };
  const toggleBookmark = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      const bookMark = savedArticles ? JSON.parse(savedArticles) : [];

      const isSavedArticles = bookMark.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isSavedArticles) {
        bookMark.push(item);
        await AsyncStorage.setItem("savedArticles", JSON.stringify(bookMark));
        const updateStatus = [...bookMarkStatus];
        updateStatus[index] = true;
        setBookMarkStatus(updateStatus);
        setSavedArticles(bookMark);
      } else {
        const updatedSavedArticles = bookMark.filter(
          (savedArticle) => savedArticle.url !== item.url
        );

        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticles)
        );
        const updateStatus = [...bookMarkStatus];
        updateStatus[index] = false;
        setBookMarkStatus(updateStatus);
        setSavedArticles(updatedSavedArticles);
      }
    } catch (error) {
      console.log("Cannot Save Articles:", error.message);
    }
  };

  useEffect(() => {
    const initializeBookmark = async () => {
      setLoading(true);
      try {
        const savedArticles = await AsyncStorage.getItem("savedArticles");
        const bookMark = savedArticles ? JSON.parse(savedArticles) : [];

        setSavedArticles(bookMark);
      } catch (error) {
        console.log("Error to Initialize Bookmark:", error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeBookmark();
  }, [isFocused]);

  const removeArticles = async () => {
    try {
      await AsyncStorage.removeItem("savedArticles");
      setSavedArticles([]);
      setBookMarkStatus([]);
    } catch (error) {
      console.log("Error remove Articles:", error.message);
    }
  };
  const renderItem = ({ item, index }) => (
    <View style={styles.imageData} key={index}>
      <TouchableOpacity onPress={() => handleClick(item)} activeOpacity={0.5}>
        <Image
          source={{
            uri: item?.urlToImage || "https://picsum.photos/200/300",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.authorText}>
            {item?.author?.length > 20
              ? item?.author.slice(0, 20) + "..."
              : item?.author}
          </Text>
          <Text numberOfLines={3} style={styles.titleText}>
            {item?.title?.length > 50
              ? item?.title.slice(0, 50) + "..."
              : item?.title}
          </Text>
          <Text style={styles.dateText}>{formate(item.publishedAt)}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleBookmark(item, index)}>
          <FontAwesome
            style={{ marginRight: 10 }}
            name="star"
            size={hp(3)}
            color={bookMarkStatus[index] ? "green" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        { backgroundColor: colorScheme === "dark" ? "#121212" : "#fff" },
      ]}
    >
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <View style={styles.savehaeder}>
        <Text
          style={[
            styles.savedText,
            { color: colorScheme === "dark" ? "#fff" : "dark" },
          ]}
        >
          Saved Articles
        </Text>
        <TouchableOpacity
          style={styles.clearbtn}
          onPress={() => {
            removeArticles();
          }}
        >
          <Text
            style={[
              styles.clearText,
              { color: colorScheme === "dark" ? "dark" : "#fff" },
            ]}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : savedArticles.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={savedArticles}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.title}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: hp(4) }}
          />
        </View>
      ) : (
        <View style={styles.noArticles}>
          <Text style={styles.empty}>No Saved Articles</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: hp(2),
    backgroundColor: "#fff",
  },
  savehaeder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  clearbtn: {
    padding: 8,
    backgroundColor: "red",
    borderRadius: 10,
    width: wp(20),
    alignItems: "center",
  },
  savedText: {
    fontSize: hp(2.5),
    fontWeight: "bold",
  },
  clearText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: hp(2),
  },
  container: {
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  imageData: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 10,
  },
  image: {
    height: hp(12),
    width: wp(24),
    resizeMode: "cover",
    borderRadius: 6,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
  },
  authorText: {
    fontWeight: "bold",
    color: "#0066b2",
    marginTop: 6,
  },
  titleText: {
    marginTop: 4,
    fontWeight: "bold",
    fontSize: 13,
    color: "#000",
    width: "80%",
  },
  dateText: {
    color: "gray",
    marginTop: 8,
  },
  noArticles: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(40),
  },
  empty: {
    fontSize: hp(3),
    fontWeight: "semibold",
    color: "red",
  },
});
