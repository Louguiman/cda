import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Dimensions,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { BlurView } from "expo-blur";
import { SharedElement } from "react-navigation-shared-element";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  Easing,
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  FadeOutRight,
  runOnJS,
  runOnUI,
  interpolate,
  interpolateNode,
  Extrapolate,
} from "react-native-reanimated";
import RowDivider from "../../../Components/shared/RowDivider";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { useAuthDispatch, useAuthState } from "../../../global/userContext";
import { loginUser } from "../../../global/userAction";

const { width, height } = Dimensions.get("screen");

const AnimatedBlur = Animated.createAnimatedComponent(BlurView);
const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedShared = Animated.createAnimatedComponent(SharedElement);

const SignInScreen = ({ navigation }) => {
  const loginBoxAnimatedValue = useSharedValue(0);
  const boxWidth = useSharedValue(300);

  const [Index, setIndex] = useState(0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook
  const { loading, errorMessage } = useAuthState();

  const boxAnimation = (toValue) => {
    loginBoxAnimatedValue.value = withTiming(loginBoxAnimatedValue.value, {
      toValue,
      duration: 3000,
      useNativeDriver: true,
    });
  };

  const loginBoxAnimatedStyles = useAnimatedStyle(() => {
    return {
      width: interpolate(
        loginBoxAnimatedValue.value,
        {
          inputRange: [0, 0.5, 1],
          outputRange: [300, 150, 60],
        },
        { extrapolateRight: Extrapolate.CLAMP }
      ),
    };
  });

  const onPress = () => {
    loginBoxAnimatedValue.value = withTiming(1, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    // setIndex(Index === 1 ? 0 : 1);
    // boxAnimation(Index === 1 ? 0 : 1);
  };
  const handleSubmit = async () => {
    onPress();
    console.log("pressed");
    // await loginUser(dispatch, { username, password });
  };

  const style = useAnimatedStyle(() => {
    const toValue = interpolate(
      loginBoxAnimatedValue.value,
      {
        inputRange: [0, 0.5, 1],
        outputRange: [250, 150, 60],
      },
      { extrapolateRight: Extrapolate.CLAMP }
    );
    return {
      width: toValue,
    };
  });

  const offset = useSharedValue(0);
  useFocusEffect(() => {
    return () => {
      offset.value = 0;
    };
  });

  const animatedStyles = useAnimatedStyle(() => {
    return { transform: [{ translateX: offset.value }] };
  });

  function navigateTo(nav) {
    return nav.navigate("Inscription");
  }

  function handleNavigateTo() {
    offset.value = withTiming(
      width - width / 2.2,
      { duration: 500, easing: Easing.out(Easing.exp) },
      (finished) => {
        if (finished) {
          console.log("ANIMATION ENDED");
          runOnJS(navigateTo)(navigation);
        } else {
          console.log("ANIMATION GOT CANCELLED");
        }
      }
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SharedElement id="bg" style={[StyleSheet.absoluteFill]}>
        <ImageBackground
          source={require("../../../../assets/Auth/bg5.jpg")}
          resizeMode="cover"
          style={{ width, height }}
        />
      </SharedElement>
      <View
        style={{
          backgroundColor: "green",
          width,
          height,
          position: "absolute",
          top: 0,
          zIndex: 10,
          opacity: 0.1,
        }}
      />
      <View style={styles.header}>
        <Image
          source={require("../../../../assets/logo.png")}
          resizeMode="contain"
          style={styles.headerImg}
        />
      </View>
      <AnimatedShared
        id="inputbox"
        style={[
          {
            position: "absolute",
            top: height / 3.2,
            width: "85%",
            zIndex: 12,
          },
        ]}
      >
        <AnimatedBlur
          tint="dark"
          intensity={60}
          style={[styles.inputBox, style]}
        >
          <Animated.View style={styles.inputRow}>
            <AntDesign name="user" size={24} color="white" />
            <RowDivider />
            <TextInput
              style={styles.input}
              value={username}
              placeholder="Username"
              placeholderTextColor="white"
              onChangeText={setUsername}
            />
          </Animated.View>
          <Animated.View style={styles.inputRow}>
            <AntDesign name="lock1" size={24} color="white" />
            <RowDivider />
            <TextInput
              style={styles.input}
              placeholder="*******"
              placeholderTextColor="white"
              value={password}
              onChangeText={setPassword}
            />
          </Animated.View>
          <AnimatedTouch
            onPress={onPress}
            style={{
              height: 60,
              width: 60,
              backgroundColor: "white",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 40,
              elevation: 5,
              right: -40,
              zIndex: 100,
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <AntDesign name="arrowright" size={34} color="black" />
            )}
          </AnimatedTouch>
        </AnimatedBlur>
      </AnimatedShared>
      <TouchableOpacity
        onPress={() => console.log("pressed")}
        style={{
          top: height / 2.19,
          position: "relative",
          marginRight: 10,
          zIndex: 24,
          alignItems: "flex-end",
          elevation: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "white",
            // textAlign: "right",
          }}
        >
          Mot de Passe oublié ?
        </Text>
      </TouchableOpacity>
      <AnimatedShared
        id="btnPress"
        style={[
          {
            top: height - 350,
            left: -width / 1.8,
            width,
            height: 80,
            zIndex: 12,
          },
          animatedStyles,
        ]}
      >
        <AnimatedBlur tint="light" intensity={40} style={[styles.registerBtn]}>
          <TouchableOpacity
            onPress={handleNavigateTo}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>S'inscrire</Text>
          </TouchableOpacity>
        </AnimatedBlur>
      </AnimatedShared>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 18,
    height: 60,
    padding: 15,
    width: "100%",
    color: "white",
  },
  registerBtn: {
    flex: 1,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    paddingRight: 40,
    alignItems: "flex-end",
    zIndex: 12,
  },
});
