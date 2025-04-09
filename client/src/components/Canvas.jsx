import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, Line, Text } from "react-konva";

const Canvas = ({ color, setElements, elements, tool, socket }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth * 0.8,
    height: 500
  });
  const stageRef = useRef(null);
  const layerRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setStageSize({
        width: window.innerWidth * 0.8,
        height: 500
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle socket events
  useEffect(() => {
    if (!socket) return;

    const handleRemoteDrawing = (dataUrl) => {
      const img = new Image();
      img.onload = () => {
        if (!stageRef.current) return;
        
        const layer = layerRef.current;
        layer.destroyChildren();
        
        const imageObj = new window.Konva.Image({
          image: img,
          width: stageSize.width,
          height: stageSize.height,
        });
        
        layer.add(imageObj);
        layer.batchDraw();
      };
      img.src = dataUrl;
    };

    socket.on("drawing", handleRemoteDrawing);
    return () => socket.off("drawing", handleRemoteDrawing);
  }, [socket, stageSize]);

  // Load saved elements
  useEffect(() => {
    if (!elements || !layerRef.current) return;
    
    const layer = layerRef.current;
    layer.destroyChildren();
    elements.forEach((element) => {
      createShape(element);
    });
    layer.batchDraw();

    return () => {
      if (layerRef.current) {
        layerRef.current.destroyChildren();
      }
    };
  }, [elements]);

  const createShape = (shapeProps) => {
    const { type, ...props } = shapeProps;
    let shape;

    switch (type) {
      case "rect":
        shape = new window.Konva.Rect({
          ...props,
          stroke: props.stroke || color,
          strokeWidth: 5,
          fill: "transparent",
        });
        break;
      case "circle":
        shape = new window.Konva.Circle({
          ...props,
          stroke: props.stroke || color,
          strokeWidth: 5,
          fill: "transparent",
        });
        break;
      case "line":
        shape = new window.Konva.Line({
          ...props,
          stroke: props.stroke || color,
          strokeWidth: 5,
          points: props.points || [],
          lineCap: 'round',
          lineJoin: 'round',
        });
        break;
      case "text":
        shape = new window.Konva.Text({
          ...props,
          fill: props.fill || color,
          fontSize: 20,
        });
        break;
      case "free":
        shape = new window.Konva.Line({
          ...props,
          stroke: props.stroke || color,
          strokeWidth: tool === "eraser" ? 20 : 5,
          tension: 0.5,
          points: props.points || [],
          lineCap: 'round',
          lineJoin: 'round',
        });
        break;
    }

    if (shape && layerRef.current) {
      layerRef.current.add(shape);
      layerRef.current.batchDraw();
    }
    return shape;
  };

  const handleMouseDown = (e) => {
    if (tool === "select") return;

    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    let shape;

    switch (tool) {
      case "rect":
        shape = createShape({
          type: "rect",
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
        });
        break;
      case "circle":
        shape = createShape({
          type: "circle",
          x: pos.x,
          y: pos.y,
          radius: 0,
        });
        break;
      case "line":
      case "arrow":
        shape = createShape({
          type: "line",
          points: [pos.x, pos.y, pos.x, pos.y],
        });
        break;
      case "text":
        shape = createShape({
          type: "text",
          x: pos.x,
          y: pos.y,
          text: "Double click to edit",
        });
        break;
      case "pencil":
      case "eraser":
        shape = createShape({
          type: "free",
          points: [pos.x, pos.y],
        });
        break;
    }

    setCurrentShape(shape);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentShape) return;

    const pos = e.target.getStage().getPointerPosition();

    switch (tool) {
      case "rect":
        const rect = currentShape;
        const width = pos.x - rect.x();
        const height = pos.y - rect.y();
        rect.width(width);
        rect.height(height);
        break;
      case "circle":
        const circle = currentShape;
        const radius = Math.sqrt(
          Math.pow(pos.x - circle.x(), 2) + Math.pow(pos.y - circle.y(), 2)
        );
        circle.radius(radius);
        break;
      case "line":
      case "arrow":
        const line = currentShape;
        const points = line.points();
        points[2] = pos.x;
        points[3] = pos.y;
        line.points(points);
        break;
      case "pencil":
      case "eraser":
        const freeLine = currentShape;
        const newPoints = freeLine.points().concat([pos.x, pos.y]);
        freeLine.points(newPoints);
        break;
    }

    layerRef.current.batchDraw();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (currentShape) {
      const elements = layerRef.current.children.map((shape) => ({
        type: shape.getClassName().toLowerCase(),
        ...shape.attrs,
      }));
      setElements(elements);
      socket.emit("drawing", stageRef.current.toDataURL());
    }
    setCurrentShape(null);
  };

  return (
    <div className="col-md-8 overflow-hidden border border-dark px-0 mx-auto mt-3">
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ backgroundColor: "#fff" }}
      >
        <Layer ref={layerRef} />
      </Stage>
    </div>
  );
};

export default Canvas;
