import { Link } from 'react-router-dom';


const NavBar = () => {
  const navigationLinks = [
    { title: 'Home', slug: '/' },
    { title: 'Explore', slug: '/explore' },
    { title: 'My List', slug: '/mylist' },
    { title: 'Register', slug: '/register' },
    { title: 'Login', slug: '/login' },
  ];

  console.log(navigationLinks);
  return (
    <nav>
      <ul>
        {navigationLinks.map((link, idx) => (
          <li key={idx}>
            <Link to={link.slug}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
