/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import Student from "../../components/Student";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import OtherStudent from "../../components/OtherStudent";
import axios from "axios";
import LectureRoom from "../../components/LectureRoom";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";

let flag = true;

const StyledModal = styled(Modal)`
  /* background-color: #fff; */
  display: grid;
  place-items: center;

  & .modal-body {
    background-color: #e6e6e6;
    padding: 10px;
  }
`;

const LecturesBox = styled.div`
  position: absolute;

  right: 300px;
`;

const Wrapper = styled.div`
  background-color: #669766;
  height: 100vh;
  background-color: #11aa44;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='452' height='452' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%237F3' stroke-width='3' stroke-opacity='0.39'%3E%3Crect x='-40' y='40' width='75' height='75'/%3E%3Crect x='-35' y='45' width='65' height='65'/%3E%3Crect x='-30' y='50' width='55' height='55'/%3E%3Crect x='-25' y='55' width='45' height='45'/%3E%3Crect x='-20' y='60' width='35' height='35'/%3E%3Crect x='-15' y='65' width='25' height='25'/%3E%3Crect x='-10' y='70' width='15' height='15'/%3E%3Crect x='-5' y='75' width='5' height='5'/%3E%3Crect width='35' height='35'/%3E%3Crect x='5' y='5' width='25' height='25'/%3E%3Crect x='10' y='10' width='15' height='15'/%3E%3Crect x='15' y='15' width='5' height='5'/%3E%3Crect x='40' width='75' height='75'/%3E%3Crect x='45' y='5' width='65' height='65'/%3E%3Crect x='50' y='10' width='55' height='55'/%3E%3Crect x='55' y='15' width='45' height='45'/%3E%3Crect x='60' y='20' width='35' height='35'/%3E%3Crect x='65' y='25' width='25' height='25'/%3E%3Crect x='70' y='30' width='15' height='15'/%3E%3Crect x='75' y='35' width='5' height='5'/%3E%3Crect x='40' y='80' width='35' height='35'/%3E%3Crect x='45' y='85' width='25' height='25'/%3E%3Crect x='50' y='90' width='15' height='15'/%3E%3Crect x='55' y='95' width='5' height='5'/%3E%3Crect x='120' y='-40' width='75' height='75'/%3E%3Crect x='125' y='-35' width='65' height='65'/%3E%3Crect x='130' y='-30' width='55' height='55'/%3E%3Crect x='135' y='-25' width='45' height='45'/%3E%3Crect x='140' y='-20' width='35' height='35'/%3E%3Crect x='145' y='-15' width='25' height='25'/%3E%3Crect x='150' y='-10' width='15' height='15'/%3E%3Crect x='155' y='-5' width='5' height='5'/%3E%3Crect x='120' y='40' width='35' height='35'/%3E%3Crect x='125' y='45' width='25' height='25'/%3E%3Crect x='130' y='50' width='15' height='15'/%3E%3Crect x='135' y='55' width='5' height='5'/%3E%3Crect y='120' width='75' height='75'/%3E%3Crect x='5' y='125' width='65' height='65'/%3E%3Crect x='10' y='130' width='55' height='55'/%3E%3Crect x='15' y='135' width='45' height='45'/%3E%3Crect x='20' y='140' width='35' height='35'/%3E%3Crect x='25' y='145' width='25' height='25'/%3E%3Crect x='30' y='150' width='15' height='15'/%3E%3Crect x='35' y='155' width='5' height='5'/%3E%3Crect x='200' y='120' width='75' height='75'/%3E%3Crect x='40' y='200' width='75' height='75'/%3E%3Crect x='80' y='80' width='75' height='75'/%3E%3Crect x='85' y='85' width='65' height='65'/%3E%3Crect x='90' y='90' width='55' height='55'/%3E%3Crect x='95' y='95' width='45' height='45'/%3E%3Crect x='100' y='100' width='35' height='35'/%3E%3Crect x='105' y='105' width='25' height='25'/%3E%3Crect x='110' y='110' width='15' height='15'/%3E%3Crect x='115' y='115' width='5' height='5'/%3E%3Crect x='80' y='160' width='35' height='35'/%3E%3Crect x='85' y='165' width='25' height='25'/%3E%3Crect x='90' y='170' width='15' height='15'/%3E%3Crect x='95' y='175' width='5' height='5'/%3E%3Crect x='120' y='160' width='75' height='75'/%3E%3Crect x='125' y='165' width='65' height='65'/%3E%3Crect x='130' y='170' width='55' height='55'/%3E%3Crect x='135' y='175' width='45' height='45'/%3E%3Crect x='140' y='180' width='35' height='35'/%3E%3Crect x='145' y='185' width='25' height='25'/%3E%3Crect x='150' y='190' width='15' height='15'/%3E%3Crect x='155' y='195' width='5' height='5'/%3E%3Crect x='160' y='40' width='75' height='75'/%3E%3Crect x='165' y='45' width='65' height='65'/%3E%3Crect x='170' y='50' width='55' height='55'/%3E%3Crect x='175' y='55' width='45' height='45'/%3E%3Crect x='180' y='60' width='35' height='35'/%3E%3Crect x='185' y='65' width='25' height='25'/%3E%3Crect x='190' y='70' width='15' height='15'/%3E%3Crect x='195' y='75' width='5' height='5'/%3E%3Crect x='160' y='120' width='35' height='35'/%3E%3Crect x='165' y='125' width='25' height='25'/%3E%3Crect x='170' y='130' width='15' height='15'/%3E%3Crect x='175' y='135' width='5' height='5'/%3E%3Crect x='200' y='200' width='35' height='35'/%3E%3Crect x='200' width='35' height='35'/%3E%3Crect y='200' width='35' height='35'/%3E%3C/g%3E%3C/svg%3E");

  & > .title {
    font-size: 100px;
    color: #315231bc;
    padding-top: 300px;
    padding-left: 300px;
    position: absolute;
  }
`;

