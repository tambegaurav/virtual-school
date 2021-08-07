/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useEffect, useRef, useState } from "react";
import Student from "../../components/Student";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
let flag = true;

const HomePage = () => {
  const [x, setX] = useState("0px");
  const [y, setY] = useState("0px");
  const [x2, setX2] = useState("0px");
  const [y2, setY2] = useState("100px");
  const [temp, setTemp] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState([]);
  const [students, setStudents] = useState({});

  // const socket = io("ws://localhost:8000");

  const loggedInUser = useSelector((state) => state.auth.user);

  const moveStudent = (e) => {
    let circle = document.querySelector(".circle");
    let rect = document.querySelector(".rect");
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

    switch (e.key) {
      case "a":
        rect.style.left = parseInt(rect.style.left) - moveBy + "px";
        setX2(rect.style.left);
        break;
      case "d":
        rect.style.left = parseInt(rect.style.left) + moveBy + "px";
        setX2(rect.style.left);
        break;
      case "w":
        rect.style.top = parseInt(rect.style.top) - moveBy + "px";
        setY2(rect.style.top);
        break;
      case "s":
        rect.style.top = parseInt(rect.style.top) + moveBy + "px";
        setY2(rect.style.top);
        break;
    }
  };

  const moveStudent2 = (e) => {
    let rect = document.querySelector(".rect");
    let moveBy = 10;

    switch (e.key) {
      case "a":
        rect.style.left = parseInt(rect.style.left) - moveBy + "px";
        setX2(rect.style.left);
        break;
      case "d":
        rect.style.left = parseInt(rect.style.left) + moveBy + "px";
        setX2(rect.style.left);
        break;
      case "w":
        rect.style.top = parseInt(rect.style.top) - moveBy + "px";
        setY2(rect.style.top);
        break;
      case "s":
        rect.style.top = parseInt(rect.style.top) + moveBy + "px";
        setY2(rect.style.top);
        break;
    }
  };

  useEffect(() => {
    console.log(x, y);
    let circle = document.querySelector(".circle");
    let rect = document.querySelector(".rect");

    window.addEventListener("load", () => {
      circle.style.position = "absolute";
      circle.style.left = x;
      circle.style.top = y;
      rect.style.position = "absolute";
      rect.style.left = x2;
      rect.style.top = y2;
    });

    window.addEventListener("keydown", moveStudent);
    console.log(x, y);
    console.log(x2, y2);

    // socket.emit("new coords", { x, y, username: loggedInUser.username });
    // socket.on("new coords", (data) => {
    //   // we tell the client to execute 'new message'
    //   console.log(data);
    //   let name = data.studentName;
    //   setStudents({ ...students, [name]: data });
    // });
    // socket.off("new coords", (data) => {
    //   console.log("Callback", data);
    // });

    return () => {
      window.removeEventListener("keydown", moveStudent);
    };
  }, [x, y, x2, y2]);

  // useEffect(() => {
  //   if (loggedInUser) {
  //     socket.emit("add user", loggedInUser.username);
  //   }
  // }, [loggedInUser]);

  const openOptions = () => {};

  useEffect(() => {
    let X = +x.split("p")[0];
    let Y = +y.split("p")[0];
    let X2 = +x2.split("p")[0];
    let Y2 = +y2.split("p")[0];
    let YDist = Y2 - Y;
    let XDist = X2 - X;

    let dist = Math.sqrt(XDist ** 2 + YDist ** 2);
    console.log("dist", dist);

    if (dist <= 100) {
      window.addEventListener("keydown", openOptions);
    } else {
      window.removeEventListener("keydown", openOptions);
    }
  }, [x, y, x2, y2]);

  useEffect(() => {
    console.log(students);
  }, [students]);

  return (
    <div>
      <h1>Homepage</h1>
      <Student
        classN={"circle"}
        name={"Vedansh Wani"}
        img={"https://avatars.githubusercontent.com/u/23113177?v=4"}
      />
      <Student
        classN={"rect"}
        name={"Gaurav Tambe"}
        img={
          "https://media-exp1.licdn.com/dms/image/C4D03AQGzQ5Ubii-fnQ/profile-displayphoto-shrink_400_400/0/1620941765897?e=1633564800&v=beta&t=Yc_yefD6el1eMR-JmATT49KjWzHQmuT3YZxO_9s6ce0"
        }
      />
    </div>
  );
};

export default HomePage;
