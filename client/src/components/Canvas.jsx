import React, { useEffect, useRef, useState } from "react"; // Added useState

const Canvas = ({
  canvasRef,
  ctx,
  color,
  setElements,
  elements,
  tool,
  socket,
}) => {


  const [isDrawing, setIsDrawing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
          element: tool,
        },
      ]);
    } else {
      setElements((prevElements) => [
        ...prevElements,
        { offsetX, offsetY, stroke: color, element: tool },
      ]);
    }

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "rect") {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
                stroke: ele.stroke,
                element: ele.element,
              }
            : ele
        )
      );
    } else if (tool === "line") {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                width: offsetX,
                height: offsetY,
                stroke: ele.stroke,
                element: ele.element,
              }
            : ele
        )
      );
    } else if (tool === "pencil") {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                path: [...ele.path, [offsetX, offsetY]],
                stroke: ele.stroke,
                element: ele.element,
              }
            : ele
        )
      );
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    // Save the current state to history
    setHistory((prevHistory) => [
      ...prevHistory.slice(0, historyIndex + 1),
      elements,
    ]);
    setHistoryIndex((prevIndex) => prevIndex + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  };


  useEffect(() => {
    // Dynamically import Fabric.js
    import("fabric").then(({ fabric }) => {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth,
        height: 500,
        backgroundColor: "#fff",
      });
      fabricCanvasRef.current = canvas;

      // Sync elements to canvas
      canvas.loadFromJSON({ objects: elements }, () => canvas.renderAll());

      // Handle object modifications (move, resize)
      canvas.on("object:modified", () => {
        const updatedElements = canvas.toJSON().objects;
        setElements(updatedElements);
        const canvasImage = canvas.toDataURL();
        socket.emit("drawing", canvasImage);
      });

      // Setup drawing logic
      setupDrawing(canvas);

      return () => canvas.dispose();
    });
  }, []);

  const setupDrawing = (canvas) => {
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = tool === "eraser" ? 10 : 5;

    const handleMouseDown = (e) => {
      if (tool === "pencil" || tool === "eraser") {
        canvas.isDrawingMode = true;
        return;
      }
      canvas.isDrawingMode = false;

      const pointer = canvas.getPointer(e.evt);
      let shape;

      switch (tool) {
        case "rect":
          shape = new fabric.Rect({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            stroke: color,
            strokeWidth: 5,
            fill: "transparent",
            selectable: true,
          });
          break;
        case "circle":
          shape = new fabric.Circle({
            left: pointer.x,
            top: pointer.y,
            radius: 0,
            stroke: color,
            strokeWidth: 5,
            fill: "transparent",
            selectable: true,
          });
          break;
        case "line":
          shape = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
            stroke: color,
            strokeWidth: 5,
            selectable: true,
          });
          break;
        case "triangle":
          shape = new fabric.Triangle({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            stroke: color,
            strokeWidth: 5,
            fill: "transparent",
            selectable: true,
          });
          break;
        case "ellipse":
          shape = new fabric.Ellipse({
            left: pointer.x,
            top: pointer.y,
            rx: 0,
            ry: 0,
            stroke: color,
            strokeWidth: 5,
            fill: "transparent",
            selectable: true,
          });
          break;
        case "arrow":
          shape = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
            stroke: color,
            strokeWidth: 5,
            selectable: true,
          });
          break;
        case "text":
          shape = new fabric.IText("Text", {
            left: pointer.x,
            top: pointer.y,
            fill: color,
            fontSize: 20,
            editable: true,
            selectable: true,
          });
          break;
        default:
          return;
      }

      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.__currentShape = shape;
    };

    const handleMouseMove = (e) => {
      if (!canvas.__currentShape || (tool !== "pencil" && tool !== "eraser")) {
        const pointer = canvas.getPointer(e.evt);
        const shape = canvas.__currentShape;
        if (!shape) return;

        switch (tool) {
          case "rect":
          case "triangle":
            shape.set({
              width: pointer.x - shape.left,
              height: pointer.y - shape.top,
            });
            break;
          case "circle":
            shape.set({
              radius: Math.sqrt(
                Math.pow(pointer.x - shape.left, 2) + Math.pow(pointer.y - shape.top, 2)
              ),
            });
            break;
          case "line":
          case "arrow":
            shape.set({ x2: pointer.x, y2: pointer.y });
            break;
          case "ellipse":
            shape.set({
              rx: Math.abs(pointer.x - shape.left),
              ry: Math.abs(pointer.y - shape.top),
            });
            break;
        }
        canvas.renderAll();
      }
    };

    const handleMouseUp = () => {
      if (canvas.__currentShape) {
        const updatedElements = canvas.toJSON().objects;
        setElements(updatedElements);
        const canvasImage = canvas.toDataURL();
        socket.emit("drawing", canvasImage);
        canvas.__currentShape = null;
      }
      canvas.isDrawingMode = false;
    };

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:up", handleMouseUp);

    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", handleMouseUp);
    };
  };

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    setupDrawing(canvas);
  }, [tool, color, socket, setElements]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.loadFromJSON({ objects: elements }, () => canvas.renderAll());
    }
  }, [elements]);

  return (
    <div
      className="col-md-8 overflow-hidden border border-dark px-0 mx-auto mt-3"
      style={{
        height: "500px",
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isHovered ? "scale(1.02)" : "scale(1)",
        boxShadow: isHovered
          ? "0 10px 20px rgba(0, 0, 0, 0.2)"
          : "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} />


      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.1)",
            pointerEvents: "none",
            borderRadius: "8px",
          }}
        />
      )}
      <div>
        <button onClick={undo} disabled={historyIndex <= 0}>
          Undo
        </button>
        <button onClick={redo} disabled={historyIndex >= history.length - 1}>
          Redo
        </button>
      </div>

    </div>
  );
};

export default Canvas;