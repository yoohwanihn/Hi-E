import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import styled, { css, keyframes } from "styled-components";
import axios from "axios";
import Textinput from "../components/Textinput";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import CustomButton from "../components/CustomButton";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import userSlice from "../slice/user";
import { useLocation, useNavigate } from "react-router";
export default function MemberWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const existTitle = location.state?.title;
  const existContent = location.state?.content;
  const existemployeeNumber = location.state?.employeeNumber;
  const existname = location.state?.name;
  const existaddress = location.state?.address;
  const existnationalID = location.state?.nationalID;
  const existpositionTitle = location.state?.positionTitle;
  const existdepartment = location.state?.department;
  const existphoneNumber = location.state?.phoneNumber;

  const isEdit = location.state?.isEdit;
  const noticeno = location.state?.noticeno;
  console.log("noticeno", location);
  const [name, setname] = useState("");
  const [employeeNumber, setemployeeNumber] = useState("");
  const [nationalID, setnationalID] = useState("");
  const [positionTitle, setpositionTitle] = useState("");
  const [address, setaddress] = useState("");
  const [OpenPostcode, setOpenPostCode] = useState(false); //주소검색 창
  const [department, setdepartment] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  //const [date, setDate] = useState(""); //날짜입력 usestate
  const [joining, setjoining] = useState(""); //날짜입력 usestate
  const [leaving, setleaving] = useState(""); //날짜입력 usestate
  const editorRef = React.createRef();
  const dispatch = useAppDispatch();
  const accesstoken = useSelector((state) => state.user.accesstoken);
  useEffect(() => {});
  const handleChange = () => {
    const newContent = editorRef.current?.getInstance().getMarkdown();
    //    setContent(newContent);
  };
  // console.log(title);
  const InsertMember = async (employeeNumber, context) => {
    try {
      await axios.post(
        `${"http://localhost:8484"}/admin/member/insert`,
        { employeeNumber, context }
        // {
        //   headers: {
        //     Authorization: localStorage.getItem("accessToken"),
        //   },
        //   withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        // }
      );
      swal("등록되었습니다!", {
        icon: "success",
      });
      navigate("/member/info");
    } catch (error) {
      console.log("5454");
      // const response = await axios.get(
      //   `${"http://localhost:8484"}/admin/refresh`,
      //   {
      //     headers: {
      //       Authorization: localStorage.getItem("accessToken"),
      //     },
      //     withCredentials: true,
      //   }
      // );

      // const newAct = response.data.data.accesstoken;
      // localStorage.setItem("accessToken", newAct);
      // dispatch(
      //   userSlice.actions.updateAccessToken({
      //     Authorization: localStorage.getItem("accessToken"),
      //   })
      // );
      // const response_2 = await axios.post(
      //   `${"http://localhost:8484"}/admin/notice/insert`,
      //   { title, content },
      //   {
      //     headers: {
      //       Authorization: localStorage.getItem("accessToken"),
      //     },
      //     withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
      //   }
      // );
      // if (response_2.data.popdata.poptext) {
      //   swal("등록에 실패했습니다.", {
      //     icon: "error",
      //   });
      // }
      // swal("등록되었습니다!", {
      //   icon: "success",
      // });
    }
  };
  const UpdateMember = async (title, context, noticeno) => {
    try {
      await axios.post(
        `${"http://localhost:8484"}/admin/member/update`,
        { title, context, noticeno }, //body
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        }
      );
      swal(isEdit ? "수정되었습니다!" : "등록되었습니다!", {
        icon: "success",
      });
      navigate("/notice");
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
      const response_2 = await axios.post(
        `${"http://localhost:8484"}/admin/notice/update`,
        {
          employeeNumber,
          name,
          address,
          nationalID,
          positionTitle,
          department,
          phoneNumber,
          joining,
          leaving,
          noticeno,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        }
      );
      if (response_2.data.popdata.poptext) {
        swal("등록에 실패했습니다.", {
          icon: "error",
        });
      }
      swal(isEdit ? "수정되었습니다!" : "등록되었습니다!", {
        icon: "success",
      });
      navigate("/notice");
    }
  };
  return (
    <Layout
      children={
        <>
          <VarticalContainer>
            <HeaderCon>
              <HorizontalContainer>
                <text
                  style={{
                    fontSize: "30px",
                    fontWeight: 600,
                  }}
                >
                  인사카드 등록
                </text>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <text
                    style={{ color: "#888", fontSize: "14px", fontWeight: 400 }}
                  >
                    홈 &nbsp;&nbsp;
                  </text>
                  <img
                    src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
                    style={{ width: "19px", height: "19px" }}
                  />
                  <text
                    style={{ color: "#888", fontSize: "14px", fontWeight: 400 }}
                  >
                    &nbsp;&nbsp;인사&nbsp;&nbsp;
                  </text>
                  <img
                    src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
                    style={{ Width: "19px", height: "19px" }}
                  />
                  <text style={{ fontSize: "14px", fontWeight: 400 }}>
                    &nbsp;&nbsp;인사카드 등록
                  </text>
                </div>
              </HorizontalContainer>
            </HeaderCon>
            <TitleCon>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <text style={{ fontWeight: 600, fontsize: 18 }}>제목</text>
                <CustomButton
                  title={"등록하기"}
                  onNotice={() => {
                    if (isEdit) {
                      UpdateMember(
                        employeeNumber,
                        name,
                        address,
                        nationalID,
                        positionTitle,
                        department,
                        phoneNumber,
                        joining,
                        leaving,
                        noticeno,
                        noticeno
                      );
                    } else {
                      InsertMember(
                        employeeNumber,
                        name,
                        address,
                        nationalID,
                        positionTitle,
                        department,
                        phoneNumber,
                        joining,
                        leaving
                      );
                    }
                  }}
                />
              </div>
              <div style={{ marginBottom: "40px", marginTop: "30px" }}>
                <hr style={{ border: "1px solid #E9EAEE" }} />
              </div>
              <text style={{ fontWeight: 600, fontsize: 18 }}>사원번호</text>
              <Textinput text={employeeNumber} setText={setemployeeNumber} />
              <hr style={{ border: "1px solid #E9EAEE" }} />
              <text style={{ fontWeight: 600, fontsize: 18 }}>성명</text>
              <Textinput text={name} setText={setname} />
              <hr style={{ border: "1px solid #E9EAEE" }} />
              <text style={{ fontWeight: 600, fontsize: 18 }}>주소</text>
              <Textinput text={address} setText={setaddress} />
              <hr style={{ border: "1px solid #E9EAEE" }} />
              <text style={{ fontWeight: 600, fontsize: 18 }}>주민번호</text>
              <Textinput text={nationalID} setText={setnationalID} />
              <hr style={{ border: "1px solid #E9EAEE" }} />
              <text style={{ fontWeight: 600, fontsize: 18 }}>직위/직급</text>
              <Textinput text={positionTitle} setText={setpositionTitle} />
              <hr style={{ border: "1px solid #E9EAEE" }} />
              <text style={{ fontWeight: 600, fontsize: 18 }}>부서</text>
              <Textinput text={department} setText={setdepartment} />
              <hr style={{ border: "1px solid #E9EAEE" }} />
              <text style={{ fontWeight: 600, fontsize: 18 }}>전화</text>
              <Textinput text={phoneNumber} setText={setphoneNumber} />
              <hr style={{ border: "1px solid #E9EAEE" }} />
              <text style={{ fontWeight: 600, fontsize: 18 }}>입사일자</text>
              <div style={{ marginBottom: "40px", marginTop: "30px" }}>
                <hr style={{ border: "1px solid #E9EAEE" }} />
              </div>
              <input
                type="date"
                style={{
                  width: "18%",
                  height: "40px",
                  border: "1px solid #E9EAEE",
                  borderRadius: "4px",
                }}
                //value={date} // content 대신 date 상태 변수 사용
                onChange={(e) => setjoining(e.target.value)} // 날짜 상태 변수를 업데이트
              />
              <hr style={{ border: "1px solid #E9EAEE" }} />
              <text style={{ fontWeight: 600, fontsize: 18 }}>퇴사일자</text>
              <div style={{ marginBottom: "40px", marginTop: "30px" }}>
                <hr style={{ border: "1px solid #E9EAEE" }} />
              </div>
              <input
                type="date"
                style={{
                  width: "18%",
                  height: "40px",
                  border: "1px solid #E9EAEE",
                  borderRadius: "4px",
                }}
                // value={date} // content 대신 date 상태 변수 사용
                onChange={(e) => setleaving(e.target.value)} // 날짜 상태 변수를 업데이트
              />
              <hr style={{ border: "1px solid #E9EAEE" }} />
            </TitleCon>
          </VarticalContainer>
        </>
      }
    ></Layout>
  );
}
const VarticalContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const HorizontalContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 30px 60px 30px 60px;
`;
const HeaderCon = styled.div`
  flex: 0.1;
  display: flex;
  background-color: #fff;
  box-sizing: border-box;
`;

const TitleCon = styled.div`
  flex: 0.14;
  background-color: #fff;
  margin-top: 10px;
  padding: 30px 60px 30px 60px;
  box-sizing: border-box;
`;
const WriteCon = styled.div`
  flex: 0.36;
  background-color: #fff;
  margin-top: 10px;
  padding: 30px 60px 30px 60px;
  box-sizing: border-box;
`;

const MainTitle = styled.text`
  font-family: "NanumBarunGothicOTF";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 34px;
  display: flex;
  align-items: center;
`;
