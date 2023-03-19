import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../consts-data';

const Register = () => {
  // const initialFormData = {
  //   userName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // };
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/register`, formData);
      console.log(res);
      setMessage(res.data.message);
      setFormData(formData);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      {message && <h4>{message}</h4>}
      {error && <h4>{error}</h4>}
      <form onSubmit={onSubmit}>
        <input
          placeholder="UserName"
          name="userName"
          onChange={onChange}
          value={formData.userName}
        />
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
        <input
          placeholder="Confirm Password*"
          name="confirmPassword"
          onChange={onChange}
          value={formData.confirmPassword}
        />
        <button type="submit">Register</button>
      </form>

      <h1>Register</h1>
    </div>
  );
};

export default Register;
