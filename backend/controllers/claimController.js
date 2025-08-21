const User = require("../models/User");
const History = require("../models/History");
const userController = require("./userController");

function randomPoints() {
  return Math.floor(Math.random() * 10) + 1;
}

exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.params;
    const points = randomPoints();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.totalPoints = (user.totalPoints || 0) + points;
    await user.save();

    await History.create({ userId: user._id, pointsClaimed: points });

    const leaderboard = await userController._getLeaderboard();

    res.json({ claimedPoints: points, leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
