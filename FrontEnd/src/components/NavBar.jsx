import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
  const navigationLinks = [
    { title: "Home", slug: "/" },
    { title: "Explore", slug: "/explore" },
  ];

  const [loggedIn, setLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(localStorage.getItem("token") ? true : false);
    console.log("Location updated!");
    console.log({ location });
    console.log({ navigate });
  }, [location]);

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
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
              <Link to="/myList">My List</Link>
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
  );
};

export default NavBar;
