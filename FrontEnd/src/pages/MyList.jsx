import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";

const MyList = () => {
  const [error, setError] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  const removeFromList = async (foodId) => {
    try {
      const res = await axios.delete(`${API_URL}/my-list/${foodId}`);
      setConfirmMessage(res.data.message);
      setTimeout(() => {
        setConfirmMessage("");
      }, 3000);
      setList(list.filter((item) => item._id !== foodId));
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${API_URL}/my-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setList(res.data.foods);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>My list:</h1>
      <ul>
        {list.map((item) => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => removeFromList(item._id)}></button>
          </li>
        ))}
      </ul>
      {confirmMessage && <h4 className="success">{confirmMessage}</h4>}
      {error && <h4 className="error">{error}</h4>}
    </div>
  );
};

export default MyList;
