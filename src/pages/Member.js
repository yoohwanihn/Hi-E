import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import styled, { css, keyframes } from "styled-components";
import axios from "axios";
import Pagenation from "../components/Pagenation";
import "../App.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import swal from "sweetalert";
import userSlice from "../slice/user";
import pageSlice from "../slice/page";

export default function Member() {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);
  //const [page, setPage] = useState(1);
  const page = useSelector((state) => state.page.page);
  const itemsPerPage = 10;
  const [search, setSearch] = useState("");
  const [moveInfo, setMoveInfo] = useState();
  const dispatch = useAppDispatch();
  const accesstoken = useSelector((state) => state);
  //console.log(accesstoken)

  const handlePageChange = (page) => {
    dispatch(
      pageSlice.actions.setPage({
        page: page,
      })
    );
  };

  const navigation = useNavigate();
  const handleNavigate_member = (no) => {
    navigation("/member/info/", { state: { no: no } });
    //navigation('/member/mychart',{ state: { no: no } });
  };

  const List = async (offset) => {
    try {
      await axios
        .post(
          `${"http://localhost:2500"}/admin/users/list`,
          { offset, word: search },
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
          }
        )
        .then((res) => {
          console.log("res.data,data", res.data.data.cnt[0].cnt);
          setList(res.data.data.member);
          setNumber(res.data.data.cnt[0].cnt);
          setCount((page - 1) * itemsPerPage + 1);
        });
    } catch (error) {
      const response = await axios.get(
        `${"http://localhost:2500"}/admin/refresh`,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );
      if (response.data.popdata.poptext) {
        swal(response.data.popdata.poptext, { icon: "error" });
        return;
      }
      const newAct = response.data.data.Authorization;
      localStorage.setItem("accessToken", newAct);
      dispatch(
        userSlice.actions.updateAccessToken({
          Authorization: localStorage.getItem("accessToken"),
        })
      );
      console.log("response", response);
      await axios
        .post(
          `${"http://localhost:2500"}/admin/users/list`,
          { offset, word: search },
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
          }
        )
        .then((res) => {
          console.log(res);
          setList(res.data.data.member);
          setNumber(res.data.data.cnt[0].cnt);
          setCount((page - 1) * itemsPerPage + 1);
        });
    }
  };
  console.log("list", list);
  console.log("number", page);
  useEffect(() => {
    const offset = (page - 1) * itemsPerPage;
    List(offset);
  }, [page]);
  console.log(list);
  return (
    <Layout
      children={
        <>
          <HomeContainer>
            <HorizontalContainer>
              <div style={{ height: 40, alignItems: "center" }}>
                <text
                  style={{
                    lineHeight: "42px",
                    fontSize: "30px",
                    fontWeight: 600,
                  }}
                >
                  회원 목록
                </text>
              </div>
              <CurrentPlaceContainer>
                <text
                  style={{
                    color: "#888",
                    fontSize: "14px",
                    marginRight: 10,
                    fontWeight: 200,
                  }}
                >
                  홈
                </text>
                <img
                  src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
                  style={{ width: "16px", height: "16px", marginRight: 2 }}
                />
                <text style={{ fontSize: "14px", marginLeft: 8 }}>
                  사용자 관리
                </text>
              </CurrentPlaceContainer>
            </HorizontalContainer>
            <div style={{ padding: "29px 60px 45px 60px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <text style={{ fontSize: 18, fontWeight: 600 }}>
                  사용자 관리 <b style={{ color: "#FF7D3B" }}> {number}</b>명
                </text>
                <SerchContainer>
                  <input
                    style={{
                      textIndent: "5px",
                      width: "240px",
                      fontSize: "12px",
                      borderColor: "#ffff",
                      borderStyle: "solid",
                      height: "35px",
                      marginTop: "5px",
                      lineHeight: "36px",
                      marginRight: "1px",
                    }}
                    placeholder="이름"
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
                    onClick={() => {
                      List(0);
                    }}
                    style={{
                      width: "26px",
                      height: "26px",
                      marginTop: "11.5px",
                      marginLeft: "12px",
                      marginRight: "4px",
                      cursor: "pointer",
                    }}
                  />
                </SerchContainer>
              </div>
              <div style={{ marginTop: "29px", marginBottom: "39px" }}>
                <div
                  style={{
                    height: 1,
                    background: "rgb(233,234,238)",
                    width: "100%",
                  }}
                ></div>
              </div>

              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th style={{ width: "52px", height: "30px" }}>번호</th>
                      <th style={{ width: "16.4%" }}>닉네임</th>
                      <th style={{ width: "18.5%" }}>휴대폰 번호</th>
                      <th style={{ width: "16.1%" }}>가입일</th>
                      <th>마케팅 수신</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((k, n) => (
                      <tr key={k.id}>
                        <td style={{ height: "31px" }}>{count + n}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => handleNavigate_member(k.no)}
                        >
                          {k.nick}
                        </td>
                        <td>{k.phone}</td>
                        <td>{k.date.split(" ")[0].replace(/-/g, ".")}</td>
                        <td>{k.agree === 0 ? "미동의" : "동의"}</td>
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

  > * {
    background-color: #fff;
    padding: 20px;
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
  padding: 30px 62px 30px 60px;
  border-color: #ffff;
`;
const SerchContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-color: rgb(233, 234, 238);
  line-height: 43px;
  border-style: solid;
  height: 50px;
  width: 312px;
  left: 0px;
  top: 0px;
  border-radius: 44px;
  -webkit-box-pack: center;
  border-width: 2px;
  place-content: center;
`;
const CurrentPlaceContainer = styled.div`
  display: flex;
  align-items: center;
`;
const PastText = styled.div`
  font-size: 14px;
  color: #888888;
`;
const Text = styled.div`
  font-size: 14px;
  color: #888888;
`;
const TableContainer = styled.div`
  font-size: 16px;
  display: block;
  margin-top: 10px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    border: 1px solid #e9eaee;
    padding: 8px;
    text-align: center;
    height: 28px;
    line-height: 28px;
  }

  th {
    background-color: #f2f2f2;
    height: 28px;
    font-weight: 400;
  }
  grid-column: 1 / span 6;
`;
