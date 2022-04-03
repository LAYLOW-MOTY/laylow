import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Animated,
  FlatList,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Colors, BackgroundColor } from "../theme/Colors";
import TextStyles from "../theme/TextStyles";
import { Padding } from "../theme/Spacing";
import AlbumList from "../containers/AlbumList";

const { width, height } = Dimensions.get("window");
const imageW = width * 0.55;
const imageH = imageW * 1.5;

const imgData = [
  "https://www.neomiannay.fr/php-laylow/bio-img/image1.png",
  "https://www.neomiannay.fr/php-laylow/bio-img/image2.png",
  "https://www.neomiannay.fr/php-laylow/bio-img/image3.png",
  "https://www.neomiannay.fr/php-laylow/bio-img/image4.png",
  "https://www.neomiannay.fr/php-laylow/bio-img/image5.png",
];

export default function Accueil() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://www.neomiannay.fr/php-laylow/biographie.php"
      );
      const json = await response.json();
      setData(json[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <ScrollView style={StyleSheet.compose(BackgroundColor(Colors.noir))}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text
            style={[
              {
                fontFamily: "Cloister",
                fontSize: 64,
                color: "#970203",
                textAlign: "center",
              },
              Padding(16, "y"),
            ]}
          >
            moty
          </Text>

          <View style={StyleSheet.absoluteFillObject}>
            {imgData.map((image, index) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 0.5, 0],
              });
              return (
                <Animated.Image
                  key={`image-${index}`}
                  source={{ uri: image }}
                  style={[StyleSheet.absoluteFillObject, { opacity }]}
                  blurRadius={30}
                />
              );
            })}
          </View>

          <Animated.FlatList
            data={imgData}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            keyExtractor={(index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    width: width,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowRadius: 20,
                  }}
                >
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: imageW,
                      height: imageH,
                      resizeMode: "cover",
                      borderRadius: 16,
                    }}
                  />
                </View>
              );
            }}
          />

          <View>
            <View style={Padding(8)}>
              <Text style={TextStyles.headTitle}>{data.artiste}</Text>
            </View>
            <View style={Padding(32, "x")}>
              <Text style={[TextStyles.h2, { textAlign: "left" }]}>
                Il était une fois ...
              </Text>
              <Text style={TextStyles.p}>{data.biographie}</Text>
            </View>
            <View style={Padding(32, "y")}>
              <Text
                style={[TextStyles.h2, Padding(32, "x"), { textAlign: "left" }]}
              >
                Discographie
              </Text>
              <AlbumList />
            </View>
          </View>
          <View>
            <Text style={[TextStyles.underText, Padding(24, "y"), {opacity: .7}]}>
            2022 · CAN ™ 
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.noir,
  },
});