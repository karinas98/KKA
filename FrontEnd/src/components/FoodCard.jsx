import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";

const FoodCard = ({ element, usersList }) => {
  // map: create an array of the food ids already in the list.
  // find: find current element id in users list.
  const [isFoodInListAlready, setIsFoodInListAlready] = useState(
    usersList.find((food) => food._id === element._id)
  );
  // const [confirmMessage, setConfirmMessage] = useState("");

  const addToMyList = async () => {
    if (isFoodInListAlready) {
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/my-list/${element._id}`);
      setIsFoodInListAlready(true);
      // setConfirmMessage(res.data.message);
      // setTimeout(() => {
      //   setConfirmMessage("");
      // }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card className="main-card" style={{ width: "30rem" }}>
        {/* {confirmMessage && <h4 className="success">{confirmMessage}</h4>} */}

        <div>
          <li>
            <Link to={`/foods/${element._id}`}>
              <Card.Img variant="top" src={element.foodUrl} alt="food image" />
            </Link>
          </li>
          <Card.Body>
            <div className="card-header">
              <li>
                <Card.Title>{element.name}</Card.Title>
              </li>
            </div>

            <div className="origin-card">
              <li className="flag-card">
                <Card.Img src={element.flagUrl} alt="flags" />
              </li>
              <li>
                <Card.Text>{element.origin} </Card.Text>
              </li>
            </div>

            <button className="list-btn" onClick={addToMyList}>
              <img
                className="list-icon"
                src={
                  isFoodInListAlready
                    ? "https://res.cloudinary.com/de9zdtobn/image/upload/v1679742442/icons8-done-64_mq0ybn.png"
                    : "https://res.cloudinary.com/de9zdtobn/image/upload/v1679488194/icons8-add-to-list-64_kuuyn6.png"
                }
              />
            </button>
          </Card.Body>
        </div>
      </Card>
    </>
  );
};

export default FoodCard;
