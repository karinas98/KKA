import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../consts-data';


const FoodPage = () => {
   const [comment, setComment] = useState('');
   const [comments, setComments] = useState([]);
   const onChangeHandler = (e) => {
     setComment(e.target.value);
   };
   const onClickChandler = () => {
     setComments((elem) => [...elem, comment]);
     setComment('');
   };
 
  const [food, setFood] = useState({});
  const { foodId } = useParams();
  const {reviewId}=useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods/${foodId}`);
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
            {comments.map((element) => (
              <div className="comment-container">{element}</div>
            ))}
            <div className="comment-flexbox">
              <h3 className="comment text">Comment</h3>
              <textarea value={comment} onChange={onChangeHandler}></textarea>
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
