import { HashLink as Link } from "react-router-hash-link";

function NavBar() {
  const NAV_ITEMS = [
    {
      navItem: "Home",
      navLink: "/",
    },
    {
      navItem: "Downloader",
      navLink: "/downloader",
    },
    {
      navItem: "Converter",
      navLink: "/converter",
    },
    {
      navItem: "About",
      navLink: "/about",
    },
    {
      navItem: "FAQs",
      navLink: "/#faqs",
    },

    {
      navItem: "Contact",
      navLink: "/contact",
    },
  ];
  return (
    <nav className="h-16 bg-gray-800  w-full flex items-center justify-between  shadow-md  sticky">
      <div className="site-logo px-4 py-1 h-full flex items-center">
        <img className="h-full" src="logo512.png" alt="Site Logo" />
      </div>
      <div className="site-nav mr-16">
        <ul className="navbar text-white text-xl font-bold flex h-16 items-center justify-center">
          {NAV_ITEMS.map((item, index) => {
            return <ListItem key={index} {...item} />;
          })}
        </ul>
      </div>
    </nav>
  );
}
function ListItem({ navItem, navLink }) {
  return (
    <li className="nav-item ">
      <Link to={navLink}>{navItem} </Link>
    </li>
  );
}

export default NavBar;
