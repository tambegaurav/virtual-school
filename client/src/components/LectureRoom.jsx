import React from "react";
import styled from "styled-components";

const LectureBox = styled.div`
  width: 300px;
  height: 100px;
  background-color: #684211;
  border-radius: 30px;
  padding: 20px;
  color: white;
  border: 3px solid green;
  display: grid;
  place-items: center;
  background-color: #ee5522;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23ca481d' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E");
  box-shadow: 5px 5px 10px #161616;
`;

const LectureRoom = ({ lecture }) => {
  const { start_time, end_time, zoom_link, name } = lecture;
  return (
    <LectureBox>
      <h3>
        {start_time} to {end_time}
      </h3>

      <h1>{name}</h1>
    </LectureBox>
  );
};

export default LectureRoom;
