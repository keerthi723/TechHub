import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import {
  FaBookOpen,
  FaClock,
  FaTrophy,
  FaChartLine,
  FaPlay,
  FaStar,
  FaFire,
  FaCheckCircle,
} from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Mock data - replace with actual API calls
  const stats = {
    coursesEnrolled: 5,
    coursesCompleted: 2,
    totalHours: 48,
    currentStreak: 7,
    points: 2450,
  };

  const enrolledCourses = [
    {
      id: 1,
      title: "Arduino Programming Masterclass",
      progress: 65,
      nextLesson: "Building a Temperature Monitor",
      totalLessons: 45,
      completedLessons: 29,
      thumbnail:
        "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400",
      instructor: "Dr. Rajesh Kumar",
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "IoT with ESP32 & Cloud Integration",
      progress: 40,
      nextLesson: "MQTT Protocol Basics",
      totalLessons: 38,
      completedLessons: 15,
      thumbnail:
        "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400",
      instructor: "Priya Sharma",
      difficulty: "Advanced",
    },
    {
      id: 3,
      title: "Raspberry Pi Home Automation",
      progress: 20,
      nextLesson: "GPIO Pin Configuration",
      totalLessons: 32,
      completedLessons: 6,
      thumbnail:
        "https://images.unsplash.com/photo-1580982324927-c519821a4666?w=400",
      instructor: "Amit Patel",
      difficulty: "Beginner",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Completed",
      item: "Arduino Sensors Module",
      time: "2 hours ago",
      icon: <FaCheckCircle />,
    },
    {
      id: 2,
      action: "Started",
      item: "ESP32 WiFi Projects",
      time: "1 day ago",
      icon: <FaPlay />,
    },
    {
      id: 3,
      action: "Earned Badge",
      item: "Hardware Enthusiast",
      time: "3 days ago",
      icon: <FaTrophy />,
    },
  ];

  const recommendedCourses = [
    {
      id: 4,
      title: "PCB Design Fundamentals",
      rating: 4.9,
      students: "3.2K",
      duration: "12 hours",
    },
    {
      id: 5,
      title: "Embedded C Programming",
      rating: 4.8,
      students: "2.8K",
      duration: "15 hours",
    },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* Dashboard Header */}
      <div className="dash-header">
        <div className="dash-header-content">
          <div className="welcome-section">
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p>Continue your learning journey where you left off</p>
          </div>
          <div className="streak-badge">
            <FaFire className="streak-icon" />
            <div>
              <span className="streak-number">{stats.currentStreak}</span>
              <span className="streak-label">Day Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-overview">
        <div className="stat-card-dash">
          <div className="stat-icon courses-icon">
            <FaBookOpen />
          </div>
          <div className="stat-details">
            <h3>{stats.coursesEnrolled}</h3>
            <p>Courses Enrolled</p>
          </div>
        </div>

        <div className="stat-card-dash">
          <div className="stat-icon completed-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-details">
            <h3>{stats.coursesCompleted}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card-dash">
          <div className="stat-icon hours-icon">
            <FaClock />
          </div>
          <div className="stat-details">
            <h3>{stats.totalHours}h</h3>
            <p>Learning Time</p>
          </div>
        </div>

        <div className="stat-card-dash">
          <div className="stat-icon points-icon">
            <FaTrophy />
          </div>
          <div className="stat-details">
            <h3>{stats.points}</h3>
            <p>Total Points</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dash-main-content">
        {/* Left Section - Courses */}
        <div className="dash-left-section">
          <div className="section-header-dash">
            <h2>My Courses</h2>
            <Link to="/courses" className="view-all-btn">
              View All
            </Link>
          </div>

          <div className="courses-list-dash">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="course-card-dash">
                <div className="course-thumbnail">
                  <img src={course.thumbnail} alt={course.title} />
                  <span
                    className={`difficulty-badge ${course.difficulty.toLowerCase()}`}
                  >
                    {course.difficulty}
                  </span>
                </div>
                <div className="course-details-dash">
                  <h3>{course.title}</h3>
                  <p className="instructor-name">By {course.instructor}</p>

                  <div className="progress-section">
                    <div className="progress-info">
                      <span className="progress-text">
                        {course.progress}% Complete
                      </span>
                      <span className="lessons-count">
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                    </div>
                    <div className="progress-bar-dash">
                      <div
                        className="progress-fill"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="next-lesson">
                    <FaPlay className="play-icon-small" />
                    <span>Next: {course.nextLesson}</span>
                  </div>

                  <button className="continue-btn">Continue Learning</button>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Courses */}
          <div className="section-header-dash" style={{ marginTop: "3rem" }}>
            <h2>Recommended For You</h2>
          </div>
          <div className="recommended-list">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="recommended-card">
                <div className="rec-icon">💡</div>
                <div className="rec-details">
                  <h4>{course.title}</h4>
                  <div className="rec-meta">
                    <span>
                      <FaStar className="star-small" /> {course.rating}
                    </span>
                    <span>•</span>
                    <span>{course.students} students</span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
                <button className="enroll-small-btn">Enroll</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Activity & Progress */}
        <div className="dash-right-section">
          {/* Learning Progress Chart */}
          <div className="progress-widget">
            <h3>This Week's Progress</h3>
            <div className="weekly-progress">
              <div className="progress-circle">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="progress-bg-circle"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="progress-fg-circle"
                    style={{
                      strokeDasharray: `${75 * 2.827}, 282.7`,
                    }}
                  />
                </svg>
                <div className="progress-percent">75%</div>
              </div>
              <div className="progress-stats-text">
                <p>
                  <strong>18 hours</strong> this week
                </p>
                <p className="target-text">Target: 24 hours</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="activity-widget">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <p className="activity-action">
                      <strong>{activity.action}</strong> {activity.item}
                    </p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-widget">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn">
                <FaChartLine /> View Analytics
              </button>
              <button className="action-btn">
                <FaTrophy /> My Certificates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
