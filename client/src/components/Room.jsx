import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Canvas from "./Canvas";

const Room = ({ userNo, socket, setUsers, setUserNo }) => {
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (data) => {
      toast.info(data.message);
    });

    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });

    return () => {
      socket.off("message");
      socket.off("users");
    };
  }, [socket, setUsers, setUserNo]);

  const clearCanvas = () => {
    setElements([]);
    setHistory([]);
    socket.emit("drawing", null);
  };

  const undo = () => {
    if (elements.length === 0) return;
    const lastElement = elements[elements.length - 1];
    setHistory((prevHistory) => [...prevHistory, lastElement]);
    setElements((prevElements) => prevElements.slice(0, -1));
  };

  const redo = () => {
    if (history.length === 0) return;
    const lastHistory = history[history.length - 1];
    setElements((prevElements) => [...prevElements, lastHistory]);
    setHistory((prevHistory) => prevHistory.slice(0, -1));
  };

  const handleToolChange = (newTool) => {
    setTool(newTool);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="container-fluid p-3" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="row mb-4">
        <h1 className="display-5 text-center text-dark fw-bold">
          🎨 Collaborative Drawing - Users: <span className="text-primary">{userNo}</span>
        </h1>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-auto">
          <div className="btn-group" role="group">
            <button
              className={`btn ${tool === "pencil" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => handleToolChange("pencil")}
            >
              ✏️ Pencil
            </button>
            <button
              className={`btn ${tool === "line" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => handleToolChange("line")}
            >
              📏 Line
            </button>
            <button
              className={`btn ${tool === "rect" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => handleToolChange("rect")}
            >
              ⬜ Rectangle
            </button>
            <button
              className={`btn ${tool === "circle" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => handleToolChange("circle")}
            >
              ⭕ Circle
            </button>
            <button
              className={`btn ${tool === "text" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => handleToolChange("text")}
            >
              📝 Text
            </button>
            <button
              className={`btn ${tool === "eraser" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => handleToolChange("eraser")}
            >
              🧹 Eraser
            </button>
          </div>
        </div>

        <div className="col-auto">
          <div className="input-group">
            <label className="input-group-text" htmlFor="colorPicker">
              🎨 Color
            </label>
            <input
              type="color"
              className="form-control form-control-color"
              id="colorPicker"
              value={color}
              onChange={handleColorChange}
              title="Choose drawing color"
            />
          </div>
        </div>

        <div className="col-auto">
          <div className="btn-group" role="group">
            <button
              className="btn btn-secondary"
              onClick={undo}
              disabled={elements.length === 0}
            >
              ↩️ Undo
            </button>
            <button
              className="btn btn-secondary"
              onClick={redo}
              disabled={history.length === 0}
            >
              ↪️ Redo
            </button>
            <button
              className="btn btn-danger"
              onClick={clearCanvas}
              disabled={elements.length === 0}
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      </div>

      <Canvas
        color={color}
        setElements={setElements}
        elements={elements}
        tool={tool}
        socket={socket}
      />
    </div>
  );
};

export default Room;