import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Animated, { Easing,interpolateNode } from "react-native-reanimated";
import { enableScreens } from "react-native-screens";
enableScreens();
import AsyncStorage from "@react-native-async-storage/async-storage";

//Importation des Screens
import Connexion from "../../Screen/Login/connexion/SignInScreen";
import Inscription from "../../Screen/Login/Inscription/SignUpScreen";
import PassOublier from "../../Screen/Login/PassOublier";
import Ecran from "../../Screen/Login/EcranLogin/OnboardingScreen";

const Index = () => {
  const Stack = createNativeStackNavigator();
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  let SlideFromRight = (index, position, width) => {
    const inputRange = [index - 1, index, index + 1];
    const translateX = position.interpolateNode({
      inputRange: [index - 1, index, index + 1],
      outputRange: [width, 0, 0]
    })
    const slideFromRight = { transform: [{ translateX }] }
    return slideFromRight
  };

  const TransitionConfiguration = () => {
    return {
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: (sceneProps) => {
        const { layout, position, scene } = sceneProps;
        const width = layout.initWidth;
        const { index, route } = scene;
        const params = route.params || {}; // <- That's new
        const transition = params.transition || "default"; // <- That's new
        return {
          collapseExpand: CollapseExpand(index, position),
          default: SlideFromRight(index, position, width),
        }[transition];
      },
    };
  };
  

  React.useEffect(async () => {
    const appData = await AsyncStorage.getItem("isAppFirstLaunched");
    if (appData == null) {
      setIsAppFirstLaunched(false);
      AsyncStorage.setItem("isAppFirstLaunched", "false");
    } else {
      setIsAppFirstLaunched(true);
    }

    // AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);

  return (
    isAppFirstLaunched != null && (
      <Stack.Navigator
        screenOptions={{ headerShown: false, headerTitleAlign: "center" }}
      >
        {isAppFirstLaunched && <Stack.Screen name="Ecran" component={Ecran} />}
        <Stack.Screen
          name="Connexion"
          component={Connexion}
          options={() => ({
            headerShown: false,
            gestureEnabled: false,
            transitionSpec: {
              duration: 750,
              easing: Easing.out(Easing.poly(4)),
              timing: Animated.timing,
              useNativeDriver: true,
            },

            screenInterpolator: (sceneProps) => {
              const { layout, position, scene } = sceneProps;
              const width = layout.initWidth;
              const { index, route } = scene;
              const params = route.params || {}; // <- That's new
              const transition = params.transition || "default"; // <- That's new
              return {
                default: SlideFromRight(index, position, width),
              }[transition];
            },
          })}
        />
        <Stack.Screen
          name="Inscription"
          component={Inscription}
          options={() => ({
            headerShown: false,
            gestureEnabled: false,
            transitionSpec: {
              duration: 750,
              easing: Easing.out(Easing.poly(4)),
              timing: Animated.timing,
              useNativeDriver: true,
            },

            screenInterpolator: (sceneProps) => {
              const { layout, position, scene } = sceneProps;
              const width = layout.initWidth;
              const { index, route } = scene;
              const params = route.params || {}; // <- That's new
              const transition = params.transition || "default"; // <- That's new
              return {
                collapseExpand: CollapseExpand(index, position),
                default: SlideFromRight(index, position, width),
              }[transition];
            },
          })}
        />
        <Stack.Screen name="PassOublier" component={PassOublier} />
      </Stack.Navigator>
    )
  );
};

export default Index;
