import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={{ height: "70%" }}>
        <Image
          source={require("../assets/Images/newsanchor.png")}
          style={styles.anchorIMG}
        />
      </View>
      <View style={styles.wlcText}>
        <Text style={styles.firstText}>
          For latest update of news, please visit our website.
        </Text>
        <Text style={styles.secondText}>
          Discover the latest News with our Seamless Onboarding Experience
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.5}
        onPress={() => navigation.navigate("HomeTabs")}
      >
        <Text style={styles.btnText}>Getting Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  anchorIMG: {
    height: "100%",
    width: wp(100),
  },
  wlcText: {
    width: wp(80),
    alignSelf: "center",
    alignItems: "center",
    gap: 10,
  },
  firstText: {
    fontSize: hp(4),
    color: "#000",
    fontWeight: "bold",
  },
  secondText: {
    color: "#000",
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "green",
    padding: 13,
    borderRadius: hp(3),
    width: wp(80),
    marginTop: hp(3),
    alignSelf: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#fff",
  },
});
