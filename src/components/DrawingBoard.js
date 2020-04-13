import React, { createRef, useState, useEffect } from "react";
import styled from "styled-components";

export default ({ clearDrawing, color, drawing, brushSize }) => {

  const canvasRef = createRef();
  let mouseDown = false;
  let lastX, lastY;

  const handleMouseMove = (event) => {
    if (mouseDown) {
      const { clientX, clientY } = event;
      const ctx = canvasRef.current.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = color;
      console.log(brushSize);
      ctx.lineWidth = brushSize;
      ctx.lineJoin = "round";
      ctx.moveTo(clientX, clientY);
      ctx.lineTo(lastX, lastY);
      ctx.closePath();
      ctx.stroke();
    }

    lastX = event.clientX;
    lastY = event.clientY;
  }

  const handleMouseDown = () =>
    mouseDown = true;

  const handleMouseUp = () =>
    mouseDown = false;

  useEffect(() =>
    canvasRef.current.getContext("2d")
      .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height),
      // eslint-disable-next-line
      [clearDrawing])

  return (
    <>
      <Canvas
        className="board"
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
      />
      <EventsBoard
        className="board"
        drawing={drawing}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </>
  )
}

const EventsBoard = styled.div`
  z-index: ${ ({drawing}) => drawing ? 1 : 0 };
  cursor: crosshair;
`
const Canvas = styled.canvas`
  z-index: 2;
  pointer-events: none;
`