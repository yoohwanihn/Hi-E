import React from "react";
import { useState } from "react";
import styled from "styled-components";
export default function NavLi(props) {
  const [hovered, setHovered] = useState(false);
  const handleMouseOver = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const borderLeft = hovered ? "6px solid #4674FE" : "6px solid white";
  const fontWeight = hovered ? "600" : "400";

  const handleClick = () => {
    props.onClick()
    props.onNavigate();
  };
  return (
    <Navli
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={{ borderLeft,fontWeight,
        ...(props.isActive && {
          borderLeft:"6px solid #4674FE",
          fontWeight:600
        }),
      }}
    >
      <a>{props.title}</a>
      {props.img && (
        <img
          src={props.img}
          style={{ width: 16, height: 16,  float:'right', marginTop:16, marginRight:28}}
        />
      )}
    </Navli>
  );
}
const Navli = styled.li`
  padding-left: 34px;
  height: 48px;
  line-heigth: 48px;
  display: block;
  justify-content: space-between;
  margin-bottom: 10px;
  width: calc(100% - 6px - 34px);
  border-left: 6px solid white;
  cursor: pointer;
`;