const HomePage = () => {
  const [x, setX] = useState("0px");
  const [y, setY] = useState("0px");
  const { innerWidth: width, innerHeight: height } = window;

  const [students, setStudents] = useState({});

  const [studentsArr, setStudentsArr] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [open, setOpen] = React.useState(false);

  const socket = io("ws://localhost:8000");

  // const url = "https://shielded-crag-90670.herokuapp.com/";
  // const socket = io(url);
  const loggedInUser = useSelector((state) => state.auth.user);

  const moveStudent = (e) => {
    let circle = document.querySelector(".circle");
    let moveBy = 10;

    switch (e.key) {
      case "ArrowLeft":
        circle.style.left = parseInt(circle.style.left) - moveBy + "px";
        setX(circle.style.left);
        break;
      case "ArrowRight":
        circle.style.left = parseInt(circle.style.left) + moveBy + "px";
        setX(circle.style.left);
        break;
      case "ArrowUp":
        circle.style.top = parseInt(circle.style.top) - moveBy + "px";
        setY(circle.style.top);
        break;
      case "ArrowDown":
        circle.style.top = parseInt(circle.style.top) + moveBy + "px";
        setY(circle.style.top);
        break;
    }
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const openOptions = (e) => {
    switch (e.key) {
      case "u":
        setOpen((prev) => !prev);
        break;

      case "e":
        // router.patch("/join/:id", updateLecture);
        axios
          .patch(
            "https://educationgt.herokuapp.com/lecture/join/" + lectures[0]._id,
            {
              student_id: loggedInUser.name,
            }
          )
          .then((res) => console.log(res));
        window.open(lectures[0].zoom_link, "_blank");
        break;
    }
  };

  useEffect(() => {
    console.log(x, y);
    let circle = document.querySelector(".circle");

    window.addEventListener("load", () => {
      circle.style.position = "absolute";
      circle.style.left = x;
      circle.style.top = y;
    });

    window.addEventListener("keydown", moveStudent);
    console.log(x, y);

    if (flag) {
      socket.emit("new coords", {
        x,
        y,
        username: loggedInUser.username,
        img: loggedInUser.img,
      });
      flag = false;
    }

    const timer = setTimeout(() => {
      flag = true;
    }, 50);

    return () => {
      window.removeEventListener("keydown", moveStudent);
      clearInterval(timer);
    };
  }, [x, y]);

  useEffect(() => {
    socket.on("newLocation", (data) => {
      console.log(data);
      // let name = data.username;

      // let stud = students.map((el) => {
      //   console.log(el);
      //   return el.username === data.username ? el : null;
      // });

      // console.log(stud);

      setStudents((prev) => ({ ...prev, [data.username]: data }));
    });
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      socket.emit("add user", loggedInUser.username);
    }
  }, [loggedInUser]);

  useEffect(() => {
    console.log(students);
    setStudentsArr(Object.values(students));
  }, [students]);

  useEffect(() => {
    axios.get("https://educationgt.herokuapp.com/lecture").then((res) => {
      console.log(res);
      setLectures(res.data.data);
    });
  }, []);

  useEffect(() => {
    console.log(width);
    console.log(+x.split("p")[0]);
    if (+x.split("p")[0] >= width - 350 - 300) {
      console.log("lecture");
      window.addEventListener("keydown", openOptions);
    }

    return () => {
      window.removeEventListener("keydown", openOptions);
    };
  }, [x, y]);

  return (
    <Wrapper>
      <h1 className="title">School Ground</h1>
      <Student
        classN={"circle"}
        name={loggedInUser.name}
        img={loggedInUser.img}
      />
      {/* {JSON.stringify(studentsArr)} */}
      {studentsArr?.map((el) => (
        <OtherStudent
          key={el.username}
          x={el.x}
          y={el.y}
          username={el.username}
          img={el.img}
        />
      ))}
      {/* {JSON.stringify(lectures)} */}
      <LecturesBox>
        {lectures.length > 0 &&
          lectures.map((lecture, idx) => (
            <LectureRoom key={lecture._id} lecture={lecture} />
          ))}
      </LecturesBox>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal-body">
          <h1>Press 'e' to enter the lecture</h1>
          <h4>Or Press 'u' to close the modal</h4>
        </div>
      </StyledModal>
    </Wrapper>
  );
};

export default HomePage;
