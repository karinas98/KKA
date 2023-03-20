import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const navigationLinks = [
    { title: 'Home', slug: '/' },
    { title: 'Explore', slug: '/explore' },
    { title: 'My List', slug: '/mylist' },
    { title: 'Login', slug: '/login' },
  ];
  const loginMylist = [
    { title: 'My List', slug: '/mylist' },
    { title: 'Logout', slug: '/' },
    { title: 'Register', slug: '' },
  ];

  const [loggedIn, setLoggedIn] = useState(false);

  // console.log(navigationLinks);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(localStorage.getItem('token') ? true : false);
    // setLoggedIn(localStorage.getItem('token')(!loggedIn))
    console.log('Location updated!');
    console.log({ location });
    console.log({ navigate });
  }, [location]);

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav>
      <ul>
        {navigationLinks.map((link, idx) => (
          <li className="navbar" key={idx}>
            <Link to={link.slug}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
  onLogout();
};

export default NavBar;
{loggedIn ? (
  <li className="nav-item" onClick={onLogout}>
    <Link to="/">Logout</Link>
  </li>
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