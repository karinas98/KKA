import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../consts-data';


const Explore = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  
const origin=[API_URL]

 const handleChange = (e) => {
   e.preventDefault();
   setSearchInput(e.target.value);
   console.log(searchInput)
 };

 if (searchInput.length > 0) {
   origin.filter((country) => {
     return country.name.match(searchInput);
   });
 }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods`);
        console.log(res)
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
          {origin.map((element) => {
            <li>{element[0].origin}</li>;
          })}
        </ul>
      </div>
      
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
                    {element.origin} -{' '}
                    <img src={element.flag2Url} alt="flags" />
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
