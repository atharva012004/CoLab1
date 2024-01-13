import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Canvas from "./Canvas";

const Room = ({ userNo, socket, setUsers, setUserNo }) => {
  // These useRef hooks are used to store references to the canvas DOM element and its context.
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  // These useState hooks are used to manage the state of the color, elements, history, and tool.
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");

  useEffect(() => {
    // This useEffect hook sets up a listener for the "message" event on the socket.
    // When a "message" event is received, it displays a toast notification with the message data.
    socket.on("message", (data) => {
      toast.info(data.message);
    });
  }, []);

  useEffect(() => {
    // This useEffect hook sets up a listener for the "users" event on the socket.
    // When a "users" event is received, it updates the users and userNo state variables with the new data.
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []);

  const clearCanvas = () => {
    // This function clears the canvas and resets the elements state variable.
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const undo = () => {
    // This function removes the last element from the elements array and adds it to the history array.
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.filter((ele, index) => index !== elements.length - 1)
    );
  };

  const redo = () => {
    // This function removes the last element from the history array and adds it to the elements array.
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) =>
      prevHistory.filter((ele, index) => index !== history.length - 1)
    );
  };

  return (
    <div
      className="col-md-8 overflow-hidden border border-dark px-0 mx-auto mt-3"
      style={{ height: "500px" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
