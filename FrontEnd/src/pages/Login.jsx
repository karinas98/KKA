import { useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const initialFormData = {
  //   userName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // };
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      console.log("Response:", response);
      const { data } = response;
      console.log("Token:", data.token);
      const token = data.token;
      localStorage.setItem("token", token);
      //axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setFormData(formData);
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      {error && <h4>{error}</h4>}
      <form onSubmit={onSubmit}>
        <input
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
        <input
          onChange={onChange}
          placeholder="Password*"
          name="password"
          value={formData.password}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
