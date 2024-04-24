import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, FlatList, View } from "react-native";
import { Avatar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import server from "../api/server";

function Favorites({ route, navigation }) {
  const [extradata, setExtraData] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      const favRes = await server.getFavorites();
      if (favRes) {
        setFavorites(favRes.data);
        setExtraData(!extradata);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          padding: 10,
          fontWeight: "bold",
        }}
      >
        Favorite Offers
      </Text>
      <FlatList
        style={{ flex: 1 }}
        data={favorites}
        extraData={extradata}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                borderColor: "#d4d4d4",
                borderWidth: 0.5,
                width: "70%",
                borderRadius: 20,
                paddingHorizontal: 20,
              }}
              onPress={() => openLink(item.merchantSite)}
            >
              <Avatar
                rounded
                source={{
                  uri: item.merchantLogo,
                }}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                }}
              >
                {item.merchantName}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                }}
              >
                {item.description}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                }}
              >
                {item.offerType} of {item.offerType == "DISCOUNT" ? "%" : "£"}
                {item.discountAmount}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        key={(item) => item._id}
      />
    </SafeAreaView>
  );
}

export default Favorites;
