import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import NewsSections from "./NewsSections";
import { useColorScheme } from "nativewind";

const RecommendedNewsList = ({ title, data }) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <View style={styles.headings}>
        <Text
          style={[styles.title, { color: isDarkMode ? "#00FF00" : "#000" }]}
        >
          {title}
        </Text>
        <TouchableOpacity>
          <Text
            style={[
              styles.viewAllText,
              { color: isDarkMode ? "#fff" : "#000" },
            ]}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <NewsSections data={data} />
    </View>
  );
};

export default RecommendedNewsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  headings: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  title: {
    fontSize: hp(2.2),
    fontWeight: "bold",
  },
  viewAllText: {
    fontWeight: "bold",
  },
});
