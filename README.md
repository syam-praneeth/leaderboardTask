# Leaderboard Application

A modern, dynamic leaderboard web app inspired by popular mobile designs. Features real-time rankings, responsive UI, interactive point claiming, and user claim history. Built with ReactJS, CSS, Node.js, Express, and MongoDB.

---

## 🚀 Features

- **User Selection:** Choose or add users to the leaderboard.
- **Claim Points:** Instantly award random points (1–10) to any user; results show in real-time.
- **Leaderboard:** Displays all users with point totals, auto-sorting by rank.
- **Claim History:** Every claim logged and viewable by user.
- **Responsive Design:** Mobile-first, adapts smoothly to all screens.
- **Elegant UI:** Gradient backgrounds, iconography, and layouts inspired by reference images.
- **Pagination:** Efficient listing for large datasets.

---

## 🛠️ Tech Stack

- **Frontend:** ReactJS, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose

---

## 📦 Folder Structure

backend/
- server.js
- models/
  - User.js
  - History.js
- routes/
  - userRoutes.js
  - claimRoutes.js
- controllers/
  - userController.js
  - claimController.js
- config/
  - db.js

frontend/
- src/
  - components/
    - Leaderboard.js
    - Podium.js
    - UserSelectDropdown.js
    - ClaimButton.js
    - ClaimHistory.js
  - services/
    - api.js
  - App.js
  - App.css

README.md

---

## 💡 UI Highlights

- **Tab Bar Navigation:** Eloquent horizontal tabs; active tab highlighted in gold.
- **Header:** Themed gradient backgrounds for each ranking type; trophy, badge, and timer objects at the top.
- **Podium:** Top 3 users displayed in larger cards with icons, gold, and silver accents.
- **Leaderboard Table:** Clean card rows with avatars, usernames, ranks, and points.
- **Footer:** Status and score bar at the bottom.
- **Rewards Button:** Floating, colorful button at top right corner.

---

## 📲 Screenshots

| Weekly Contribution Ranking | Wealth Ranking | Hourly Ranking |
| --- | --- | --- |
| ![Weekly Ranking](attached_image:1) | ![Wealth Ranking](attached_image:2) | ![Hourly Ranking](attached_image:3) |

---

## 📋 How To Run

1. **Clone the repo:**  
   `git clone https://github.com/syam-praneeth/leaderboardTask.git`
3. **Install dependencies:**  
   - Backend: `npm install`  
   - Frontend: `npm install`
4. **Start MongoDB locally or use a cloud URI.**
5. **Run backend:**  
   `node backend/server.js`
6. **Run frontend:**  
   `npm start` in `frontend/`
7. **Open app in your browser!**

---

## 🧑‍💻 Author

Made by Praneeth  
3rd-year CSE, VNRVJIET  
Skills: MERN Stack, DSA (C++), AI/ML Engineer

