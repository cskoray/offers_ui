import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, FlatList, View } from "react-native";
import { Avatar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import server from "../api/server";
import * as WebBrowser from "expo-web-browser";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Offers() {
  const [extradata, setExtraData] = useState(false);
  const [offers, setOffers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [result, setResult] = useState(null);

  const getOffers = async () => {
    try {
      const res = await server.getOffers();
      if (res) {
        const favRes = await server.getFavorites();
        if (favRes) {
          setFavorites(favRes.data);
        }
        setOffers(res.data);
        setExtraData(!extradata);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  const isFavorite = (offer) => {
    return favorites.find((fav) => fav.offerId === offer._id);
  };

  const openLink = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
    setResult(result);
  };

  const toggleFavorite = async (offerKey) => {
    let favorite = favorites.find((fav) => fav.offerKey === offerKey);
    if (favorite) {
      try {
        const res = await server.deleteFavorite(offerKey);
        if (res) {
          getOffers();
        }
      } catch (error) {
        console.error("Error deleting favorite:", error);
      }
    } else {
      try {
        const res = await server.addFavorite(offerKey);
        if (res) {
          getOffers();
        }
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    }
  };

  useEffect(() => {
    console.log("Offers mounted");
    getOffers();
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
        Offers
      </Text>
      <FlatList
        style={{ flex: 1 }}
        data={offers}
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
            <TouchableOpacity onPress={() => toggleFavorite(item.offerKey)}>
              {isFavorite(item) ? (
                <MaterialCommunityIcons name="star" size={32} color={"gold"} />
              ) : (
                <MaterialCommunityIcons name="star" size={32} color={"gray"} />
              )}
            </TouchableOpacity>
          </View>
        )}
        key={(item) => item._id}
      />
    </SafeAreaView>
  );
}

export default Offers;
