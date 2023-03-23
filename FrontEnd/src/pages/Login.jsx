import { useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const login = () => {
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
  const [buttonActive, setButtonActive] = useState(false);

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setButtonActive(true);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/login`, formData);
      console.log(data.token);
      localStorage.setItem("token", data.token);

      //this code below set default headers
      //   axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
      setFormData(formData);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="main-form">
      <div className="back-form"></div>
      <span className="form-body">
        <h1 className="form-title">Login</h1>
        <form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={onChange}
              placeholder="Password*"
              name="password"
              value={formData.password}
            />
          </Form.Group>
          {buttonActive ? (
            <Button
              className="form-btn"
              variant="primary"
              type="submit"
              size="lg"
              active
            >
              Login
            </Button>
          ) : (
            <Button
              className="form-btn"
              variant="secondary"
              type="submit"
              size="lg"
              disabled
            >
              Login
            </Button>
          )}
          {error && <h4 className="error">{error}</h4>}
        </form>
      </span>
    </div>
  );
};

export default login;
