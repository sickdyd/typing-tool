import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default () => {

  const [fontSize, setFontSize] = useState(30);

  const handleWheel = (event) => {
    event.nativeEvent.wheelDelta > 0
    ? (fontSize > 20) && setFontSize(fontSize - 10)
    : (fontSize < 300) && setFontSize(fontSize + 10)
  }

  const handleKeydown = (event) => {
    switch (event.which) {
      case 9:
        event.preventDefault();
        console.log("tab");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown)
  });

  return (
    <Board
      onWheel={handleWheel}
      fontSize={fontSize}
      contentEditable={true}
    />
  )
}

const Board = styled.div`
  padding: 20px;
  height: calc(100vh - 40px);
  width: calc(100vw - 40px);

  font-size: ${({fontSize}) => fontSize + "px"};

  overflow: hidden;
`