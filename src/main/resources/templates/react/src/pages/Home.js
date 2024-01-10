import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
//import Home_Chat from "../components/Home/Home_Chat";
//import Home_Coaching from "../components/Home/Home_Coaching";
//import Home_Pay from "../components/Home/Home_Pay";
import Home_Post from "../components/Home/Home_Post";
//import Home_Question from "../components/Home/Home_Question";
//import Home_Service from "../components/Home/Home_Service";
import Home_Notice from "../components/Home/Home_Notice";
import "./css/home.css";
import styled from "styled-components";
export default function Home() {
  const isLoggedIn = useSelector((state) => state.user.name);
  return (
    <Layout
      children={
        <>
          <Container>
            <ContainerSub>
              <ContainerItem>
                <Home_Post />
              </ContainerItem>
              <ContainerItem>
                <Home_Notice />
              </ContainerItem>
            </ContainerSub>

            <ContainerSub>
              <ContainerItem>{/* <Home_Coaching /> */}</ContainerItem>
              <ContainerItem>{/* <Home_Service /> */}</ContainerItem>
            </ContainerSub>

            <ContainerBottom>
              <ContainerBItem>{/* <Home_Chat /> */}</ContainerBItem>
              <ContainerBItem>{/* <Home_Question /> */}</ContainerBItem>
            </ContainerBottom>
          </Container>
        </>
      }
    ></Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;
const ContainerSub = styled.div`
  display: block;
  margin-bottom: 10px;
  width: 100%;
`;
const ContainerBottom = styled.div`
  display: block;
  width: 100%;
`;
const ContainerItem = styled.div`
  &:last-child {
    margin-right: 0px;
  }
  display: inline-block;
  background-color: rgb(255, 255, 255);
  margin-right: 10px;
  padding: 30px;
  height: calc(191px);
  width: calc(50% - 65.5px);
  vertical-align: top;
`;
const ContainerBItem = styled.div`
  &:last-child {
    margin-right: 0px;
  }
  display: inline-block;
  background-color: rgb(255, 255, 255);
  margin-right: 10px;
  padding: 30px;
  height: calc(500px - 60px);
  width: calc(50% - 65.5px);
  vertical-align: top;
`;
