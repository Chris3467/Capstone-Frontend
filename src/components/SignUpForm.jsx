import { useState } from "react";
import { signUp } from "../utilities/users-services";

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // This will add a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const submitData = { ...formData };
      console.log(submitData);
      const user = await signUp(submitData);
      console.log(user);
      setUser(user);

      // Show a success message
      alert("Sign-up successful! Please log in.");
    } catch (err) {
      setError("Sign up failed - try again");
    }
  };

  return (
    <>
      <br />
      <h2>
        Create a profile to get access to training and have your stats get
        saved!
      </h2>
      <form className="signUpForm" autoComplete="off" onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder=" Name"
          required
        />
        <br />

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
        <button type="submit">SIGN UP</button>
      </form>
      <br />
      <h3>OR</h3>
    </>
  );
}

export default SignUpForm;
