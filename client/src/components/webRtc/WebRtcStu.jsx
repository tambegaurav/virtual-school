import React, { useEffect, useState } from "react";
import Peer from "peerjs";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";
const socket = io("http://localhost:5000");

let videoGrid;
export const WebRtcStu = () => {
  const myPeer = new Peer(undefined, {
    host: "/",
    port: "3002",
  });
  const myVideo = document.createElement("video");
  myVideo.muted = true;
  const peers = {};
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      addVideoStream(myVideo, stream);

      myPeer.on("call", (call) => {
        call.answer(stream);
        const video = document.createElement("video");
        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream);
        });
      });

      socket.on("user-connected", (userId) => {
        // user is joining
        // setTimeout(() => {
        //   connectToNewUser(userId, stream);
        // }, 1000);
        connectToNewUser(userId, stream);
      });
    });

  socket.on("user-disconnected", (userId) => {
    setTimeout(() => {
      if (peers[userId]) peers[userId].close();
    }, 1000);
    // if (peers[userId]) peers[userId].close();
  });

  myPeer.on("open", (id) => {
    socket.emit("join-room", 123, id);
  });

  function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
    call.on("close", () => {
      video.remove();
    });
    console.log("trying to coonect");
    peers[userId] = call;
  }

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    videoGrid.append(video);
  }

  useEffect(() => {
    videoGrid = document.getElementById("videoGrid");
    console.log("videoGrid", videoGrid);
  }, []);

  return (
    <div id="videoGrid">
      <h1>Video Chat</h1>
    </div>
  );
};
