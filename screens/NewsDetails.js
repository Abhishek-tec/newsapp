import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { WebView } from "react-native-webview";

const { height, width } = Dimensions.get("window");

const NewsDetails = () => {
  const navigation = useNavigation();
  const [isSaved, setIsSaved] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightheader}>
            <MaterialCommunityIcons
              name="share-variant"
              size={24}
              color="gray"
            />
            <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
              <FontAwesome
                name="star"
                size={24}
                color={isSaved ? "green" : "gray"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
      {/* <WebView
        source={{ uri: "https://www.google.com" }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
      />

      {visible && (
        <ActivityIndicator
          size={"large"}
          color={"red"}
          style={{ position: "absolute", top: height / 2, left: width / 2 }}
        />
      )} */}
    </>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(2),
  },
  rightheader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginRight: hp(2),
  },
  backIcon: {
    marginLeft: hp(2),
    backgroundColor: "#E2E2",
    padding: 2,
    borderRadius: hp(4),
  },
});
