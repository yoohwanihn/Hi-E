import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import styled, { css, keyframes } from "styled-components";
import axios from "axios";
import MemberBasicInfo from "../components/MemberBasicInfo";
import MemberMychart from "../components/MemberMyChart";
import MemberEtc from "../components/MemberEtc";
import "../App.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
export default function MemberInfo(props) {
  const [list, setList] = useState([]);
  const [risk, setRisk] = useState([]);
  const [treat, setTreat] = useState([]);
  const [userno, setUserno] = useState([]);
  const [memo, setMemo] = useState([]);
  const [catergoryIndex, setCategoryIndex] = useState(0);
  const categories = ["", "", ""];
  const location = useLocation();
  const accesstoken = useSelector((state) => state.user.accesstoken);
  const no = location.state ? location.state.no : null;
  return (
    <Layout
      children={
        <>
          <HomeContainer>
            <div>
              <HorizontalContainer>
                <Text>인사관리</Text>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <text style={{ color: "#888" }}>홈 &nbsp;&nbsp;</text>
                  <img
                    src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
                    style={{ width: "19px", height: "19px" }}
                  />
                  <text style={{ color: "#888" }}>
                    &nbsp;&nbsp;사용자관리&nbsp;&nbsp;
                  </text>
                  {/* <img
                    src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
                    style={{ Width: "19px", height: "19px" }}
                  />
                  <text>&nbsp;&nbsp;인사관리</text> */}
                </div>
              </HorizontalContainer>
              <hr
                style={{
                  border: "0.5px solid #E6E7EB",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "60px",
                  marginBottom: "17.5px",
                  marginTop: "20px",
                }}
              >
                {categories.map((item, index) => (
                  <div key={index}>
                    <TabContainer onClick={() => setCategoryIndex(index)}>
                      {catergoryIndex == 0
                        ? index === 0 && (
                            <>
                              <Tab>
                                <button
                                  style={{
                                    backgroundColor: "#ffff",
                                    border: "#ffff",
                                    marginTop: "17px",
                                    fontFamily: "NanumBarunGothicOTF",
                                    cursor: "pointer",
                                  }}
                                >
                                  기본정보
                                </button>
                              </Tab>
                              <ChatButtonText>{item}</ChatButtonText>
                            </>
                          )
                        : index === 0 && (
                            <>
                              <TabB>
                                <button
                                  style={{
                                    backgroundColor: "#ffff",
                                    border: "#ffff",
                                    marginTop: "17px",
                                    fontFamily: "NanumBarunGothicOTF",
                                    color: "#C4C4C4",
                                  }}
                                >
                                  기본정보
                                </button>
                              </TabB>
                              <div>{item}</div>
                            </>
                          )}
                      {catergoryIndex == 1
                        ? index === 1 && (
                            <>
                              <Tab>
                                <button
                                  style={{
                                    backgroundColor: "#ffff",
                                    border: "#ffff",
                                    marginTop: "17px",
                                    fontFamily: "NanumBarunGothicOTF",
                                  }}
                                >
                                  마이차트
                                </button>
                              </Tab>
                              <ChatButtonText>{item}</ChatButtonText>
                            </>
                          )
                        : index === 1 && (
                            <>
                              <TabB>
                                <button
                                  style={{
                                    backgroundColor: "#ffff",
                                    border: "#ffff",
                                    marginTop: "17px",
                                    fontFamily: "NanumBarunGothicOTF",
                                    color: "#C4C4C4",
                                  }}
                                >
                                  마이차트
                                </button>
                              </TabB>
                              <div>{item}</div>
                            </>
                          )}
                      {catergoryIndex == 2
                        ? index === 2 && (
                            <>
                              <Tab>
                                <button
                                  style={{
                                    backgroundColor: "#ffff",
                                    border: "#ffff",
                                    marginTop: "17px",
                                    fontFamily: "NanumBarunGothicOTF",
                                  }}
                                >
                                  기타정보
                                </button>
                              </Tab>
                              <ChatButtonText>{item}</ChatButtonText>
                            </>
                          )
                        : index === 2 && (
                            <>
                              <TabB>
                                <button
                                  style={{
                                    backgroundColor: "#ffff",
                                    border: "#ffff",
                                    marginTop: "17px",
                                    fontFamily: "NanumBarunGothicOTF",
                                    color: "#C4C4C4",
                                  }}
                                >
                                  기타정보
                                </button>
                              </TabB>
                              <div>{item}</div>
                            </>
                          )}
                    </TabContainer>
                  </div>
                ))}
              </div>
            </div>
            {catergoryIndex == 0 && <MemberBasicInfo no={no && no} />}
            {catergoryIndex == 1 && <MemberMychart no={no && no} />}
            {catergoryIndex == 2 && <MemberEtc no={no && no} />}
          </HomeContainer>
        </>
      }
    ></Layout>
  );
}

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-gap: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;

  > * {
    background-color: #fff;
    box-sizing: border-box;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`;
const HorizontalContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 30px 60px 30px 60px;
`;
const CurrentPlaceContainer = styled.div`
  display: flex;
`;
const PastText = styled.div`
  font-size: 14px;
  color: #888888;
`;
const PastsText = styled.div`
  font-size: 14px;
  color: #888888;
`;
const MemoContainer = styled.div`
  //font-family: "NanumBarunGothicOTF";
  //display: grid;
  line-height: 43px;
  border-width: 1;
  height: 104px;
  width: 1405px;
  left: 0px;
  top: 0px;
  border-radius: 44px;
  justify-content: center;
  align-content: center;
  flex-direction: row;
`;
const TableContainer = styled.div`
  font-family: "NanumBarunGothicOTF";
  font-size: 16px;
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  tr {
    display: grid;
    grid-template-columns: 160px 4fr 160px 4fr 4fr 4fr;
    flex-direction: row;
  }

  th,
  td {
    border: 1px solid #e9eaee;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    text-align: center;
    grid-column: 1 / span 6;
  }

  td:nth-child(1),
  td:nth-child(3) {
    background-color: #f2f2f2;
  }
`;
const Table2 = styled.table`
  border-collapse: collapse;
  width: 100%;

  tr {
    display: grid;
    grid-template-columns: 160px 4fr 160px 4fr;
    flex-direction: row;
  }

  th,
  td {
    border: 1px solid #e9eaee;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    text-align: center;
    grid-column: 1 / span 6;
  }

  td:nth-child(1),
  td:nth-child(3) {
    background-color: #f2f2f2;
  }

  td:nth-child(3):last-of-type {
    grid-row-end: span 2;
  }

  td:nth-child(3):last-of-type {
    background-color: #ffff;
  }
`;
const ButtonContainer = styled.button`
  margin-right: 50px;
  padding: 5px 10px;
  box-shadow: none;
  background: rgba(255, 255, 255, 0.0001);
  /* border: 1px solid #4674FE;
  border-radius: 20px;
  cursor: pointer; */
  height: 34px;
  width: 101px;
  /* border-radius: 20px; */
  margin-top: 20px;
  flex-direction: row;
  border: none;
  padding-top: 13px;
`;
const DateText = styled.text`
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
`;
const BodyText = styled.div`
  margin-left: 24px;
  margin-top: 15px;
  margin-bottom: 15px;
`;
const BodyContainer = styled.div`
  display: block;
  width: 100%;
  height: 98px;
  background: #f5f5f5;
  overflow: auto;
`;
const AnserBody = styled.textarea`
  margin-top: 10px;
  display: flex;
  width: 90%;
  height: 77px;
  background: #ffff;
  border: 1px solid #e9eaee;
  resize: vertical; /* optional - allows user to resize vertically */
`;
const Text = styled.div`
  font-size: 30px;
  font-weight: 600;
`;
const Tab = styled.div`
  font-size: 30px;
  font-family: NanumBarunGothicOTF;
  font-weight: 600;
  box-sizing: border-box;
  right: 67.41%;
  left: 0%;
  bottom: 0%;
  background-color: #fff;
  border: 2px solid black;
  border-radius: 4px;
  width: 174.06px;
  height: 54.43px;
  text-align: center;
  align-content: center;
  margin-right: 6.75px;
  cursor: pointer;
`;

const TabB = styled.div`
  font-size: 30px;
  font-family: NanumBarunGothicOTF;
  font-weight: 600;
  margin-left: 10px;
  box-sizing: border-box;
  right: 67.41%;
  left: 0%;
  bottom: 0%;
  background-color: #ffff;
  border: 2px solid #c4c4c4;
  border-radius: 4px;
  width: 174.06px;
  height: 54.43px;
  text-align: center;
  align-content: center;
  margin: 0 auto;
  margin-right: 6.76px;
  cursor: pointer;
`;

const TabContainer = styled.div`
  font-size: 16px;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  cursor: pointer;
`;
const ChatButtonText = styled.div`
  color: #4674fe;
`;
