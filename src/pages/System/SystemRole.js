import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import styled, { css, keyframes } from "styled-components";
import axios from "axios";
import "../../App.css";
import { useNavigate } from "react-router";
import Pagenation from "../../components/Pagenation";
import CustomButton from "../../components/CustomButton";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import userSlice from "../../slice/user";

const ITEMSPERPAGE = 10;
export default function SystemRole() {
  const [adminList, setAdminList] = useState([]);
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const [adminName, setAdminName] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [adminPassword, setAdminPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const accesstoken = useSelector((state) => state.user.accesstoken);
  console.log("accesstoken", accesstoken);

  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleAdminName = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setAdminName(inputValue);
    } else {
      setAdminName(inputValue.slice(0, 20));
    }
  };
  const handleAdminId = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setAdminId(inputValue);
    } else {
      setAdminId(inputValue.slice(0, 20));
    }
  };
  const handleAdminPassword = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setAdminPassword(inputValue);
    } else {
      setAdminPassword(inputValue.slice(0, 20));
    }
  };
  const options = [
    { value: null, label: "-- Select an option --" },
    { value: 100, label: "총 관리자" },
    { value: 0, label: "일반 관리자" },
  ];

  const handlePageChange = (page) => {
    setPage(page);
  };
  const InsertAdmin = async (userid, password, type, name) => {
    try {
      await axios.post(
        `${"http://localhost:2500"}/admin/join`,
        { userid, password, type, name },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        }
      );
      swal("등록되었습니다!", {
        icon: "success",
      });
      setLoading(!loading);
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
      const newAct = response.data.data.Authorization;
      localStorage.setItem("accessToken", newAct);
      dispatch(
        userSlice.actions.updateAccessToken({
          Authorization: localStorage.getItem("accessToken"),
        })
      );
      const response_2 = await axios.post(
        `${"http://localhost:2500"}/admin/join`,
        { userid, password, type, name },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        }
      );
      if (response_2.data.popdata.poptext) {
        swal(response_2.data.popdata.poptext, { icon: "error" });
      }
      swal("등록되었습니다!", {
        icon: "success",
      });
      setLoading(!loading);
    }
  };
  const InsertWriter = async (userid, password, type, name) => {
    try {
      await axios.post(
        `${"http://localhost:2500"}/admin/join`,
        { userid, password, type, name },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        }
      );
      swal("등록되었습니다!", {
        icon: "success",
      });
      setLoading(!loading);
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
      const newAct = response.data.data.Authorization;
      localStorage.setItem("accessToken", newAct);
      dispatch(
        userSlice.actions.updateAccessToken({
          Authorization: localStorage.getItem("accessToken"),
        })
      );
      const response_2 = await axios.post(
        `${"http://localhost:2500"}/admin/join`,
        { userid, password, type, name },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        }
      );
      if (response_2.data.popdata.poptext) {
        swal(response_2.data.popdata.poptext, { icon: "error" });
      }
      swal("등록되었습니다!", {
        icon: "success",
      });
      setLoading(!loading);
    }
  };
  const navigation = useNavigate();
  const handleNavigate_Pay_Man = (no) => {
    navigation("/pay/management", { state: { no: no } });
  };
  const getAdminList = async (offset) => {
    try {
      await axios
        .post(
          `${"http://localhost:2500"}/admin/list`,
          { offset, word: search },
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
          }
        )
        .then((res) => {
          console.log("res데이터", res.data.data.cnt);
          setAdminList(res.data.data);
          setCount(res.data.data.cnt);
        });
    } catch (error) {
      const response = await axios.get(
        `${"http://localhost:2500"}/admin/refresh`,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        }
      );
      const newAct = response.data.data.Authorization;
      localStorage.setItem("accessToken", newAct);
      dispatch(
        userSlice.actions.updateAccessToken({
          Authorization: localStorage.getItem("accessToken"),
        })
      );
      await axios
        .post(
          `${"http://localhost:2500"}/admin/list`,
          { offset, word: search },
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
          }
        )
        .then((res) => {
          setAdminList(res.data.data);
          setCount(res.data.data.cnt);
        });
    }
  };

  useEffect(() => {
    getAdminList((page - 1) * ITEMSPERPAGE);
  }, [page, loading]);
  console.log("adminList", count);
  return (
    <Layout
      children={
        <>
          <HomeContainer>
            <HorizontalContainer>
              <text
                style={{
                  fontSize: "30px",
                  fontFamily: "NanumBarunGothic",
                  fontWeight: 600,
                }}
              >
                관리자 관리
              </text>
              <CurrentPlaceContainer>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <text
                    style={{
                      color: "#888",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    홈 &nbsp;&nbsp;
                  </text>
                  <img
                    src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
                    style={{ width: "19px", height: "19px" }}
                  />
                  <text
                    style={{
                      color: "#888",
                      fontSize: "14px",
                      fontFamily: "NanumBarunGothic",
                      fontWeight: 400,
                    }}
                  >
                    &nbsp;&nbsp;시스템 관리&nbsp;&nbsp;
                  </text>
                  <img
                    src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
                    style={{ Width: "19px", height: "19px" }}
                  />
                  <text
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    &nbsp;&nbsp;관리자 관리
                  </text>
                </div>
              </CurrentPlaceContainer>
            </HorizontalContainer>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "38px 60px 60px 60px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "30px",
                  }}
                >
                  <b>관리자 등록</b>
                  <CustomButton
                    title={"저장하기"}
                    onAdmin={() => {
                      InsertAdmin(
                        adminId,
                        adminPassword,
                        selectedOption,
                        adminName
                      );
                    }}
                  />
                </div>
                <hr style={{ border: "0.5px solid #E6E7EB" }} />
              </div>
              <hr />
              <div>
                <text style={{ marginRight: "37px" }}>권한</text>
                <Select value={selectedOption} onChange={handleSelect}>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div style={{ marginTop: "20px" }}>
                <b style={{ marginRight: "20px" }}>관리자명</b>
                <TextInput
                  type="text"
                  placeholder="관리자명"
                  value={adminName}
                  onChange={handleAdminName}
                />
                <b>ID</b>
                <TextInput
                  type="text"
                  placeholder="아이디"
                  value={adminId}
                  onChange={handleAdminId}
                />
                <b>비밀번호</b>
                <TextInput
                  type="password"
                  placeholder="비밀번호"
                  value={adminPassword}
                  onChange={handleAdminPassword}
                />
              </div>
            </div>

            <div style={{ padding: "30px 60px 30px 60px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  총<b style={{ color: "#FF7D3B" }}> {count}</b>명
                </div>
              </div>
              <hr
                style={{
                  border: "0.5px solid #E6E7EB",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              />
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }}>번호</th>
                      <th style={{ width: "19%" }}>관리자명</th>
                      <th style={{ width: "19%" }}>관리자ID</th>
                      <th style={{ width: "19%" }}>권한</th>
                      <th style={{ width: "19%" }}>최종 로그인</th>
                      <th style={{ width: "19%" }}>등록일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminList.data &&
                      adminList.data.map((k, n) => (
                        <tr key={k.id}>
                          <td style={{ width: "5%" }}>{n}</td>
                          <td style={{ width: "19%" }}>{k.name}</td>
                          <td style={{ width: "19%" }}>{k.id}</td>
                          <td style={{ width: "19%" }}>
                            {k.type === 100 && "총관리자"}
                            {k.type === 0 && "일반 관리자"}
                          </td>
                          <td style={{ width: "19%" }}>{k.logindate}</td>
                          <td style={{ width: "19%" }}>{k.regdate}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </TableContainer>
              <Pagenation
                page={page}
                itemsPerPage={10}
                number={count} // 총 아이템 갯수
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
  display: flex;
  flex-direction: column;
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
  padding: 30px 60px 30px 60px;
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
  align-items: center;
  justify-content: center;
`;
const TableContainer = styled.div`
  font-family: "NanumBarunGothicOTF";
  font-size: 16px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto 50px;
  grid-gap: 10px;
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
  }

  th {
    background-color: #f2f2f2;
    height: 28px;
    font-weight: 400;
  }
  grid-column: 1 / span 6;
`;
const Select = styled.select`
  margin: 10px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #eee; /* 아래쪽 테두리만 적용 */
  padding: 0.5rem;
  height: 34px;
  width: 360px;
  cursor: pointer;
`;
const TextInput = styled.input`
  margin: 10px;
  width: 23%;
  height: 48px;
  padding: 0 10px;
  background: #ffffff;
  border: 1px solid #e9eaee;
  margin-right: 20px;
`;
