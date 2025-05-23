import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark navbar-custom scrolled">
      <div className="container-fluid">
        <a className="navbar-brand" href="#section1">
          MyWebPage
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#section1">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#section2">
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#section3">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
