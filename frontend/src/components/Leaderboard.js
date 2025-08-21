import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Leaderboard({ users = [] }) {
  return (
    <div className="leaderboard-list">
      {users.map((u) => (
        <div className="leader-item" key={u._id}>
          <div className="rank">{u.rank}</div>
          <div className="user">
            <FaUserCircle className="avatar-sm" />
            <div className="name">{u.name}</div>
          </div>
          <div className="points">{u.totalPoints}</div>
        </div>
      ))}
    </div>
  );
}
