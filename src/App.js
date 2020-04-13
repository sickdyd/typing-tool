import React from "react";
import styled from "styled-components";
import TextBoard from "./components/TextBoard";

export default () =>
  <Main>
    <TextBoard />
  </Main>

const Main = styled.section`
  display: flex;
`