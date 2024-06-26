import React from "react";

function Difficulty({ difficultyRate }) {
  let difficultColors = ["#69b34c", "#acb334", "#fab733", "#ff4e11", "#ff0d0d"];
  let difficultNames = ["Çok Kolay", "Kolay", "Orta", "Zor", "Çok Zor"];

  return (
    <span
      className="btn text-bold pl-block-mode"
      style={{
        backgroundColor: difficultColors[difficultyRate - 1],
        color: "white",
        width: '7rem'
      }}
    >
      {difficultNames[difficultyRate - 1]}
    </span>
  );
}

export default Difficulty;
