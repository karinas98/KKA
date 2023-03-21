import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";
import Card from "react-bootstrap/Card";

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
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={element.foodUrl}
                  alt="food image"
                />
                <Card.Body>
                  <li>
                    <Card.Title>{element.name}</Card.Title>
                  </li>
                  <li>
                    <Card.Text>{element.origin}</Card.Text>
                    <Card.Img src={element.flagUrl} alt="flags" />
                    <Card.Img src={element.flag2Url} alt="flags" />
                    <Card.Text>{element.description}</Card.Text>
                  </li>
                  {/* <li>{element.reviews} reviews</li> */}
                  {/* <Button className="favorite" variant="primary"></Button> */}
                </Card.Body>
              </Card>
            </ul>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Explore;
