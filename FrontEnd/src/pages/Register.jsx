import { useState } from "react";
const Register = () => {
    const [FormData, setFromData]=useState({
        userName: "",
        email: "",
        password: "",
        ConfirmPassword: "",
    })
return (
  <div>
    <h1>Register</h1>
    <form>
      <input placeholder="UserName" name="userName" />
      <input placeholder="Email" name="email" />
      <input placeholder="Password*" name="password" />
      <input placeholder="Confirm Password*" name="confirmPassword" />
      <button type="submit">Register</button>
    </form>
  </div>
);
}

export default Register;