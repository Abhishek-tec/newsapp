import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Entypo from "@expo/vector-icons/Entypo";
import { debounce } from "lodash";
import { fetchSearchNews } from "../utils/Apikey";
import NewsSections from "../components/NewsSections";

const SearchScreen = () => {
  const inputRef = useRef();
  const colorScheme = useColorScheme();
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [result, setResult] = useState([]);

  const clearSearch = () => {
    setSearchValue("");
    setSearchItem("");
    setResult([]);
    inputRef?.current?.clear();
  };

  const handelSearch = async (text) => {
    setSearchValue(text);
    if (text.length > 2) {
      setLoading(true);
      setResult([]);
      setSearchItem(text);
      try {
        const data = await fetchSearchNews(text);
        if (data && data.articles) {
          setResult(data.articles);
        }
      } catch (error) {
        console.log("Error fetching search news:", error.message);
      } finally {
        setLoading(false);
      }
    }
    if (text === "") {
      clearSearch();
    }
  };

  const handleDebounce = useCallback(debounce(handelSearch, 400), []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#121212" : "#fff" },
      ]}
    >
      <View style={styles.textinput}>
        <TextInput
          ref={inputRef}
          onChangeText={handleDebounce}
          placeholder="Search for your news"
          placeholderTextColor={colorScheme === "dark" ? "#fff" : "gray"}
          style={[
            styles.inputStyle,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}
        />
        {searchValue.length > 0 && (
          <TouchableOpacity onPress={() => handelSearch("")}>
            <Entypo name="cross" size={hp(4)} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={[
          styles.counting,
          { color: colorScheme === "dark" ? "#fff" : "dark" },
        ]}
      >
        {result.length} News for {searchItem}
      </Text>
      <ScrollView contentContainerStyle={{ paddingBottom: hp(5) }}>
        <NewsSections data={result} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textinput: {
    marginTop: hp(4),
    width: wp(90),
    borderWidth: 1,
    borderRadius: hp(2),
    alignSelf: "center",
    padding: 10,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputStyle: {
    fontSize: 16,
    flex: 1,
  },
  counting: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: hp(2),
    fontWeight: "bold",
  },
});
