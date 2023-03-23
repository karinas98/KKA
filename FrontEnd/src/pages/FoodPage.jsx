import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../consts-data';


const FoodPage = () => {
   const [review, SetReview] = useState('');
   const [reviews, setReviews] = useState([]);
   const onChangeHandler = (e) => {
     SetReview(e.target.value);
   };
   const onClickChandler = () => {
     setReviews((elem) => [...elem, review]);
     SetReview('');
   };
 
  const [food, setFood] = useState({});
  const { foodId } = useParams();
  const {reviewId}=useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods/${foodId}Ï`);
        setFood(res.data.data);
        console.log('hello');
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        <div>
          <li>
            <h1>{food.name}</h1>
          </li>
          <li>
            <h2>{food.origin}</h2>
          </li>
          <li>
            <img src={food.foodUrl} />
          </li>
          {/* <li>
            <img src={food.reviewId} />
          </li> */}
          <div className="main-container">
            {reviews.map((element) => (
              <div className="review-container">{element}</div>
            ))}
            <div className="review-flexbox">
              <h3 className="review text">Comment</h3>
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
