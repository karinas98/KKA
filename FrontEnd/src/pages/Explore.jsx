import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../consts-data';

const Explore = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/foods`);
        setIsLoading(false);
        console.log(data);
        setData(data);
      } catch (err) {
        //const res = await axios.get(`${API_URL}/foods`);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul>
          {data.data.map((element, ind) => (
            <ul key={ind}>
              <li>
                <h2>{element.name}</h2>
              </li>
              <img src={element.foodUrl} alt="food image" />
              <li>
                <p>
                  {element.origin}- <img src={element.flagUrl} alt="flags" />
                </p>
                <p>{element.description}</p>
              </li>
              <li>{element.reviews} reviews</li>
            </ul>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Explore;
