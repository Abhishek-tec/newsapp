import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const NewsSections = ({ data }) => {
  const [bookMarkStatus, setBookMarkStatus] = useState([]);
  const colorScheme = useColorScheme();
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
      }
    } catch (error) {
      console.log("Cannot Save Articles:", error.message);
    }
  };

  useEffect(() => {
    const initializeBookmark = async () => {
      try {
        const savedArticles = await AsyncStorage.getItem("savedArticles");
        const bookMark = savedArticles ? JSON.parse(savedArticles) : [];

        if (data && Array.isArray(data)) {
          const status = data.map((article) =>
            bookMark.some((saved) => saved.url === article.url)
          );
          setBookMarkStatus(status);
        }
      } catch (error) {
        console.log("Error to Initialize Bookmark:", error.message);
      }
    };

    if (isFocused) {
      initializeBookmark();
    }
  }, [isFocused, data]);

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
    <View style={styles.container}>
      <FlatList
        data={data}
        scrollEnabled={false}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) =>
          item.url ? `${item.url}-${index}` : index.toString()
        }
        renderItem={renderItem}
      />
    </View>
  );
};

export default NewsSections;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 20,
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
});
