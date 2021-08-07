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
`;

const Student = (props) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Circle
        data-tip
        data-for={props.classN}
        className={props.classN}
        style={{
          backgroundImage: `url(${props.img})`,
          backgroundSize: "cover",
        }}
      ></Circle>
      <ReactTooltip id={props.classN} type="success" effect="float">
        <span>{props.name}</span>
      </ReactTooltip>
    </>
  );
};

export default Student;
