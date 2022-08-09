export async function registerUser(loginPayload) {
  try {
    let response = await fetch("https://clusterdafrica.com/api/signup", {
      method: "POST",
      body: loginPayload,
    });
    console.log("register: ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
