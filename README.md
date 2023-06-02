![GA Logo](https://raw.githubusercontent.com/karinas98/MusicLibraryProject/main/469f976e-1432-11e5-8199-6ac91363302b.png) 

# Food Community - Project 3

##Deployment Link
https://foods-paradise.netlify.app

##Timeline
2 Weeks - Group Project

## Project Brief
Build a full-stack application by making my own backend and front-end.
Use an Express API to serve the data from a Mongo Database
Consume the API with a separate front-end
Deliver a complete and functioning product


## Project Overview

For this project, we were asked to build our first full-stack application. Throughout our initial meeting as a team, we decided to combine our interest for food and build a Food Atlas app where users can search dishes from around the world and find recipes and information to try and recreate them. This project really challenged us to learn to work as a team, be organised and efficient and help one another to deliver a great final product. It was a great way to apply everything we had learned so far and solidify our knowledge of React. 

## Technologies
### Front-end
HTML
SCSS
JavaScript
React
Bootstrap
### Backend
MongoDB
React
Express

## Wireframing 

## Roadmap
For this project, we’ve decided to work on everything as a team so that we can all learn from one another and we can all take part in every aspect of the development. 


### Backend
For the backend, we had to create a React API using Mongoose to store all of our data to then use on the frontend. For this project, we needed three schemas to work with : Review, Food and User for authentication. The review schema was pretty straight forward since we only needed a text, timestamp and created by type. As for the food schema, that is where we included all the food’s information, meaning : name, country flag, food image, origin, description, ingredients, and reviews that we are taking from the review schema since each food will have its own review section.


## Front-End
##RoadMap

The first step of the project was to establish all the necessary routes and navbar needed throughout my application and to make sure that they all work. For the navbar we wanted the user to have access to their my list section only when they are logged in and so we created an if statement that changes the navbar elements to Login and Register when not logged in and logout and my list when logged in.

```javascript
<nav>
      {
        <ul className="primary-nav">
          {navigationLinks.map((link, idx) => (
            <li className="navbar" key={idx}>
              <Link to={link.slug}>{link.title}</Link>
            </li>
          ))}
        </ul>
      }
      <ul className="secondary-nav">
        {loggedIn ? (
          <>
            <li>
              <Link to="/my-list">My List</Link>
            </li>
            <li className="nav-item" onClick={onLogout}>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
```
Then we moved on to the Login and Registration pages. We implemented restrictions with error handlers and an if statement where the password length needs to be more than 7 and the username needs to be more than 3 when you register. Once they are successfully logged in, they are automatically navigated to the Login page.

```javascript
if (formData.password.length < 7 || formData.userName.length < 3) {
        setError("Invalid input please try again");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        const res = await axios.post(`${API_URL}/register`, formData);
        console.log(res);
        setMessage(res.data.message);
        setFormData(formData);
        navigate("/login");
      }
```
Then we worked on our Explore page where all the foods around the world would be displayed. To make it easier for the user, we included a search bar where they can filter by country origin. With the handleChange function, we were able to record the targeted value written on the search bar by the user, implement it in the ‘SearchInput’ state and filter through the ‘Foods’ state to find the matching origin. 

We also added an if statement so that when the search bar input is deleted, the filter goes back to its original state with all the foods. 

```javascript
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
```
Each Individual food in the explore section led to its own individual page. Each of these pages was done by navigating to the individual food’s id page and then displaying the desired data with the foods API. 

```javascript
 const onClick = async (e) => {
    navigate(`/foods/${e}`);
  };
```

## Challenge & Wins
The reviews section was a challenge for us because we had to brainstorm how to post into the API of the targeted food id and then display it on the frontend. By posting the review into the food API id and then retrieving it using GET to then change the state, we were able to achieve our review section.

```javascript
 const addReview = async (foodId) => {
    try {
      const res2 = await axios.post(`${API_URL}/foods/${foodId}`, {
        text: review,
      });
      SetReview("");
      setConfirmMessage(res2.data.message);
      const res1 = await axios.get(`${API_URL}/foods/${foodId}`);
      setFood(res1.data.data);
      setTimeout(() => {
        setConfirmMessage("");
      }, 3000);
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  ```
  
  ##Final Look
  
