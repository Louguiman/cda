// Context/actions.js
import axios from "axios";
import Toast from "react-native-toast-message";

// import { authUser } from "../services/query";

const ROOT_URL = "http://demosocial.com:8888/api/";

const instance = axios.create({
  baseURL: ROOT_URL,
  timeout: 1000,
  headers: { "Content-Type": "multipart/form-data" },
});

export async function loginUser(dispatch, loginPayload) {
  const form = new FormData();
  console.log("out :",loginPayload);
  const { username, password } = loginPayload;
  form.append("email", username);
  form.append("password", password);

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    // let response = await instance.post("login", form);

    let response = await fetch("https://clusterdafrica.com/api/login", {
      method: "POST",
      body: form,
    });

    let result = await response.json();
    console.log("la reponse : ", result);
    if (result.code == 200) {
      Toast.show({
        type: "success",
        text1: `Bienvenue Mr/Mme ${result.data.first_name} ${result.data.last_name}`,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: data[0] });
      return result;
    } else {
      Toast.show({
        type: "error",
        text1: "Une erreur est survenue!",
        text2: result.message,
      });
      dispatch({ type: "LOGIN_ERROR", error: data });
      return;
    }
  } catch (error) {
    //console.log("error: ", error);
    Toast.show({
      type: "error",
      text1: "Une erreur est survenue, \nVeuillez ressayer!",
      text2: `${error}`,
    });
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
}
