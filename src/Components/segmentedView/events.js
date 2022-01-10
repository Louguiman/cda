import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Event = ({ item, horizontal }) => (
  <View style={{ padding: 10 }}>
    <Pressable onPress={() => {}}>
      <View
        style={[styles.item, { flexDirection: horizontal ? "row" : "column" }]}
      >
        <View
          style={{
            flex: 3,
            backgroundColor: "black",
            borderRadius: 20,
            // justifyContent: "center",
            // alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Image style={styles.Avatar} source={item.imageUrl} />
        </View>
        <View
          style={{
            flex: 7,
            justifyContent: "center",
            alignItems: "center",
            // padding: 10,
          }}
        >
          <View style={{ right: 15 }}>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <AntDesign
                name="clockcircleo"
                size={20}
                color="black"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  </View>
);

const events = ({ data }) => {
  const renderEvent = ({ item }) => <Event item={item} horizontal={true} />;
  return (
    <FlatList
      nestedScrollEnabled={true}
      data={data}
      renderItem={renderEvent}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    height: 100,
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "400",
    textTransform: "uppercase",
    marginBottom: 15,
  },
  Avatar: {
    marginBottom: 10,
    width: 100,
    height: 100,
    resizeMode: "cover",
    // overflow: "hidden",
  },
});

export default events;
