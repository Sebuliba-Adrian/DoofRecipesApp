import React from "react";
import "../static/style/date-display.css";

export default function DateDisplay({ date }) {
  return (
    <div className="text-center date-display">
      <div className="date-display-month text-white bg-cool-blue">
        {date.substring(7, 11)}
      </div>
      <div className="date-display-day">
        <h4>{date.substring(4, 7)}</h4>
      </div>
      <div className="date-display-year">{date.substring(11, 16)}</div>
    </div>
  );
}
