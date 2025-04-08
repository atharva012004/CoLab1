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
  }, [socket]);

  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, [setUsers, setUserNo]);

  const clearCanvas = () => {
    setElements([]);
  };

  const undo = () => {
    if (elements.length === 0) return;
    setHistory((prevHistory) => [...prevHistory, elements[elements.length - 1]]);
    setElements((prevElements) =>
      prevElements.filter((ele, index) => index !== elements.length - 1)
    );
  };

  const redo = () => {
    if (history.length === 0) return;
    setElements((prevElements) => [...prevElements, history[history.length - 1]]);
    setHistory((prevHistory) =>
      prevHistory.filter((ele, index) => index !== history.length - 1)
    );
  };

  return (
    <div className="container-fluid p-3" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="row mb-4">
        <h1 className="display-5 text-center text-dark fw-bold">
          🎨 Collaborative Drawing - Users: <span className="text-primary">{userNo}</span>
        </h1>
      </div>

      <div className="row justify-content-center align-items-center text-center g-3">
        <div className="col-md-2 col-4">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <span className="fs-4">🎨</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-picker-input"
              style={{
                width: "50px",
                height: "50px",
                border: "2px solid #dee2e6",
                borderRadius: "50%",
                cursor: "pointer",
                padding: "0",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className="btn-group btn-group-lg flex-wrap shadow-sm" role="group" aria-label="Tool Selection">
            {[
              { name: "pencil", icon: "✏️" },
              { name: "line", icon: "📏" },
              { name: "rect", icon: "⬛" },
              { name: "circle", icon: "⭕" },
              { name: "triangle", icon: "▲" },
              { name: "ellipse", icon: "⬭" },
              { name: "arrow", icon: "➡️" },
              { name: "text", icon: "🅰️" },
              { name: "eraser", icon: "🧹" },
            ].map((t) => (
              <button
                key={t.name}
                className={`btn ${tool === t.name ? "btn-primary" : "btn-outline-primary"} m-1 rounded`}
                onClick={() => setTool(t.name)}
                style={{
                  minWidth: "80px",
                  transition: "all 0.2s ease",
                }}
              >
                {t.icon} {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-3 col-8">
          <div className="d-flex justify-content-center gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg rounded-pill shadow-sm"
              disabled={elements.length === 0}
              onClick={undo}
              style={{ minWidth: "100px" }}
            >
              ↩️ Undo
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg rounded-pill shadow-sm"
              disabled={history.length < 1}
              onClick={redo}
              style={{ minWidth: "100px" }}
            >
              ↪️ Redo
            </button>
            <button
              type="button"
              className="btn btn-danger btn-lg rounded-pill shadow-sm"
              onClick={clearCanvas}
              style={{ minWidth: "120px" }}
            >
              🗑️ Clear
            </button>
          </div>
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