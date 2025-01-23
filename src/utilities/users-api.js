const LOCAL_URL = "http://localhost:5052";
const API_URL = "/api/users";
const API_URL2 = "/api/pieces";
//const URL = LOCAL_URL + API_URL;

const deployedUrl = "https://capstone-backend-yvig.onrender.com";
const URL = deployedUrl + API_URL;
export async function signUp(userData) {
  console.log(userData);
  // fetch uses an options object as a second arg to make requests other then basic GET requests, include data, headers, ect
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // fetch requires data payloads to be stringified and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  console.log(res);
  // check is request was successful
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function login(credentials) {
  const res = await fetch(URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  console.log(credentials);
  console.log(res);
  // check if successful
  if (res.ok) {
    // this will resolve to the JWT
    return res.json();
  } else {
    throw new Error("Invalid Log In");
  }
}

// export async function getPieces() {
//   const res = await fetch(deployedUrl + API_URL2, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("Unable to retrieve pieces");
//   }
// }
