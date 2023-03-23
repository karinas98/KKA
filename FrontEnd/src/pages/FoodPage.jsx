import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../consts-data";

const FoodPage = () => {
  // const onChangeHandler = (e) => {
  //   setComment(e.target.value);
  // };
  const [food, setFood] = useState({});
  const { foodId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods/${foodId}`);
        setFood(res.data.data);
        console.log("hello");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        <div className="food-page">
          <span className="food-header">
            <span className="header-left">
              <li>
                <h1 className="inv-title">{food.name}</h1>
              </li>
              <li>
                <h2 className="inv-origin">{food.origin}</h2>
              </li>
            </span>
            <li className="header-right">
              <img width="100%" src={food.foodUrl} />
            </li>
          </span>

          <li>
            <p className="inv-desc">{food.description}</p>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default FoodPage;
