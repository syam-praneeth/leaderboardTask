import React, { useEffect, useState } from "react";
import "./App.css";
import api from "./services/api";
import UserSelectDropdown from "./components/UserSelectDropdown";
import ClaimButton from "./components/ClaimButton";
import Leaderboard from "./components/Leaderboard";
import ClaimHistory from "./components/ClaimHistory";
import { FaGift, FaCrown, FaTrophy, FaUserCircle } from "react-icons/fa";

export default function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [claimedPoints, setClaimedPoints] = useState(null);
  const [activeTab, setActiveTab] = useState("weekly");
  const [rewardsOpen, setRewardsOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/users");
        setLeaderboard(res.data.leaderboard || []);
        if (res.data.leaderboard && res.data.leaderboard.length > 0)
          setSelectedUser(res.data.leaderboard[0]._id);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const handleClaim = async () => {
    if (!selectedUser) return;
    try {
      const res = await api.post(`/claim/${selectedUser}`);
      setClaimedPoints(res.data.claimedPoints);
      setLeaderboard(res.data.leaderboard || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async (name) => {
    if (!name) return;
    try {
      const res = await api.post("/users", { name });
      setLeaderboard(res.data.leaderboard || []);
      setSelectedUser(res.data.user._id);
    } catch (err) {
      console.error(err);
    }
  };

  const top3 = leaderboard.slice(0, 3);

  return (
    <div className="app">
      <div className="tabs-bar">
        <div
          className={activeTab === "weekly" ? "tab-active" : ""}
          onClick={() => setActiveTab("weekly")}
        >
          Weekly
        </div>
        <div
          className={activeTab === "wealth" ? "tab-active" : ""}
          onClick={() => setActiveTab("wealth")}
        >
          Total Wealth
        </div>
        <div
          className={activeTab === "hourly" ? "tab-active" : ""}
          onClick={() => setActiveTab("hourly")}
        >
          Hourly
        </div>
      </div>

      <div className="header-main">
        <div className="header-left">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <FaTrophy size={28} color="#2563eb" />
            <div>
              <div className="header-title">Leaderboard</div>
              <div className="settlement-time">Next settlement: 02:00 UTC</div>
            </div>
          </div>
        </div>

        <div>
          <button
            className="rewards-btn"
            onClick={() => setRewardsOpen(!rewardsOpen)}
            title="Rewards"
          >
            <FaGift />
          </button>
          {rewardsOpen && <div className="rewards-panel">Rewards content</div>}
        </div>
      </div>

      <div className="podium-container">
        {top3.map((u, idx) => (
          <div
            key={u._id}
            className={`podium-card ${idx === 1 ? "winner" : ""}`}
          >
            <div className="podium-avatar">
              <FaUserCircle size={64} color="#94a3b8" />
            </div>
            <div className="podium-name">{u.name}</div>
            <div className="podium-points">
              {u.totalPoints} pts {idx === 0 && <FaCrown color="#f59e0b" />}
            </div>
          </div>
        ))}
      </div>

      <div className="grid">
        <div>
          <div className="leaderboard-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Leaderboard</h3>
              <div className="controls">
                <UserSelectDropdown
                  users={leaderboard}
                  selectedUser={selectedUser}
                  onSelect={setSelectedUser}
                  onAddUser={handleAddUser}
                />
                <ClaimButton onClaim={handleClaim} />
              </div>
            </div>

            <Leaderboard users={leaderboard} />
          </div>
          <div className="footer-bar">
            Leaderboard updates after each claim.
          </div>
        </div>

        <div>
          <div className="panel">
            <h4>Claim History</h4>
            <ClaimHistory userId={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
