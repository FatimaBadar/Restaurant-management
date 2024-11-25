import React, { useState, useEffect } from "react";
import Restaurantlogo from "../Images/RestaurantLogo7.png";
import "./EmployeeHeader.css";
import { useNavigate, Link } from "react-router-dom";

export default function Header(props) {
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [loggedin, setLoggedin] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    var username = localStorage.getItem("username");
    var userid = localStorage.getItem("userid");
    var loggedin = localStorage.getItem("loggedin");

    setUsername(username);
    setUserid(userid);
    setLoggedin(JSON.parse(loggedin));
  }, []);

  const LogoutFunc = () => {
    localStorage.removeItem("userid");
    localStorage.clear();
    setLoggedin(false);
    navigate("/*");
  };

  return (
    <header>
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"
          data-bs-theme="dark"
        >
          {/* <nav className="navbar navbar-expand-lg bg-body-tertiary"> */}
          <div className="container-fluid">
            <Link className="navbar-brand" to="#">
              <img id="restaurantlogo" src={Restaurantlogo} alt="logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to="/*">
                  Home
                </Link>
                {/* <Link className="nav-link" to="/usermenu">Menu</Link> */}
                {/* <Link className="nav-link" to="/menu">Manage Menu</Link> */}
                <Link className="nav-link" to="/inventory">
                  Inventory
                </Link>
                {/* <Link className="nav-link" to="/employee">Manage Employees</Link> */}
                {/* <Link className="nav-link" to="/reservation">Reservation</Link> */}
              </div>
              <div className="navbar-nav ms-auto">
                {!loggedin && (
                  <Link to="/login" className="nav-item nav-link">
                    Login
                  </Link>
                )}
                {/* <Link className="nav-link" to="/settings">Settings</Link> */}
                {/* <Link className="nav-link" to="/cart">Cart</Link> */}
                {loggedin && (
                  <span className="nav-link" onClick={LogoutFunc}>
                    Logout
                  </span>
                )}
              </div>
            </div>
          </div>
        </nav>
        {/* <?php if(isset($_SESSION['loggedin'])) : ?>
                        Welcome <?php echo $_SESSION['UserID']?>
                <?php endif; ?>  */}
      </div>
    </header>
  );
}
