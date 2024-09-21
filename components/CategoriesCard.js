import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const CategoriesCard = ({
  categories,
  activeCategory,
  handleChangeCategory,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {categories.map((category) => (
          <CategoriesList
            key={category.id}
            title={category.title}
            isActive={activeCategory === category.title}
            handleChangeCategory={handleChangeCategory}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const CategoriesList = ({ title, isActive, handleChangeCategory }) => {
  const backgroundColor = isActive ? "green" : "lightgray";
  const color = isActive ? "#fff" : "#000";

  return (
    <TouchableOpacity
      style={[styles.categoryList, { backgroundColor }]}
      onPress={() => handleChangeCategory(title)}
    >
      <Text style={[styles.title, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    gap: 12,
  },
  scrollViewContent: {
    paddingVertical: hp(1),
  },
  categoryList: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: 10,
    marginRight: wp(2),
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: "bold",
  },
});
