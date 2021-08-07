/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import Student from "../../components/Student";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import OtherStudent from "../../components/OtherStudent";
let flag = true;

const HomePage = () => {
  const [x, setX] = useState("0px");
  const [y, setY] = useState("0px");

  const [students, setStudents] = useState({});

  const [studentsArr, setStudentsArr] = useState([]);

  const socket = io("ws://localhost:8000");
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
      socket.emit("new coords", { x, y, username: loggedInUser.username });
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

  return (
    <div>
      <h1>Homepage</h1>
      <Student
        classN={"circle"}
        name={loggedInUser.name}
        img={"https://avatars.githubusercontent.com/u/23113177?v=4"}
      />
      {JSON.stringify(studentsArr)}
      {studentsArr?.map((el) => (
        <OtherStudent x={el.x} y={el.y} username={el.username} />
      ))}
    </div>
  );
};

export default HomePage;
