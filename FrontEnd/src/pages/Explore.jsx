import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
//import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from "react-bootstrap/Dropdown";

const Explore = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchFilter, setSearchFilter] = useState(foods);
  const [error, setError] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = async (e) => {
    try {
      e.preventDefault();
      const inputValue = e.target.value;
      setSearchInput(inputValue);
      console.log(inputValue);
      const res = await axios.get(`${API_URL}/foods`);
      const foodsArray = res.data.data;
      console.log(res);
      foodsArray.sort((a, z) => {
        return parseInt(z.name) - parseInt(a.name);
      });
      if (inputValue.trim() === "") {
        setSearchFilter([]);
      } else {
        setFoods(foodsArray);
        const filteredFoods = foodsArray.filter((food) =>
          food.origin.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSearchFilter(filteredFoods);
        console.log(searchFilter);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addToMyList = async (foodId) => {
    try {
      const res = await axios.post(`${API_URL}/my-list/${foodId}`);
      setConfirmMessage(res.data.message);
      setTimeout(() => {
        setConfirmMessage("");
      }, 3000);
    } catch (err) {
      setError(err.response.data.message);
      console.log(err);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const onClick = async (e) => {
    navigate(`/foods/${e}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods`);
        console.log(res);
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

  return (
    <div className="explore">
      <section className="explore-header">
        <h1 className="explore-title">
          The 10 most popular foods in the world
        </h1>
      </section>
      <form className="search-form">
        <input
          className="input-search icon-right"
          type="text"
          placeholder="Search by country"
          onChange={handleChange}
          value={searchInput}
        />
        {searchFilter.map((element) => (
          <Dropdown.Item
            key={element._id}
            onClick={() => onClick(element._id)}
            to={`/foods/${element._id}`}
          >
            <span className="dropdown-search">
              <img className="flag-card" src={element.flagUrl} />
              <p>{element.name}</p>
            </span>
          </Dropdown.Item>
        ))}
      </form>

      {confirmMessage && <h4 className="success">{confirmMessage}</h4>}
      {error && <h4 className="error">{error}</h4>}
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul className="food-card">
          {foods.map((element, ind) => (
            <ul key={ind}>
              <Card style={{ width: "30rem" }}>
                <Link to={`/foods/${element._id}`}>
                  <div>
                    <li>
                      <Card.Img
                        variant="top"
                        src={element.foodUrl}
                        alt="food image"
                      />
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
                    </Card.Body>
                  </div>
                </Link>

                <button
                  className="list-btn"
                  onClick={() => addToMyList(element._id)}
                >
                  <img
                    className="list-icon"
                    src="https://res.cloudinary.com/de9zdtobn/image/upload/v1679488194/icons8-add-to-list-64_kuuyn6.png"
                  />
                </button>
              </Card>
            </ul>
          ))}
        </ul>
      )}
      <footer>
        <ul className="footer-list">
          <li>Home</li>
          <li>Explore</li>
          <li>My List</li>
          <li>Privacy Policy</li>
        </ul>
      </footer>
    </div>
  );
};

export default Explore;
