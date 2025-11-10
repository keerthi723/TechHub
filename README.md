# TechHub - IoT & Hardware Learning Platform

A comprehensive MERN stack web application for learning IoT, embedded systems, and hardware development with secure user authentication.

## 🚀 Live Demo

**Frontend:** [Live on Vercel](https://techhub.vercel.app) _(will be updated after deployment)_

## 🎯 Project Overview

TechHub is an educational platform designed to help students and professionals master IoT and hardware development through hands-on projects and expert-led courses. The platform features secure user authentication, course browsing, and a personalized dashboard.

## 🛠️ Tech Stack

### Frontend

- **React.js** - UI library for building interactive interfaces
- **React Router DOM** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **React Icons** - Comprehensive icon library
- **CSS3** - Modern styling with animations

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **Bcrypt.js** - Password hashing and encryption
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## ✨ Key Features

### Authentication & Security

- ✅ Secure user registration with email validation
- ✅ Login system with credential verification
- ✅ JWT token-based authentication
- ✅ Password hashing using bcrypt (10 salt rounds)
- ✅ Protected routes and middleware
- ✅ Session management with token expiration

### User Interface

- ✅ Professional navigation bar with logo
- ✅ Search functionality with suggestions
- ✅ Responsive dropdown menu
- ✅ User avatar showing initials
- ✅ Course catalog with filters
- ✅ Student testimonials section
- ✅ Modern, clean design
- ✅ Mobile-responsive layout

### User Features

- ✅ Personalized dashboard after login
- ✅ Profile management
- ✅ Course enrollment tracking
- ✅ Secure logout functionality

## 🔐 Security Implementation

### Password Security

```javascript
// Passwords are hashed before storage
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password, salt);
```

### JWT Authentication

```javascript
// Tokens expire after 7 days
jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
```

### Protected Routes

- Middleware verifies JWT tokens
- Invalid/expired tokens are rejected
- Unauthorized access redirects to login

## 📁 Project Structure

```
TechHub/
├── client/                     # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── pages/             # Page components
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── Login.js
│   │   │   ├── Login.css
│   │   │   ├── Signup.js
│   │   │   ├── Signup.css
│   │   │   ├── Dashboard.js
│   │   │   └── Dashboard.css
│   │   ├── context/           # React Context
│   │   │   └── AuthContext.js
│   │   ├── utils/             # Utilities
│   │   │   └── api.js
│   │   ├── App.js             # Main app component
│   │   ├── App.css
│   │   ├── index.js           # Entry point
│   │   └── index.css
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── models/               # MongoDB models
│   │   └── User.js
│   ├── routes/               # API routes
│   │   └── auth.js
│   ├── middleware/           # Custom middleware
│   │   └── auth.js
│   ├── config/               # Configuration files
│   ├── server.js             # Express server
│   ├── .env                  # Environment variables
│   └── package.json
│
├── README.md                 # Project documentation
└── .gitignore               # Git ignore rules
```

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

### 1. Clone the Repository

```bash
git clone https://github.com/keerthi723/TechHub.git
cd TechHub
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
# Add the following variables:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/techhub
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000`

## 🧪 API Endpoints

### Authentication Routes

| Method | Endpoint             | Description       | Authentication |
| ------ | -------------------- | ----------------- | -------------- |
| POST   | `/api/auth/register` | Register new user | No             |
| POST   | `/api/auth/login`    | Login user        | No             |
| GET    | `/api/auth/user`     | Get current user  | Yes (JWT)      |

### Request & Response Examples

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## 🎨 Design System

### Color Palette

- **Primary Green:** `#036F3E`
- **White:** `#FFFFFF`
- **Light Green:** `#90EE90`
- **Dark Green:** `#025030`

### Typography

- **Headings:** Bold, modern sans-serif
- **Body Text:** Clean, readable font
- **Font Weights:** 400, 500, 600, 700, 800

### UI Components

- Glassmorphism effects on navbar
- Smooth hover animations
- Card-based layouts
- Responsive grid system

## 🧪 Testing

### Manual Testing Checklist

- [x] User can register with valid credentials
- [x] Duplicate email registration shows error
- [x] User can login with correct credentials
- [x] Wrong credentials show error message
- [x] JWT token is stored in localStorage
- [x] Protected routes redirect when not authenticated
- [x] User can access dashboard when logged in
- [x] Logout removes token and redirects to home
- [x] Navigation dropdown shows user options
- [x] Search bar displays suggestions
- [x] Responsive design works on mobile

### API Testing (Postman)

1. Import the collection
2. Test register endpoint
3. Test login endpoint
4. Test protected user endpoint with token
5. Verify error handling

## 📊 Database Schema

### User Model

```javascript
{
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false  // Never return password in queries
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set root directory to `client`
5. Deploy

### Backend Deployment (Render/Railway)

1. Create account on [Render](https://render.com)
2. Connect your GitHub repository
3. Set environment variables
4. Deploy the `server` directory

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/techhub
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

### Frontend

No environment variables needed. Proxy is configured in `package.json`:

```json
"proxy": "http://localhost:5000"
```

## 🔄 Workflow

```
User Opens App → Home Page
    ↓
Clicks Signup → Fill Form → Submit
    ↓
Password Hashed → Stored in MongoDB → JWT Created
    ↓
Token Stored in LocalStorage → Redirect to Dashboard
    ↓
User Browses Courses → Protected Route Checked
    ↓
Click Logout → Token Removed → Redirect to Home
```

## 📈 Future Enhancements

- [ ] Email verification for new users
- [ ] Password reset via email
- [ ] OAuth integration (Google, GitHub)
- [ ] Two-factor authentication (2FA)
- [ ] User profile editing
- [ ] Course progress tracking
- [ ] Admin dashboard for managing courses
- [ ] Real-time notifications
- [ ] Video course player
- [ ] Certificate generation

## 🐛 Known Issues

Currently, there are no known issues. If you find any bugs, please open an issue on GitHub.

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [JWT Introduction](https://jwt.io/introduction)
- [Bcrypt.js Documentation](https://github.com/dcodeIO/bcrypt.js)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Developer

**Keerthi**

- GitHub: [@keerthi723](https://github.com/keerthi723)
- Repository: [TechHub](https://github.com/keerthi723/TechHub)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Project developed as part of internship assignment
- Design inspired by modern educational platforms
- Color palette and IoT theme provided by TechKnots Academy
- Built with best practices in web security and user experience

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Contact: [keerthiga342@gmail.com]

---

**Made with ❤️ by Keerthi | November 2025**
