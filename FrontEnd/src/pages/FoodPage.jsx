import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../consts-data";

const FoodPage = () => {
  const [review, SetReview] = useState("");
  //const [reviews, setReviews] = useState([]);
  const [food, setFood] = useState({});
  const { foodId } = useParams();

  const onChangeHandler = (e) => {
    SetReview(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`${API_URL}/foods/${foodId}`);
        setFood(res1.data.data);
        console.log(food);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // const addReview = async (foodId) => {
  //   try {
  //     const res2 = await axios.post(`${API_URL}/foods/${foodId}`, {
  //       text: review,
  //     });
  //     const newReview = res2.data;
  //     setReviews((reviews) => [...reviews, newReview]);
  //     console.log(reviews);
  //     SetReview("");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
            <h3>Reviews:</h3>
            {/* {food.reviews.map((review) => review.text)} */}
            <div className="review-flexbox">
              <h3 className="review text">Leave a Comment</h3>
              <textarea value={review} onChange={onChangeHandler}></textarea>
              <br></br>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default FoodPage;
