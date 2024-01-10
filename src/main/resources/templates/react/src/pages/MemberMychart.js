import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import styled, { css, keyframes } from "styled-components";
import axios from "axios";
import Pagenation from "../components/Pagenation";
import "../App.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function Member() {
  const [no, setNo] = useState([]);
  const [list, setList] = useState([]);
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [search, setSearch] = useState("");
  const [moveInfo, setMoveInfo] = useState();
  const accesstoken = useSelector((state) => state.user.accesstoken);

  const handlePageChange = (page) => {
    setPage(page);
  };
  console.log(number); //0
  const navigation = useNavigate();
  const handleNavigate_member = (no) => {
    navigation("/member/info/", { state: { no: no } });
  };
  const List = async (offset) => {
    try {
      await axios
        .post(
          "http://localhost::2500/admin/member/list",
          { offset, word: search },
          {
            headers: {
              accesstoken: localStorage.getItem("accessToken"),
            },
            withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
          }
        )
        .then((res) => {
          setList(res.data.data.data);
          setNumber(res.data.data.cnt);
          console.log(number); // 7
          setCount((page - 1) * itemsPerPage + 1);
        });
    } catch (error) {
      const response = await axios.get(
        `${"http://localhost:2500"}/admin/refresh`,
        {
          headers: {
            accesstoken: localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );
      const newAct = response.data.data.accesstoken;
      localStorage.setItem("accessToken", newAct);
      dispatch(
        userSlice.actions.updateAccessToken({
          accesstoken: localStorage.getItem("accessToken"),
        })
      );
      await axios
        .post(
          "http://localhost::2500/admin/member/list",
          { offset, word: search },
          {
            headers: {
              accesstoken: localStorage.getItem("accessToken"),
            },
            withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
          }
        )
        .then((res) => {
          setList(res.data.data.data);
          setNumber(res.data.data.cnt);
          setCount((page - 1) * itemsPerPage + 1);
        });
    }
  };

  useEffect(() => {
    const offset = (page - 1) * itemsPerPage;
    List(offset);
  }, [page, accesstoken]);

  return (
    <Layout
      children={
        <>
          <HomeContainer>
            <HorizontalContainer>
              <div>사용자 관리</div>
              <CurrentPlaceContainer>
                <PastText>홈 &nbsp;&nbsp;</PastText>
                <img
                  src={process.env.PUBLIC_URL + "/Vector_cloudy.png"}
                  style={{ maxWidth: "20px", maxHeight: "20px" }}
                />
                <text>&nbsp;&nbsp;사용자 관리</text>
              </CurrentPlaceContainer>
            </HorizontalContainer>
            <div>
              <HorizontalContainer>
                <div>
                  회원목록 <b style={{ color: "#FF7D3B" }}> {number}</b>명
                </div>
                <SerchContainer>
                  <input
                    style={{
                      width: "260px",
                      fontSize: "16px",
                      borderColor: "#ffff",
                      borderStyle: "solid",
                      height: "35px",
                      marginTop: "5px",
                    }}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        List(0);
                      }
                    }}
                  />
                  <img
                    src={process.env.PUBLIC_URL + "/ico_search_yellow.png"}
                    style={{
                      width: "26px",
                      height: "26px",
                      marginTop: "12.5px",
                    }}
                  />
                </SerchContainer>
              </HorizontalContainer>
              <br />
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>번호</th>
                      <th>이름</th>
                      <th>닉네임</th>
                      <th>전화번호</th>
                      <th>임신주수</th>
                      <th>가입일</th>
                      <th>마케팅 수신</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list &&
                      list.map((k, n) => (
                        <tr key={k.id}>
                          <td>{count + n}</td>
                          <td>
                            <a
                              href="#"
                              onClick={() => handleNavigate_member(k.no)}
                            >
                              {k.name}
                            </a>
                          </td>
                          <td>{k.nick}</td>
                          <td>{k.phone}</td>
                          <td>{k.birth}</td>
                          <td>{k.date.split(" ")[0].replace(/-/g, ".")}</td>
                          <td>{k.agree === 0 ? "미수신" : "수신"}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </TableContainer>
              <Pagenation
                page={page}
                itemsPerPage={itemsPerPage}
                number={number} // 총 아이템 갯수
                handlePageChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
              />
            </div>
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

  > * {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`;
const HorizontalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;
const SerchContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-color: #e9eaee;
  line-height: 43px;
  border-width: 1;
  border-style: solid;
  height: 52px;
  width: 314px;
  left: 0px;
  top: 0px;
  border-radius: 44px;
  justify-content: center;
  align-content: center;
`;
const CurrentPlaceContainer = styled.div`
  display: flex;
`;
const PastText = styled.div`
  font-size: 14px;
  color: #888888;
`;
const TableContainer = styled.div`
  font-family: "NanumBarunGothicOTF";
  font-size: 16px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto 50px;
  grid-gap: 10px;
  margin-top: 10px;
  margin-left: 10px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    border: 1px solid #e9eaee;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }
  grid-column: 1 / span 6;
`;
