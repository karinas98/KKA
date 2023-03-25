import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MyList = () => {
  const [error, setError] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  const removeFromList = async (foodId) => {
    try {
      const res = await axios.delete(`${API_URL}/my-list/${foodId}`);
      setConfirmMessage(res.data.message);
      setTimeout(() => {
        setConfirmMessage("");
      }, 3000);
      setList(list.filter((item) => item._id !== foodId));
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${API_URL}/my-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setList(res.data.foods);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="list-page">
      <div className="gradient"></div>
      <div className="list">
        <h1 className="list-title">My List</h1>
        {confirmMessage && <h4 className="success">{confirmMessage}</h4>}
        {error && <h4 className="error">{error}</h4>}
        <ul>
          {list.map((item) => (
            <Card className="card">
              <li key={item._id}>
                <Card.Body className="list-body">
                  <Card.Header className="card-title">{item.name}</Card.Header>
                  <Card.Title>
                    <img
                      className="img-list"
                      width="150px;"
                      src={item.foodUrl}
                    />
                  </Card.Title>
                  <Card.Text>{item.ingredients}</Card.Text>
                  <Button
                    variant="danger"
                    className="list-delete"
                    onClick={() => removeFromList(item._id)}
                  >
                    Delete From List
                  </Button>
                </Card.Body>
              </li>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyList;
