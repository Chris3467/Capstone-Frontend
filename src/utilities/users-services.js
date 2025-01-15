import * as usersAPI from "./users-api";

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  console.log(token);

  localStorage.setItem("token", token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);

  // persist the token
  localStorage.setItem("token", token);
  return getUser();
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  // obtain the payload
  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.exp < Date.now() / 1000) {
    // token has expired and we remove it from local storage
    localStorage.removeItem("token");
    return null; // return null to indicate that the user is no longer authenticated
  }
  return token;
}

export function getUser() {
  const token = getToken();

  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
  // return the name and email from the payload
}

export function logOut() {
  localStorage.removeItem("token");
}

export default { login };
