require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const claimRoutes = require("./routes/claimRoutes");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", claimRoutes);

const PORT = process.env.PORT || 5000;

async function seedDefaultUsers() {
  try {
    const count = await User.countDocuments();
    if (count >= 10) return;
    const users = [];
    for (let i = 1; i <= 10; i++) {
      users.push({ name: `User ${i}` });
    }
    await User.insertMany(users);
    console.log("Seeded default users");
  } catch (err) {
    console.error("Seeding error", err);
  }
}

connectDB()
  .then(() => seedDefaultUsers())
  .catch((err) => console.error("DB connection failed", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
