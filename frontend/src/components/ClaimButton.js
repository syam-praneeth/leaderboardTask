import React from "react";

export default function ClaimButton({ onClaim }) {
  return (
    <button className="claim-button" onClick={onClaim}>
      Claim
    </button>
  );
}
