import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../consts-data";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const Explore = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchFilter, setSearchFilter] = useState(foods);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(searchInput);
    const filteredFoods = foods.filter((food) =>
      food.origin.includes(searchInput)
    );
    setSearchFilter(filteredFoods);
    console.log(searchFilter);
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
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <div>
        <ul>
          {searchFilter.map((element) => {
            <ListGroup>
              <ListGroup.Item>{element.origin}</ListGroup.Item>;
            </ListGroup>;
          })}
        </ul>
      </div>

      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul>
          {foods.map((element, ind) => (
            <ul key={ind}>
              <Card style={{ width: "30rem" }}>
                <Link to={`/foods/${element._id}`}>
                  <button>
                    {" "}
                    <Link
                      to={{
                        pathname: `/myList/${element._id}`,
                        state: { food: element },
                      }}
                    >
                      Add to your list
                    </Link>
                  </button>
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
