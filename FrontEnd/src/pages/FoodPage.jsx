import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../consts-data";

const FoodPage = () => {
  const [review, SetReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const onChangeHandler = (e) => {
    SetReview(e.target.value);
  };
  const onClickChandler = () => {
    setReviews((elem) => [...elem, review]);
    SetReview("");
  };

  const [food, setFood] = useState({});
  const { foodId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods/${foodId}`);
        // const res2 = await axios.post(`${API_URL}/foods/${foodId}`);
        setFood(res.data.data);
        // setReviews(res2.data.data);
        // console.log(res2.data.data);
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
          <div className="main-container">
            {reviews.map((element) => (
              <div className="review-container">{element}</div>
            ))}
            <div className="review-flexbox">
              <h3 className="review text">Leave a Comment</h3>
              <textarea value={review} onChange={onChangeHandler}></textarea>
              <br></br>
              <button onClick={onClickChandler}>Submit</button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default FoodPage;
