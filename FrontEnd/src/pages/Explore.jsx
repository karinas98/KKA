import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../consts-data";
import Card from "react-bootstrap/Card";
// import { set } from 'mongoose';

const Explore = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods`);
        const foodsArray = res.data.data;
        foodsArray.sort((a, z) => {
          return parseInt(z.name) - parseInt(a.name);
        });
        setIsLoading(false);
        setFoods(foodsArray);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const onChange = (e) => {
    setSearchInput(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <form className="formSearch">
        <input
          className="search"
          type="text"
          value={searchInput}
          onChange={onChange}
          placeholder="Country name"
          name="origin"
        />
      </form>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul className="food-card">
          {foods.map((element, ind) => (
            <ul key={ind}>
              <Card style={{ width: "30rem" }}>
                <div>
                  <li>
                    <Card.Img
                      variant="top"
                      src={element.foodUrl}
                      alt="food image"
                    />
                  </li>
                  <Card.Body>
                    <li>
                      <Card.Title>{element.name}</Card.Title>
                    </li>
                    <div className="origin-card">
                      <li>
                        <Card.Text>{element.origin} - </Card.Text>
                      </li>
                      <li className="flag-card">
                        <Card.Img
                          variant="top"
                          src={element.flagUrl}
                          alt="flags"
                        />
                      </li>

                      <li className="flag-card">
                        <Card.Img
                          variant="top"
                          src={element.flag2Url}
                          alt="flags"
                        />
                      </li>
                    </div>
                    <li>
                      <Card.Text>{element.description}</Card.Text>
                    </li>
                  </Card.Body>
                </div>
                {/* <li>{element.reviews} reviews</li> */}
              </Card>
            </ul>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Explore;
