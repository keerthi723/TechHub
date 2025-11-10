import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaMicrochip,
  FaChevronDown,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Create refs for dropdown
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const popularSearches = [
    " Arduino Smart Home",
    " ESP32 WiFi Projects",
    " Robotics for Beginners",
    " IoT Automation",
    " Raspberry Pi Gaming",
    " Sensor Networks",
  ];

  const exploreItems = [
    {
      category: "IoT & Smart Devices",
      items: [
        { name: "IoT Fundamentals", link: "/courses/iot-fundamentals" },
        { name: "Smart Home Automation", link: "/courses/smart-home" },
        { name: "Industrial IoT", link: "/courses/industrial-iot" },
        { name: "IoT Security", link: "/courses/iot-security" },
      ],
    },
    {
      category: "Hardware & Electronics",
      items: [
        { name: "Arduino Programming", link: "/courses/arduino" },
        { name: "Raspberry Pi Projects", link: "/courses/raspberry-pi" },
        { name: "ESP32/ESP8266", link: "/courses/esp32" },
        { name: "Circuit Design", link: "/courses/circuit-design" },
      ],
    },
    {
      category: "Robotics & AI",
      items: [
        { name: "Robotics Basics", link: "/courses/robotics" },
        { name: "AI for IoT", link: "/courses/ai-iot" },
        { name: "Computer Vision", link: "/courses/computer-vision" },
        { name: "Drone Programming", link: "/courses/drones" },
      ],
    },
    {
      category: "Embedded Systems",
      items: [
        { name: "Embedded C Programming", link: "/courses/embedded-c" },
        { name: "RTOS Development", link: "/courses/rtos" },
        { name: "Microcontroller Projects", link: "/courses/microcontroller" },
        { name: "PCB Design", link: "/courses/pcb-design" },
      ],
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    // Add event listener when dropdown is open
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowDropdown(false);
  };

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Side: Logo + Explore + Search */}
        <Link to="/" className="navbar-logo">
          <FaMicrochip className="logo-icon" />
          <span className="logo-text">TechHub</span>
        </Link>

        {/* Explore Mega Dropdown */}
        <div className="navbar-menu">
          <div
            className="nav-item-wrapper"
            onMouseEnter={() => setShowExploreDropdown(true)}
            onMouseLeave={() => setShowExploreDropdown(false)}
          >
            <button className="nav-item">
              Explore <FaChevronDown className="chevron-icon" />
            </button>
            {showExploreDropdown && (
              <div className="mega-dropdown">
                {exploreItems.map((category, catIndex) => (
                  <div key={catIndex} className="mega-dropdown-column">
                    <h4 className="category-title">{category.category}</h4>
                    {category.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        to={item.link}
                        className="mega-dropdown-item"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search IoT, Hardware, Projects..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          {showSuggestions && (
            <div className="search-suggestions">
              <p className="suggestions-title">Popular & Trending Searches</p>
              {popularSearches.map((search, index) => (
                <div key={index} className="suggestion-item">
                  {search}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Contact + Auth */}
        <Link to="/contact" className="contact-link">
          Contact
        </Link>

        <div className="navbar-links">
          {isAuthenticated ? (
            <div className="user-menu">
              <button
                ref={avatarRef}
                className="user-avatar-button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="user-avatar">{getUserInitial()}</div>
              </button>

              {showDropdown && (
                <div ref={dropdownRef} className="dropdown-menu">
                  <div className="dropdown-user-info">
                    <div className="dropdown-avatar">{getUserInitial()}</div>
                    <div>
                      <p className="dropdown-user-name">{user?.name}</p>
                      <p className="dropdown-user-email">{user?.email}</p>
                    </div>
                  </div>
                  <hr className="dropdown-divider" />
                  <Link
                    to="/dashboard"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Courses
                  </Link>
                  <Link
                    to="/dashboard"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Settings
                  </Link>
                  <hr className="dropdown-divider" />
                  <button
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-button login-btn">
                Login
              </Link>
              <Link to="/signup" className="nav-button signup-btn">
                Signup
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="mobile-menu-icon"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <div className="mobile-search">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
          <Link to="/" className="mobile-link">
            Explore All
          </Link>
          <Link to="/contact" className="mobile-link">
            Contact
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="mobile-link">
                Dashboard
              </Link>
              <Link to="/dashboard" className="mobile-link">
                My Courses
              </Link>
              <button className="mobile-link logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link">
                Login
              </Link>
              <Link to="/signup" className="mobile-link">
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
