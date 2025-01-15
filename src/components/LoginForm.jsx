import { useState } from "react";
import userServices from "../utilities/users-services";

function LoginForm({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = { ...formData };
    console.log(credentials);
    try {
      // the promise returned by the login service method will resolve to the user
      // object includes in the payload of the JWT
      const user = await userServices.login(credentials);
      console.log(user);
      setUser(user);
    } catch (err) {
      setError("Log in Failed - Try Again");
    }
  }
  return (
    <>
      <h2>Log In </h2>
      <div>
        <form className="loginForm" autoComplete="off" onSubmit={handleSubmit}>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <br />

          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <br />
          <br />
          <button type="submit">LOG IN</button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
