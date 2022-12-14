import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <img
        alt="logo"
        className="logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLuIUyQ9r3SrViVd0iclDLSc82dOylJ-eT8UlB4Hk&s"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Notions</Link>
          </li>
          <li>
            <Link to="/add">Add Notions</Link>
          </li>
          <li>
            <Link to="/update"> Update Notions</Link>
          </li>
          <li>
            <Link to="/notionData">NotionData</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            {" "}
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
