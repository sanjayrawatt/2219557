# Frontend Test Submission

This is a React-based URL Shortener application built as part of the Affordmed Frontend Evaluation. The app allows users to shorten URLs, optionally define custom shortcodes and expiry durations, and view statistics about the shortened links.

---

## 📌 Features

- 🔗 Shorten up to 5 URLs
- ⏳ Optional validity (in minutes) with default fallback of 30
- ✍️ Optional custom shortcode
- ✅ Client-side validation for URL format, validity, and shortcode
- 📈 View statistics:
  - Creation & expiry times
  - Total clicks
  - Click history with timestamp, source, and location
- 🔄 Redirection using React Router based on short code
- 💡 Built entirely with Material UI for a clean, responsive design

---

## 🧠 Tech Stack

- React with TypeScript
- Material UI
- React Router DOM (v6+)
- Axios
- @mui/x-data-grid for statistics table
- Hosted on `http://localhost:3000` (local only)

---

## 📁 Folder Structure

