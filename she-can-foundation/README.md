# ✦ She Can Foundation

> **Empowering youth through education, opportunities, and digital initiatives.**

A modern full-stack NGO website built with React, Node.js, Express, and MongoDB. Features a stunning glassmorphism UI, dark/light mode, animated sections, and a fully functional contact/volunteer form with email notifications.

---

## ✨ Features

### Frontend
- **Modern Hero Section** — Gradient shapes, badge, stats counter, and inspiring tagline
- **Glassmorphism UI** — Frosted glass cards with backdrop blur effects
- **Dark / Light Mode** — Persistent theme toggle with smooth transitions
- **Animated Scroll Reveal** — Sections fade and slide in as you scroll (AOS library)
- **Responsive Design** — Fully mobile-optimized with hamburger menu
- **Loading Animation** — Branded intro animation on page load
- **Admin Dashboard** — View all volunteer submissions in a clean card layout
- **Form Validation** — Client-side validation with visual error indicators
- **Success Popup** — Animated confirmation after form submission

### Backend
- **REST API** — Express.js routes for contact form and submissions
- **MongoDB Storage** — All form data persisted in MongoDB Atlas
- **Email Notifications** — Admin receives an email for every new submission (Nodemailer)
- **Input Validation** — Server-side validation using express-validator
- **CORS Enabled** — Secure cross-origin requests

---

## 🖼️ Screenshots

| Section | Preview |
|---------|---------|
| **Landing Hero** | Purple-pink gradient hero with floating shapes |
| **About Section** | Glassmorphism cards with mission details |
| **Our Causes** | Gradient-coded cause cards with impact stats |
| **Contact Form** | Styled form with real-time validation |
| **Admin Dashboard** | Submission list with avatars and metadata |
| **Dark Mode** | Full dark theme across all sections |

> *Add actual screenshots to a `screenshots/` folder and link them here.*

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router v6, AOS, Font Awesome |
| **Backend** | Node.js, Express.js, Mongoose, Nodemailer |
| **Database** | MongoDB Atlas |
| **Deployment** | Vercel (frontend), Render (backend) |

### Color Palette

```
Primary:   #8B5CF6 (Purple)
Secondary: #EC4899 (Pink)
Accent:    #F472B6 (Light Pink)
Gradient:  135° Purple → Pink
```

---

## 📁 Folder Structure

```
she-can-foundation/
├── frontend/                  # React + Vite
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Sticky nav with theme toggle
│   │   │   ├── Hero.jsx        # Landing hero section
│   │   │   ├── About.jsx       # Mission + 4 feature cards
│   │   │   ├── Causes.jsx      # 4 cause cards with gradients
│   │   │   ├── Contact.jsx     # Form with validation + submit
│   │   │   ├── Footer.jsx      # Links, newsletter, socials
│   │   │   ├── Admin.jsx       # Dashboard to view submissions
│   │   │   └── Loading.jsx     # Initial loading screen
│   │   ├── App.jsx
│   │   ├── App.css             # All styles (glassmorphism, etc.)
│   │   ├── index.css           # CSS variables, reset, base
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
├── backend/                    # Node.js + Express
│   ├── models/
│   │   └── Contact.js          # Mongoose schema
│   ├── routes/
│   │   └── contact.js          # POST /api/contact, GET /api/submissions
│   ├── server.js               # Express app entry
│   ├── .env                    # Environment variables
│   └── package.json
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/she-can-foundation.git
cd she-can-foundation
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/she-can-foundation?retryWrites=true&w=majority
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@shecanfoundation.org
```

Start the backend:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### 4. Connect Frontend to Backend

In `frontend/src/components/Contact.jsx` and `Admin.jsx`, update the API URL:

```js
// Replace the deployed URL with local for development:
fetch('http://localhost:5000/api/contact', ...)
fetch('http://localhost:5000/api/submissions')
```

---

## ☁️ Deployment

### Frontend — Vercel

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) and click **Add New → Project**
3. Import your repository
4. Set the **Root Directory** to `frontend`
5. **Framework Preset** → `Vite`
6. Click **Deploy**

Your frontend will be live at `https://she-can-foundation.vercel.app`.

### Backend — Render

1. Go to [render.com](https://render.com) and click **New + → Web Service**
2. Connect your GitHub repository
3. Set the **Root Directory** to `backend`
4. **Start Command**: `node server.js`
5. Add environment variables (from your `.env` file)
6. Click **Create Web Service**

Your backend will be live at `https://she-can-foundation-api.onrender.com`.

### Database — MongoDB Atlas

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Click **Connect → Connect your application**
4. Copy the connection string
5. Replace `<username>` and `<password>` with your database user credentials
6. Use this string in your backend `.env` `MONGODB_URI`

> ⚠️ In the Atlas dashboard, go to **Network Access** and add `0.0.0.0/0` to allow connections from Render.

### Update API URLs in Production

In `Contact.jsx` and `Admin.jsx`, update the `fetch` URLs to point to your deployed Render backend:

```js
fetch('https://she-can-foundation-api.onrender.com/api/contact', ...)
```

---

## 📬 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submit a volunteer/contact form |
| `GET`  | `/api/submissions` | Fetch all submissions (admin) |

### POST /api/contact

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 98765 43210",
  "message": "I want to volunteer!"
}
```

**Response:** `201 { "message": "Thank you! We will get back to you soon." }`

---

## 📄 License

This project is for educational and portfolio purposes. Feel free to use and adapt it.

---

<p align="center">
  Made with ❤️ for a better tomorrow.
</p>
