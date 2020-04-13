import React, { useState, useEffect, createRef } from "react";
import styled from "styled-components";
import DrawingBoard from "./DrawingBoard";

export default () => {

  const colors = ["#000", "#f00", "#080", "#00f"];

  const [colorIndex, setColorIndex] = useState(0);
  const [fontSize, setFontSize] = useState(50);
  const [drawing, setDrawing] = useState(false);
  const [clearDrawing, setClearDrawing] = useState(false);

  const boardRef = createRef();

  const cycleColors = () =>
  setColorIndex((colorIndex + 1) % colors.length);

  // eslint-disable-next-line
  const setPenColor = (color) => {
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("foreColor", false, color);
    boardRef.current.style.borderLeft = "2px dashed " + color;
  }

  const handleWheel = (event) => {
    event.nativeEvent.wheelDelta > 0
    ? (fontSize > 20) && setFontSize(fontSize - 10)
    : (fontSize < 300) && setFontSize(fontSize + 10)
  }

  const handleKeydown = (event) => {
    if (!event.ctrlKey) {
      switch (event.which) {
        case 9:
          event.preventDefault();
          cycleColors();
          break;
        case 13:
          if (document.queryCommandState("strikeThrough")) document.execCommand("strikeThrough");
          break;
        default:
          setPenColor(colors[colorIndex]);
          break;
      }
    } else {
      switch (event.which) {
        case 68:
          event.preventDefault();
          if (!drawing) boardRef.current.innerHTML = "";
          setClearDrawing(!clearDrawing) 
          break;
        case 83:
          event.preventDefault();
          document.execCommand("strikeThrough");
          break;
        default:
          break;
      }
    }
  };

  const handleMouseDown = (event) =>
    event.button === 1 && setDrawing(!drawing);

  const handleMouseUp = () =>
    window.getSelection().isCollapsed && setPenColor(colors[colorIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousedown", handleMouseDown);
    }
  });

  useEffect(() => setPenColor(colors[colorIndex]), [colorIndex, colors, setPenColor]);

  return (
    <>
      <DrawingBoard
        clearDrawing={clearDrawing}
        color={colors[colorIndex]}
        drawing={drawing}
        setDrawing={setDrawing}
      />
      <Board
        className="board"
        ref={boardRef}
        drawing={drawing}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        fontSize={fontSize}
        contentEditable={true}
        spellCheck={false}
      />
    </>
  )
}

const Board = styled.div`
  padding: 20px;
  font-size: ${ ({fontSize}) => fontSize + "px" };
  z-index: ${ ({drawing}) => drawing ? 0 : 1 };
  text-align: center;
`