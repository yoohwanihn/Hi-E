import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router";
import ToggleButton from "../components/ToggleButton_Notice";
import axios from "axios";
import Pagenation from "../components/Pagenation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import swal from "sweetalert";
import userSlice from "../slice/user";

//const ITEMSPERPAGE = 10;
export default function Notice() {
  const [isActive, setIsActive] = useState(false);
  const [noticeList, setNoticeList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accesstoken = useSelector((state) => state.user.accesstoken);

  const handleCheck = (e, id) => {
    const newChecked = { ...isChecked }; // 현재 isChecked 객체 복사
    newChecked[id] = e.target.checked;
    setIsChecked(newChecked);
  };

  const handleCheckAll = (e) => {
    const newChecked = {};
    noticeList.forEach((item) => {
      newChecked[item.boardno] = e.target.checked;
    });
    setIsChecked(newChecked); // 복사한 isChecked 객체를 업데이트
  };

  useEffect(() => {
    getNoticeList();
  }, [loading]);

  const getNoticeList = async (offset) => {
    try {
      await axios
        .get(
          `${"http://localhost:8484"}/admin/events/list`,

          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
          }
        )

        .then((res) => {
          console.log("res.data,data", res.data.notice);
          setNoticeList(res.data.notice);
          setCount(res.data.cnt.cnt);
        });
      console.log(noticeList);
    } catch (error) {
      const response = await axios.get(
        `${"http://localhost:8484"}/admin/refresh`,
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
      console.log("newACT", newAct);
      localStorage.setItem("accessToken", newAct);
      dispatch(
        userSlice.actions.updateAccessToken({
          Authorization: localStorage.getItem("accessToken"),
        })
      );
      await axios
        .get(
          `${"http://localhost:8484"}/admin/events/list`,

          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
          }
        )
        .then((res) => {
          setNoticeList(res.data.notice);
          setCount(res.data.cnt.cnt);
        });
    }
  };
  const handlePageChange = (page) => {
    setPage(page);
  };
  const handleDelete = async () => {
    const checkedPostNos = [];
    Object.keys(isChecked).forEach((key) => {
      if (isChecked[key]) {
        const item = noticeList.find((item) => item.boardno === Number(key));
        checkedPostNos.push(item.boardno);
      }
    });
    console.log("checkedPostNos", checkedPostNos);

    swal({
      title: "정말 삭제하시겠습니까?",
      text: "삭제된 게시물은 복구할 수 없습니다!",
      icon: "warning",
      buttons: ["취소", "삭제"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios
            .post(
              `${"http://localhost:8484"}/admin/events/delete`,
              { noticeno: checkedPostNos },
              {
                headers: {
                  Authorization: localStorage.getItem("accessToken"),
                },
                withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
              }
            )
            .then((response) => {
              swal("삭제되었습니다!", {
                icon: "success",
              });
              setNoticeList((prevItemList) =>
                prevItemList.filter(
                  (item) => !checkedPostNos.includes(item.boardno)
                )
              );
              setIsChecked({});
            });
        } catch (error) {
          const response = await axios.get(
            `${"http://localhost:8484"}/admin/refresh`,
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
          const response_2 = await axios
            .post(
              `${"http://localhost:8484"}/admin/events/delete`,
              { noticeno: checkedPostNos },
              {
                headers: {
                  Authorization: localStorage.getItem("accessToken"),
                },
                withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
              }
            )
            .then((response) => {
              swal("삭제되었습니다!", {
                icon: "success",
              });
              setNoticeList((prevItemList) => ({
                ...prevItemList,
                data: prevItemList.filter(
                  (item) => !checkedPostNos.includes(item.boardno)
                ),
              }));
              setIsChecked({});
            })
            .catch((err) => {
              if (response_2.data.popdata.poptext) {
                swal(response.data.popdata.poptext, { icon: "error" });
              }
            });
        }
      } else {
        swal("취소되었습니다.");
      }
    });
  };
  console.log("noteicelisetfsdklfsjlfksjdkf", noticeList);
  return (
    <Layout>
      <HomeContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flex: 1,
            padding: "30px 60px 30px 60px",
          }}
        >
          <text
            style={{
              fontSize: "30px",
              fontWeight: 600,
            }}
          >
            경조사
          </text>
          <div style={{ display: "flex" }}>
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
                style={{ Width: "19px", height: "19px" }}
              />
              <text>&nbsp;&nbsp;경조사</text>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "38px 60px 60px 60px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <div>
              총 <b style={{ color: "#FF7D3B" }}>{count}</b>건
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CustomButton
                title={"삭제하기"}
                color={"#FF4D43"}
                onClick={handleDelete}
              ></CustomButton>
              <CustomButton
                title={"등록하기"}
                onNavigate={() => {
                  navigate("write");
                }}
              ></CustomButton>
            </div>
          </div>
          <div style={{ marginBottom: "40px" }}>
            <hr style={{ border: "1px solid #E9EAEE" }} />
          </div>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>
                    <input type="checkbox" onChange={handleCheckAll} />
                  </th>
                  <th>번호</th>
                  <th>내용</th>
                  <th>작성자</th>
                  <th>날짜</th>
                  <th>주소</th>
                </tr>
              </thead>
              <tbody>
                {noticeList &&
                  noticeList.map((item, idx) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={isChecked[item.boardno]}
                          onChange={(e) => handleCheck(e, item.boardno)}
                        />
                      </td>
                      <td>{idx + 1}</td>

                      <td
                        onClick={() =>
                          navigate("write", {
                            state: {
                              title: item.title,
                              content: item.context,
                              noticeno: item.boardno,
                              isEdit: true,
                            },
                          })
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {item.title}
                      </td>
                      <td>{new Date(item.time * 1000).toLocaleString()}</td>
                      <td>
                        <ToggleButton
                          isActive={Boolean(item.show)}
                          noticeNo={item.boardno}
                          onClick={() => {
                            setLoading(!loading);
                          }}
                          key={item.boardno}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Pagenation
              page={page}
              itemsPerPage={10}
              number={count}
              handlePageChange={handlePageChange}
            />
          </TableContainer>
        </div>
        <br />
      </HomeContainer>
    </Layout>
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
    grid-template-rows: repeat(1, 1fr);
  }
`;
const TableContainer = styled.div`
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto 50px;
  grid-gap: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
