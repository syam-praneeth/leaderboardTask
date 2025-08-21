import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ClaimHistory({ selectedUser }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!selectedUser) return;
    let mounted = true;
    api
      .get(`/history/${selectedUser}`)
      .then((res) => {
        if (mounted) setHistory(res.data.history || []);
      })
      .catch((err) => console.error(err));
    return () => (mounted = false);
  }, [selectedUser]);

  if (!selectedUser) return null;

  return (
    <div className="history">
      <h2>Claim History</h2>
      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h._id}>
              <td>{new Date(h.claimedAt).toLocaleString()}</td>
              <td>{h.pointsClaimed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
