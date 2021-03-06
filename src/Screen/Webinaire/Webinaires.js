import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Webinaire from "../../Views/webinaireViews";
import Header from "../../Components/header";

const Webinaires = (props) => {
  return (
    <SafeAreaView style={styles.contain}>
      <View style={{ height: 150 }}>
        <Header
          title="Webinaire"
          icon={require("../../../assets/icons/webinaire.png")}
        />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Webinaire
            title="Webinaire a venir"
            navigation={props.navigation}
            isNavigation={false}
            horizontal={true}
          />
        </View>
        <View>
          <Webinaire
            title="Webinaire Fins"
            navigation={props.navigation}
            isNavigation={false}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default Webinaires;
