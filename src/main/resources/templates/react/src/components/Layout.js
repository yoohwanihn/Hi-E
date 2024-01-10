import React from "react";
import { Link } from "react-router-dom";
import Header from "./Semantic/Header";
import Nav from "./Semantic/Nav";
import styled, { css, keyframes } from "styled-components";
const Layout = ({ children }) => {
  return (
    <HorizontalContainer>
      <Nav/>
      <VerticalContainer>
        <Header />
        <section>{children}</section>
      </VerticalContainer>
    </HorizontalContainer>
  );
};
export default Layout;

const HorizontalContainer = styled.div`
  flex: 1;
  display: flex;
  margin: 0px;
`;
const VerticalContainer = styled.div`
  flex: 1;
`;
