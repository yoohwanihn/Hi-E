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
import DaumPostcode from "react-daum-postcode"; //주소 검색 api
import AddressModal from "../components/AddressModal";

export default function NoticeWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const existTitle = location.state?.title;
  const existContent = location.state?.content;
  const isEdit = location.state?.isEdit;
  const noticeno = location.state?.noticeno;
  console.log("noticeno", location);
  const [title, setTitle] = useState(existTitle || "");
  const [content, setContent] = useState(existContent || "");
  const editorRef = React.createRef();
  const [date, setDate] = useState(""); //날짜입력 usestate
  const [Address, setAddress] = useState(""); //주소?
  const [OpenPostcode, setOpenPostCode] = useState(false); //주소검색 창
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const accesstoken = useSelector((state) => state.user.accesstoken);
  useEffect(() => {});
  const handleChange = () => {
    const newContent = editorRef.current?.getInstance().getMarkdown();
    setContent(newContent);
  };

  //주소검색을 위한
  const handleSelectAddress = (data) => {
    setAddress(data.address);
    setIsModalOpen(false);
  };

  const InsertEvents = async (title, context, date, Address) => {
    try {
      await axios.post(
        `${"http://localhost:8484"}/admin/events/insert`,
        { title, context, date, Address }
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
      navigate("/post");
    } catch (error) {
      console.log("1221231132");
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
      //   `${"http://localhost:8484"}/admin/events/insert`,
      //   { title, context, date, Address },
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
  const UpdateEvents = async (title, context, date, Address, noticeno) => {
    try {
      await axios.post(
        `${"http://localhost:8484"}/admin/events/update`,
        { title, context, date, Address, noticeno },
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
        `${"http://localhost:8484"}/admin/events/update`,
        { title, context, date, Address, noticeno },
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
      navigate("/events");
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
                  경조사 등록
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
                    &nbsp;&nbsp;경조사&nbsp;&nbsp;
                  </text>
                  <img
                    src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
                    style={{ Width: "19px", height: "19px" }}
                  />
                  <text style={{ fontSize: "14px", fontWeight: 400 }}>
                    &nbsp;&nbsp;경조사 등록
                  </text>
                </div>
              </HorizontalContainer>
            </HeaderCon>
            <TitleCon>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <text style={{ fontWeight: 600, fontsize: 18 }}>내용</text>
                <CustomButton
                  title={"등록하기"}
                  onNotice={() => {
                    if (isEdit) {
                      UpdateEvents(title, content, date, Address, noticeno);
                    } else {
                      InsertEvents(title, content, date, Address);
                    }
                  }}
                />
              </div>
              <div style={{ marginBottom: "40px", marginTop: "30px" }}>
                <hr style={{ border: "1px solid #E9EAEE" }} />
              </div>
              <Textinput text={title} setText={setTitle} />
            </TitleCon>

            <WriteCon>
              <text style={{ fontWeight: 600, fontsize: 18 }}>작성자</text>
              <div style={{ marginBottom: "40px", marginTop: "30px" }}>
                <hr style={{ border: "1px solid #E9EAEE" }} />
              </div>
              <textarea
                style={{
                  width: "18%",
                  height: "40px",
                  resize: "none",
                  marginTop: 10,
                  //overflow: "scroll",
                }}
                placeholder="작성자"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </WriteCon>
            <WriteCon>
              <text style={{ fontWeight: 600, fontSize: 18 }}>날짜</text>
              <div style={{ marginBottom: "40px", marginTop: "30px" }}>
                <hr style={{ border: "1px solid #E9EAEE" }} />
              </div>
              <input
                type="date"
                style={{
                  width: "18%",
                  height: "40px",
                  marginTop: 10,
                  border: "1px solid #E9EAEE",
                  borderRadius: "4px",
                  padding: "8px 12px",
                }}
                value={date} // content 대신 date 상태 변수 사용
                onChange={(e) => setDate(e.target.value)} // 날짜 상태 변수를 업데이트
              />
            </WriteCon>

            <WriteCon>
              <text style={{ fontWeight: 600, fontsize: 18 }}>주소</text>
              <div style={{ marginBottom: "40px", marginTop: "30px" }}>
                <hr style={{ border: "1px solid #E9EAEE" }} />
              </div>
              <div>
                <textarea
                  style={{
                    width: "40%",
                    height: "40px",
                    border: "1px solid #E9EAEE",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    resize: "none",
                    marginTop: 10,
                    boxSizing: "border-box",
                    //overflow: "scroll",
                  }}
                  placeholder="주소"
                  value={Address}
                  onClick={() => setIsModalOpen(true)}
                  readOnly
                />
              </div>
            </WriteCon>
            {isModalOpen && (
              <AddressModal onClose={() => setIsModalOpen(false)}>
                <DaumPostcode
                  onComplete={handleSelectAddress}
                  autoClose={false}
                />
              </AddressModal>
            )}
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
  flex: 0.14;
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
