import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";

const Circle = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: green;
`;

const Student = (props) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Circle data-tip data-for="student" className="circle"></Circle>
      <ReactTooltip id="student" type="success" effect="float">
        <span>{user.name}</span>
      </ReactTooltip>
    </>
  );
};

export default Student;
