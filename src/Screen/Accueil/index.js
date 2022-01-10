import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { Ionicons } from "@expo/vector-icons";

import ImageSlider from "../../Components/imageSlider";
import Data from "../../Utils/data";
import Segmented from "../../Views/segmentViews";
import Evenement from "../../Views/eventViews";

import Webinaire from "../../Views/webinaireViews";
import { SharedElement } from "react-navigation-shared-element";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 90 : 100) : 90;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

// const Navigation = useNavigation();
const Categories = [
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d423",
    title: "Membres",
    image: require("../../../assets/icons/community.png"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-45862def",
    title: "Webinaire",
    image: require("../../../assets/icons/webinaire.png"),
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb275k",
    title: "Evenement",
    image: require("../../../assets/icons/event.png"),
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Speaker",
    image: require("../../../assets/icons/speaker.png"),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Biographie",
    price: "6000",
    image: require("../../../assets/icons/biography.png"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Levee de Fonds",
    image: require("../../../assets/icons/crowdfund.png"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d25",
    title: "Articles",
    image: require("../../../assets/icons/actu1.png"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d75",
    title: "Sondage",
    image: require("../../../assets/icons/survey3.png"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29f455",
    title: "Visio",
    image: require("../../../assets/icons/visio.png"),
  },
];

const stickyTitle = () => {
  return (
    <View style={styles.body}>
      <Text style={{ color: "white", fontSize: 25 }}>Accueil</Text>
    </View>
  );
};
const index = (props) => {
  const { navigation } = props;
  const [isExpanded, setIsExpanded] = useState(true);
  const renderContent = () => {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Segmented />
          <Evenement
            navigation={navigation}
            title="Evenement A Venir"
            isNavigation={true}
            horizontal={true}
          />
          <Webinaire
            navigation={navigation}
            title="Webinaire A Venir"
            isNavigation={true}
            horizontal={true}
          />
        </View>
      </SafeAreaView>
    );
  };

  const title = () => {
    return (
      <View style={{ flexGrow: 1 }}>
        <ImageSlider data={Data} style={{ flex: 10, marginBotton: 0 }} />
        <ScrollView
          horizontal
          contentContainerStyle={{ height: 80, flexDirection: "row" }}
          showsHorizontalScrollIndicator={true}
        >
          {Categories.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                navigation.navigate("Details", { item: item });
              }}
            >
              <View style={styles.item}>
                <View style={{ flex: 9 }}>
                  <SharedElement id={`item.${item.id}.icon`}>
                    <Image style={styles.Avatar} source={item.image} />
                  </SharedElement>
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };
  const renderNavBar = () => (
    <SafeAreaView>
      <View style={styles.navContainer}>
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
          <TouchableOpacity
            style={{ right: 0 }}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="ios-menu" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  return (
    <>
      {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={390}
        extraScrollHeight={50}
        titleStyle={styles.titleStyle}
        title={isExpanded ? title() : stickyTitle()}
        // backgroundColor="#28a745"
        backgroundImageScale={1.2}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        scrollViewProps={{
          onScroll: (event) => {
            event.nativeEvent.contentOffset.y <= 250
              ? setIsExpanded(true)
              : setIsExpanded(false);
          },
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  // statusBar: {
  //   height: STATUS_BAR_HEIGHT,
  //   backgroundColor: "#28a745",
  // },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  item: {
    height: "100%",
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 5,
    elevation: 20,
    shadowColor: "black",
    shadowOffset: {
      height: 10,
      width: 10,
    },
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  Avatar: {
    marginBottom: 10,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default index;
