import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Canvas from "./Canvas";

const Room = ({ userNo, socket, setUsers, setUserNo }) => {
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");

  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message);
    });
  }, []);

  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const undo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.filter((ele, index) => index !== elements.length - 1)
    );
  };

  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) =>
      prevHistory.filter((ele, index) => index !== history.length - 1)
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className="display-5 pt-4 pb-3 text-center">
          🎨 Online Users: <span className="text-primary">{userNo}</span>
        </h1>
      </div>
      <div className="row justify-content-center align-items-center text-center py-2">
        <div className="col-md-2">
          <div className="color-picker d-flex align-items-center justify-content-center">
            <span className="me-2">🎨</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                width: "40px",
                height: "40px",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="btn-group" role="group" aria-label="Tool Selection">
            <button
              className={`btn ${
                tool === "pencil" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setTool("pencil")}
            >
              ✏️ Pencil
            </button>
            <button
              className={`btn ${
                tool === "line" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setTool("line")}
            >
              📏 Line
            </button>
            <button
              className={`btn ${
                tool === "rect" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setTool("rect")}
            >
              ⬛ Rectangle
            </button>
          </div>
        </div>

        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            disabled={elements.length === 0}
            onClick={undo}
          >
            ↩️ Undo
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={history.length < 1}
            onClick={redo}
          >
            ↪️ Redo
          </button>
        </div>
        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-danger"
            onClick={clearCanvas}
          >
            � Clear Canvas
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <Canvas
          canvasRef={canvasRef}
          ctx={ctx}
          color={color}
          setElements={setElements}
          elements={elements}
          tool={tool}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default Room;