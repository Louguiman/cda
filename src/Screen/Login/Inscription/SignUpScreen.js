import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { SharedElement } from "react-navigation-shared-element";
import { AntDesign } from "@expo/vector-icons";
import {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import RowDivider from "../../../Components/shared/RowDivider";
import { registerUser } from "../../../Utils/queries";

const { width, height } = Dimensions.get("screen");

const SignUpScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return { transform: [{ translateX: offset.value }] };
  });

  const handleNavigateTo = () => {
    offset.value = withSpring(Math.random(), {}, (finished) => {
      if (finished) {
        console.log("ANIMATION ENDED");
      } else {
        console.log("ANIMATION GOT CANCELLED");
      }
    });
  };

  const handleSubmit = () => {
    if (password !== cPassword) {
      Alert.alert("Mot de passe Non identique!!");
      return;
    }
    setIsLoading(true);
    const form = new FormData();
    form.append("first_name", firstName);
    form.append("last_name", lastName);
    form.append("username", username);
    form.append("email", email);
    form.append("password", password);

    fetch("https://clusterdafrica.com/api/signup", {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((json) => console.log("ui: ", json))
      .catch((e) => console.log(e));
  };

  return (
    <ImageBackground
      source={require("../../../../assets/Auth/bg7.jpg")}
      resizeMode="cover"
      style={{ width, height }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            backgroundColor: "green",
            width,
            height,
            position: "absolute",
            top: 0,
            zIndex: 10,
            opacity: 0.2,
          }}
        />
        <View style={styles.header}>
          <Image
            source={require("../../../../assets/logo.png")}
            resizeMode="contain"
            style={styles.headerImg}
          />
        </View>
        <SharedElement
          id="inputbox"
          style={{
            marginTop: 10,
            width: "85%",
            zIndex: 12,
          }}
        >
          <BlurView tint="dark" intensity={80} style={styles.inputBox}>
            <View style={styles.inputRow}>
              <AntDesign name="user" size={20} color="white" />
              <RowDivider />
              <TextInput
                style={styles.input}
                value={firstName}
                placeholder="Nom"
                placeholderTextColor="white"
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.inputRow}>
              <AntDesign name="user" size={20} color="white" />
              <RowDivider />
              <TextInput
                style={styles.input}
                value={lastName}
                placeholder="Prénom"
                placeholderTextColor="white"
                onChangeText={setLastName}
              />
            </View>
            <View style={styles.inputRow}>
              <AntDesign name="user" size={20} color="white" />
              <RowDivider />
              <TextInput
                style={styles.input}
                value={username}
                placeholder="Nom d'Utilisateur"
                placeholderTextColor="white"
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.inputRow}>
              <AntDesign name="user" size={20} color="white" />
              <RowDivider />
              <TextInput
                style={styles.input}
                value={email}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="white"
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputRow}>
              <AntDesign name="lock1" size={20} color="white" />
              <RowDivider />
              <TextInput
                style={styles.input}
                placeholder="Mot de Passe"
                placeholderTextColor="white"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <View style={styles.inputRow}>
              <AntDesign name="lock1" size={20} color="white" />
              <RowDivider />
              <TextInput
                style={styles.input}
                placeholder="Confirmer le mot de passe"
                placeholderTextColor="white"
                value={cPassword}
                secureTextEntry
                onChangeText={setCPassword}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{
                height: 60,
                width: 60,
                backgroundColor: "white",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 190,
                elevation: 5,
                right: -40,
                zIndex: 100,
              }}
            >
              <AntDesign name="arrowright" size={34} color="black" />
            </TouchableOpacity>
          </BlurView>
        </SharedElement>

        <SharedElement
          id="btnPress"
          style={{
            position: "relative",
            top: 40,
            width: "50%",
            height: 80,
            zIndex: 12,
          }}
        >
          <BlurView tint="dark" intensity={80} style={styles.registerBtn}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, color: "white" }}>
                J'ai déjà un Compte
              </Text>
            </TouchableOpacity>
          </BlurView>
        </SharedElement>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUpScreen;

SignUpScreen.sharedElements = (route, otherRoute, showing) => {
  return [{ id: "inputbox" }, { id: "btnPress" }, { id: "bg" }];
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    marginTop: 5,
    height: 80,
    zIndex: 12,
  },
  headerImg: {
    height: 80,
    width: "100%",
  },
  inputBox: {
    paddingBottom: 20,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    zIndex: 12,
  },
  inputRow: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
  },
  input: {
    height: 60,
    width: "80%",
    padding: 15,
    color: "white",
    fontSize: 16,
  },
  registerBtn: {
    flex: 1,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    zIndex: 12,
  },
});
