const User = require("../models/User");
const History = require("../models/History");

async function getLeaderboard() {
  const users = await User.find().sort({ totalPoints: -1, name: 1 }).lean();
  return users.map((u, idx) => ({
    _id: u._id,
    name: u.name,
    totalPoints: u.totalPoints,
    rank: idx + 1,
  }));
}

exports.getUsers = async (req, res) => {
  try {
    const leaderboard = await getLeaderboard();
    res.json({ leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const user = await User.create({ name });
    const leaderboard = await getLeaderboard();
    res.status(201).json({ user, leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getHistoryForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const history = await History.find({ userId })
      .sort({ claimedAt: -1 })
      .lean();
    res.json({ history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports._getLeaderboard = getLeaderboard; // exported for internal reuse
