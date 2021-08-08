import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";

const Circle = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  /* background-color: green; */
  border: 2px solid green;
  position: absolute;
`;

const OtherStudent = (props) => {
  const { x, y, username, img } = props;

  return (
    <>
      <Circle
        data-tip
        data-for={username}
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          left: x,
          top: y,
        }}
      ></Circle>
      <ReactTooltip id={username} type="success" effect="float">
        <span>{username}</span>
      </ReactTooltip>
    </>
  );
};

export default OtherStudent;
