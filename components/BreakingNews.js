import { Dimensions, Image, TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

const BreakingNews = ({ data }) => {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  return (
    <Carousel
      data={data}
      renderItem={({ item }) => (
        <BreakingNewsCard item={item} handleClick={handleClick} />
      )}
      firstItem={1}
      inactiveSlideOpacity={0.6}
      sliderWidth={width}
      itemWidth={width * 0.8}
      slideStyle={{ display: "flex", alignItems: "center" }}
    />
  );
};

export const BreakingNewsCard = ({ item, handleClick, title }) => {
  return (
    <TouchableOpacity onPress={() => handleClick(item)} activeOpacity={0.5}>
      <Image
        source={{ uri: item.urlToImage }}
        style={{
          height: height * 0.3,
          width: width * 0.8,
          borderRadius: 18,
          gap: 10,
          marginTop: 12,
        }}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          bottom: 0,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      />
      <View style={{ position: "absolute", bottom: 10, gap: 5 }}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: hp(2),
            textAlign: "center",
          }}
        >
          {item?.title}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 13,
            marginLeft: 8,
          }}
        >
          {item?.author}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BreakingNews;
