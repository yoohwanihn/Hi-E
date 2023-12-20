import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import styled, { css, keyframes } from "styled-components";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router";
import Pagenation from "../components/Pagenation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import swal from "sweetalert";
import userSlice from "../slice/user";
export default function System() {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const accesstoken = useSelector((state) => state.user.accesstoken);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const navigation = useNavigate();
  const handleNavigate_Pay_Man = (no) => {
    navigation("/pay/management", { state: { no: no } });
  };
  const List = async (offset) => {
    try {
      await axios
        .post(
          `${"http://localhost:2500"}/admin/pay/list`,
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
          setNumber(res.data.data.cnt[0].cnt);
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
          `${"http://localhost:2500"}/admin/pay/list`,
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
          setNumber(res.data.data.cnt[0].cnt);
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
              <div>시스템관리</div>
              <CurrentPlaceContainer>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <text style={{ color: "#888" }}>홈 &nbsp;&nbsp;</text>
                  <img
                    src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
                    style={{ Width: "19px", height: "19px" }}
                  />
                  <text>&nbsp;&nbsp;코칭관리</text>
                </div>
              </CurrentPlaceContainer>
            </HorizontalContainer>
            <div></div>
            <div>
              <HorizontalContainer>
                <div>
                  총<b style={{ color: "#FF7D3B" }}> {number}</b>명
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
                    onClick={() => {
                      List(0);
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
                      <th>휴대폰 번호</th>
                      <th>생년월일</th>
                      <th>보유코인</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list &&
                      list.map((k, n) => (
                        <tr key={k.id}>
                          <td>{n + 1}</td>
                          <td
                            onClick={() => {
                              handleNavigate_Pay_Man(k.userno);
                            }}
                          >
                            {k.name}
                          </td>
                          <td>{k.nickname}</td>
                          <td>{k.phone}</td>
                          <td>{k.birth}</td>
                          <td>{k.coin}</td>
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
