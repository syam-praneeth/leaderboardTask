import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ClaimHistory({ userId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!userId) return;
    let mounted = true;
    api
      .get(`/history/${userId}`)
      .then((res) => {
        if (mounted) setHistory(res.data.history || []);
      })
      .catch((err) => console.error(err));
    return () => (mounted = false);
  }, [userId]);

  if (!userId) return <div>Select a user to view history</div>;

  return (
    <div className="history">
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Recent Claims</div>
      <div>
        {history.length === 0 ? (
          <div style={{ color: "#666" }}>No claims yet</div>
        ) : (
          <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
            {history.map((h) => (
              <li
                key={h._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 8,
                  borderBottom: "1px solid #f1f3f5",
                }}
              >
                <div style={{ color: "#333" }}>
                  {new Date(h.claimedAt).toLocaleString()}
                </div>
                <div style={{ fontWeight: 700, color: "#f59e0b" }}>
                  +{h.pointsClaimed}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
