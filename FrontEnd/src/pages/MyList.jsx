import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";

const MyList = () => {
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
          <li key={item._id}>{item.name}</li>
        ))}
        {/* {error && <h4 className="error">{error}</h4>} */}
      </ul>
    </div>
  );
};

export default MyList;
