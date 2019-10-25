import React from "react";
import "./spinner.css";

// Spinner is just a basic styling component to indicate that the search was
// submitted and and is being actioned.

const spinner = () => (
  <div>
    <h1>Loading</h1>
    <div className="lds-spinner">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default spinner;
