import React, { useEffect, useState } from "react";
import api from "./services/api";
import UserSelectDropdown from "./components/UserSelectDropdown";
import ClaimButton from "./components/ClaimButton";
import Leaderboard from "./components/Leaderboard";
import ClaimHistory from "./components/ClaimHistory";

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [claimedPoints, setClaimedPoints] = useState(null);
  const [activeTab, setActiveTab] = useState("party");
  const [activeSubTab, setActiveSubTab] = useState("weekly");
  const [rewardsOpen, setRewardsOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setLeaderboard(res.data.leaderboard);
      if (!selectedUser && res.data.leaderboard.length) {
        setSelectedUser(res.data.leaderboard[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClaim = async () => {
    if (!selectedUser) return;
    try {
      const res = await api.post(`/claim/${selectedUser}`);
      setClaimedPoints(res.data.claimedPoints);
      setLeaderboard(res.data.leaderboard);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async (name) => {
    try {
      const res = await api.post("/users", { name });
      setLeaderboard(res.data.leaderboard);
      setSelectedUser(res.data.user._id);
    } catch (err) {
      console.error(err);
    }
  };

  const top3 = leaderboard.slice(0, 3);

  return (
    <div
      className={`app app-container ${
        activeSubTab === "wealth"
          ? "theme-wealth"
          : activeSubTab === "hourly"
          ? "theme-hourly"
          : "theme-weekly"
      }`}
    >
      <div
        className="rewards-btn"
        title="Rewards"
        onClick={() => setRewardsOpen((s) => !s)}
        role="button"
        aria-label="Rewards"
      >
        🎁
      </div>

      {rewardsOpen && (
        <div className="rewards-panel" onClick={(e) => e.stopPropagation()}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Rewards</div>
          <div style={{ fontSize: 14, color: "#333" }}>
            No rewards available yet.
          </div>
          <button
            style={{ marginTop: 10 }}
            onClick={() => setRewardsOpen(false)}
          >
            Close
          </button>
        </div>
      )}

      <nav className="tabs-bar" role="navigation">
        <div
          className={activeTab === "party" ? "tab-active" : "tab-inactive"}
          onClick={() => setActiveTab("party")}
        >
          Party Ranking
        </div>
        <div
          className={activeTab === "live" ? "tab-active" : "tab-inactive"}
          onClick={() => setActiveTab("live")}
        >
          Live Ranking
        </div>
        <div
          className={activeTab === "hourly" ? "tab-active" : "tab-inactive"}
          onClick={() => setActiveTab("hourly")}
        >
          Hourly Ranking
        </div>
        <div style={{ marginLeft: "auto", color: "#666" }}>?</div>
      </nav>

      <div
        className="sub-tabs"
        style={{ display: "flex", gap: 12, marginBottom: 18 }}
      >
        <div
          className={activeSubTab === "weekly" ? "tab-active" : "tab-inactive"}
          onClick={() => setActiveSubTab("weekly")}
        >
          Weekly Contribution Ranking
        </div>
        <div
          className={activeSubTab === "wealth" ? "tab-active" : "tab-inactive"}
          onClick={() => setActiveSubTab("wealth")}
        >
          Wealth Ranking
        </div>
        <div
          className={activeSubTab === "hourly" ? "tab-active" : "tab-inactive"}
          onClick={() => setActiveSubTab("hourly")}
        >
          Hourly Contribution
        </div>
      </div>

      <header className="header-main">
        <div className="header-trophy-icon">🏆</div>
        <div className="header-title">
          {activeSubTab === "wealth"
            ? "Wealth Ranking"
            : activeSubTab === "hourly"
            ? "Hourly Ranking"
            : "Weekly Contribution"}
        </div>
        <div className="settlement-time">Settlement time: 2 days</div>
      </header>

      {/* Podium */}
      <section className="podium-container">
        {top3.map((u, idx) => {
          const pos = idx === 0 ? "middle" : "side";
          return (
            <div
              className={`podium-card ${idx === 0 ? "middle" : ""}`}
              key={u._id}
            >
              {idx === 0 && <div className="podium-trophy">👑</div>}
              <div className="podium-avatar" />
              <div style={{ fontWeight: 700, marginTop: 8 }}>{u.name}</div>
              <div className="podium-points">
                {u.totalPoints} <span style={{ marginLeft: 6 }}>🏆</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Controls */}
      <div className="controls">
        <UserSelectDropdown
          users={leaderboard}
          selectedUser={selectedUser}
          onSelect={setSelectedUser}
          onAddUser={handleAddUser}
        />
        <ClaimButton onClaim={handleClaim} />
        {claimedPoints !== null && (
          <div className="claimed">You claimed: {claimedPoints} points</div>
        )}
      </div>

      <div className="leaderboard-table">
        <Leaderboard users={leaderboard} />
      </div>

      <ClaimHistory selectedUser={selectedUser} />

      <footer className="footer-bar">
        <div className="footer-user">
          <div className="footer-status-icon">🔊</div>
          <div style={{ fontWeight: 700 }}>Devil</div>
        </div>
        <div className="footer-points">1200</div>
      </footer>
    </div>
  );
}

export default App;
