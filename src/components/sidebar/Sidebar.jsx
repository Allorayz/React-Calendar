import React from "react";

import { correctNumber } from "../../gateway/correctNumber";
import { generateArray } from "../../gateway/generateArray";

import "./sidebar.scss";

const Sidebar = () => {
  const hours = generateArray(24);

  return (
    <div className="calendar__time-scale">
      {hours.map((hour) => (
        <div key={hour} className="time-slot">
          <span className="time-slot__time">{`${correctNumber(hour)}:00`}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
