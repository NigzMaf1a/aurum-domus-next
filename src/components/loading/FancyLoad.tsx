import React from "react";

export default function SpinnerCard(): JSX.Element {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center border rounded shadow bg-light"
      style={{ width: "250px", height: "300px" }}
    >
      {/* Spinning Circle */}
      <div
        className="spinner-border text-primary mb-3"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>

      {/* Optional text for a fancy vibe */}
      <p className="text-primary fw-semibold mb-0">Please wait...</p>
    </div>
  );
}
