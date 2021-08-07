/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useEffect, useRef, useState } from "react";
import Student from "../../components/Student";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [x, setX] = useState("0px");
  const [y, setY] = useState("0px");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState([]);
  const [students, setStudents] = useState({});

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

    return () => window.removeEventListener("keyup", moveStudent);
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      socket.emit("add user", loggedInUser.username);
    }
  }, [loggedInUser]);

  useEffect(() => {
    console.log(x, y);

    socket.emit("new coords", { x, y, username: loggedInUser.username });
    socket.on("new coords", (data) => {
      // we tell the client to execute 'new message'
      console.log(data);
      let name = data.studentName;
      setStudents({ ...students, [name]: data });
    });
  }, [x, y]);

  useEffect(() => {
    console.log(students);
  }, [students]);

  return (
    <div>
      <h1>Homepage</h1>
      <Student />
    </div>
  );
};

export default HomePage;
