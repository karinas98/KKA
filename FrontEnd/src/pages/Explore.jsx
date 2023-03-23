import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../consts-data";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
//import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from "react-bootstrap/Dropdown";

const Explore = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchFilter, setSearchFilter] = useState(foods);

  const handleChange = async (e) => {
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
  };

  const addToMyList = async (foodId) => {
    try {
      await axios.post(`${API_URL}/myList`, { foodId });
    } catch (error) {
      console.error(error);
    }
  };

  // const onClick = async () => {
  //   const res = await axios.get(`${API_URL}/users`);
  //   const addToMyList = res.users.list;
  //   addToMyList.push(food._id)
  // };

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
      <form className="search-form">
        <input
          className="input-search icon-right"
          type="text"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput}
        />
        {searchFilter.map((element) => (
          <Dropdown.Item key={element._id} to={`/foods/${element._id}`}>
            <Link to={`/foods/${element._id}`}>
              <span className="dropdown-search">
                <img className="flag-card" src={element.flagUrl} />
                <p>{element.name}</p>
              </span>
            </Link>
          </Dropdown.Item>
        ))}
      </form>

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

                        <button
                          className="list-btn"
                          onClick={() => addToMyList(element._id)}
                        >
                          <img
                            className="list-icon"
                            src="https://res.cloudinary.com/de9zdtobn/image/upload/v1679488194/icons8-add-to-list-64_kuuyn6.png"
                          />
                        </button>
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
              </Card>
            </ul>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Explore;
