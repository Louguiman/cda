import React from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

//import les screen
import Accueil from "../../Screen/Accueil/index";
import Gouvernance from "../../Screen/Gouvernance/index";
import Presentation from "../../Screen/Presentation/index";
import Ambassadeur from "../../Screen/Ambassadeur/index";
import BureauExecutif from "../../Screen/BureauExcecutif/index";
import Contact from "../../Screen/Contact/index";
import Membres from "../../Screen/Membres";
import MembreDetails from "../../Screen/Membres/MembreDetails";
import Pepinier from "../../Screen/Pepiniere";
import CustonDrawer from "../../Components/custonDrawer";
import Event from "../../Screen/Event/Events";
import Webinaire from "../../Screen/Webinaire/Webinaires";
//import sharded Screen
import SpeakerScreen from "../../Screen/speaker";
import { Easing } from "react-native-reanimated";

enableScreens();

const Drawer = createDrawerNavigator();
const sharedStack = createSharedElementStackNavigator();
const sharedScreens = () => {
  return (
    <sharedStack.Navigator>
      <sharedStack.Screen
        name="index"
        component={Accueil}
        options={{ headerShown: false }}
      />
      <sharedStack.Screen
        name="Membres"
        component={Membres}
        options={() => ({
          headerShown: false,
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: "timing",
              config: { duration: 500, easing: Easing.inOut(Easing.ease) },
            },
            close: {
              animation: "timing",
              config: { duration: 500, easing: Easing.inOut(Easing.ease) },
            },
          },
          cardStyleInterpolation: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
      <sharedStack.Screen
        name="Details"
        component={SpeakerScreen}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: "timing",
              config: { duration: 500, easing: Easing.inOut(Easing.ease) },
            },
            close: {
              animation: "timing",
              config: { duration: 500, easing: Easing.inOut(Easing.ease) },
            },
          },
          cardStyleInterpolation: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
    </sharedStack.Navigator>
  );
};

const index = (props) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustonDrawer {...props} />}>
      <Drawer.Screen
        name="Accueil"
        component={sharedScreens}
        options={{ headerShown: false }}
      />

      <Drawer.Screen name="Gouvernance" component={Gouvernance} />
      <Drawer.Screen name="Presentation" component={Presentation} />
      <Drawer.Screen name="Ambassadeur" component={Ambassadeur} />
      <Drawer.Screen name="Bureau-Excecutif" component={BureauExecutif} />
      <Drawer.Screen name="Pepinier" component={Pepinier} />
      <Drawer.Screen name="Contact" component={Contact} />
      <Drawer.Screen
        name="Webinaire"
        component={Webinaire}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Event"
        component={Event}
        options={{ headerShown: false }}
      />
      <Drawer.Group screenOptions={{ presentation: "modal" }}>
        <Drawer.Screen
          name="MembreDetails"
          component={MembreDetails}
          options={{ headerShown: false }}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

export default index;
