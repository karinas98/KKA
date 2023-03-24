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
      setList(list.filter((item) => item._id !== foodId)); // remove item from the UI
    } catch (err) {
      console.log(error);
      setError(err.response.data.message);
    }
  };

  const [list, setList] = useState([]);
  // const [error, setError] = useState("");
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
        //const res = await axios.get(`${API_URL}/users`);
        // console.log(res.data.data[4].list);
        // console.log(res.data.data[1].list[1]);
        // setList(res.data.data[1].list[1]);
      } catch (err) {
        console.log(err);
        //setError(err.response.data.message);
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
        {/* {error && <h4 className="error">{error}</h4>} */}
      </ul>
      {confirmMessage && <h4 className="success">{confirmMessage}</h4>}
      {error && <h4 className="error">{error}</h4>}
    </div>
  );
};

export default MyList;
