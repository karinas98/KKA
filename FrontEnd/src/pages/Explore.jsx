import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../consts-data';
// import { set } from 'mongoose';

const Explore = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');

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
    setSearchInput( e.target.value );
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
        <ul>
          {foods.map((element, ind) => (
            <ul key={ind}>
             <div>
              <li>
                <h2>{element.name}</h2>
              </li>
              <li>
              <img src={element.foodUrl} alt="food image" />
              </li>
              <li>
                <p>
                  {element.origin} - <img src={element.flagUrl} alt="flags" />
                </p>
                <p>
                  {element.origin} - <img src={element.flag2Url} alt="flags" />
                </p>
                </li>
                <li>
                  <p>{element.description}</p>
                </li>
                </div>
              <li>{element.reviews} reviews</li>
            </ul>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Explore;
