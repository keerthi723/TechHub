import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaStar,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaRocket,
  FaTrophy,
  FaBriefcase,
} from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  const features = [
    {
      icon: <FaGraduationCap />,
      title: "Expert-Led Training",
      description:
        "Learn from industry professionals with years of real-world experience in IoT and hardware development.",
    },
    {
      icon: <FaRocket />,
      title: "Project-Based Learning",
      description:
        "Build actual working prototypes and deploy them. Theory meets practice in every lesson.",
    },
    {
      icon: <FaTrophy />,
      title: "Industry Certification",
      description:
        "Get recognized certifications that employers value and help you stand out in the job market.",
    },
    {
      icon: <FaBriefcase />,
      title: "Career Support",
      description:
        "Access our job portal, resume reviews, and interview preparation to land your dream role.",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Complete Arduino Bootcamp",
      subtitle: "From Zero to Hero in 8 Weeks",
      duration: "12 hours",
      students: "2.4K",
      rating: 4.9,
      level: "All Levels",
      topics: ["Sensors", "Actuators", "IoT Projects", "Serial Communication"],
    },
    {
      id: 2,
      title: "IoT with ESP32 & Cloud",
      subtitle: "Build Connected Smart Devices",
      duration: "15 hours",
      students: "1.8K",
      rating: 4.8,
      level: "Intermediate",
      topics: ["WiFi/BLE", "Cloud Integration", "MQTT", "Web Servers"],
    },
    {
      id: 3,
      title: "Raspberry Pi Masterclass",
      subtitle: "Linux, Python & Automation",
      duration: "18 hours",
      students: "3.1K",
      rating: 4.9,
      level: "Beginner",
      topics: [
        "Linux Basics",
        "GPIO Control",
        "Python Scripts",
        "Home Automation",
      ],
    },
  ];

  const reviews = [
    {
      name: "Aditya Verma",
      role: "IoT Engineer at Bosch",
      rating: 5,
      text: "This platform completely transformed my career. The hands-on projects gave me real confidence.",
      time: "2 weeks ago",
    },
    {
      name: "Sneha Patel",
      role: "Embedded Developer at Infosys",
      rating: 5,
      text: "Best investment I made in my education. The instructors are incredibly knowledgeable and supportive.",
      time: "1 month ago",
    },
    {
      name: "Rohan Mehta",
      role: "Hardware Startup Founder",
      rating: 5,
      text: "Used these courses to build my first commercial product. Practical, clear, and industry-relevant.",
      time: "3 weeks ago",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section-new">
        <div className="hero-content-wrapper">
          <div className="hero-text-side">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Empowering 15,000+ Tech Innovators Worldwide
            </div>

            <h1 className="main-heading">
              Master <span className="gradient-text">IoT & Hardware</span>
              <br />
              Development in Weeks, Not Years
            </h1>

            <p className="main-description">
              Join the most comprehensive online platform for IoT, embedded
              systems, and hardware programming. Learn by building real projects
              that matter.
            </p>

            <div className="cta-buttons">
              <Link to="/signup" className="btn-primary-new">
                Start Learning Now
                <FaArrowRight />
              </Link>
              <button className="btn-secondary-new">
                <FaPlay />
                Watch Demo
              </button>
            </div>

            <div className="trust-info">
              <FaCheckCircle />
              <span>
                No credit card required • Cancel anytime • 7-day free trial
              </span>
            </div>

            {/* Stats Row */}
            <div className="stats-row">
              <div className="stat-box">
                <h3>15K+</h3>
                <p>Active Students</p>
              </div>
              <div className="stat-box">
                <h3>200+</h3>
                <p>Expert Courses</p>
              </div>
              <div className="stat-box">
                <h3>50+</h3>
                <p>Industry Projects</p>
              </div>
              <div className="stat-box">
                <h3>95%</h3>
                <p>Success Rate</p>
              </div>
            </div>
          </div>

          <div className="hero-image-side">
            <div className="image-carousel">
              <div className="carousel-inner">
                {heroImages.map((img, index) => (
                  <div
                    key={index}
                    className={`carousel-slide ${
                      index === currentSlide ? "active-slide" : ""
                    }`}
                    style={{ backgroundImage: `url(${img})` }}
                  />
                ))}
              </div>

              <button className="carousel-control prev" onClick={prevSlide}>
                <FaChevronLeft />
              </button>
              <button className="carousel-control next" onClick={nextSlide}>
                <FaChevronRight />
              </button>

              <div className="carousel-indicators">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${
                      index === currentSlide ? "active" : ""
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section-new">
        <div className="container">
          <div className="section-header-new">
            <h2>Why Choose TechHub?</h2>
            <p>
              Everything you need to succeed in IoT and hardware development
            </p>
          </div>

          <div className="features-grid-new">
            {features.map((feature, index) => (
              <div key={index} className="feature-item-new">
                <div className="feature-icon-box">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses-section-new">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <h2>Most Popular Courses</h2>
              <p>Start with our top-rated programs</p>
            </div>
            <Link to="/courses" className="view-all-link">
              Explore All <FaArrowRight />
            </Link>
          </div>

          <div className="courses-grid-new">
            {courses.map((course) => (
              <div key={course.id} className="course-card-new">
                <div className="course-card-header">
                  <div className="course-badges">
                    <span className="badge-level">{course.level}</span>
                    <span className="badge-rating">
                      <FaStar /> {course.rating}
                    </span>
                  </div>
                  <h3>{course.title}</h3>
                  <p className="course-subtitle">{course.subtitle}</p>
                </div>

                <div className="course-tags">
                  {course.topics.map((topic, idx) => (
                    <span key={idx} className="tag">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="course-card-footer">
                  <div className="course-meta">
                    <span>
                      <FaClock /> {course.duration}
                    </span>
                    <span>
                      <FaUsers /> {course.students}
                    </span>
                  </div>
                  <button className="btn-enroll">Start Course</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section-new">
        <div className="container">
          <h2 className="text-center">What Our Students Say</h2>
          <p className="text-center subtitle">
            Real feedback from real learners
          </p>

          <div className="reviews-grid-new">
            {reviews.map((review, index) => (
              <div key={index} className="review-card-new">
                <div className="review-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="review-text">{review.text}</p>
                <div className="review-author">
                  <div className="author-avatar">{review.name.charAt(0)}</div>
                  <div>
                    <h4>{review.name}</h4>
                    <p>{review.role}</p>
                  </div>
                </div>
                <span className="review-date">{review.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-new">
        <div className="container">
          <div className="cta-grid">
            <div className="cta-text">
              <h2>Ready to Start Your Journey?</h2>
              <p>
                Join thousands of students building the future with IoT and
                hardware. Your first project starts today.
              </p>
              <ul className="cta-list">
                <li>
                  <FaCheckCircle /> Lifetime access to all courses
                </li>
                <li>
                  <FaCheckCircle /> Certificate upon completion
                </li>
                <li>
                  <FaCheckCircle /> 30-day money-back guarantee
                </li>
              </ul>
            </div>
            <div className="cta-action">
              <Link to="/signup" className="btn-cta-large">
                Get Started Free
              </Link>
              <p className="cta-small-text">
                No payment required • Start learning in 30 seconds
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
