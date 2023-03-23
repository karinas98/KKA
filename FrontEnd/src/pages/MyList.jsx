import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";

const MyList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        try {
          const res = await axiosInstance.get(`${API_URL}/myList`);
          setList(res.data);
        } catch (err) {
          console.log(err);
        }
      }
      //   try {
      //     const res = await axios.get(`${API_URL}/myList`);
      //     console.log(res);
      //     setList(res.data);
      //   } catch (err) {
      //     console.log(err);
      //   }
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
      </ul>
    </div>
  );
};

export default MyList;
