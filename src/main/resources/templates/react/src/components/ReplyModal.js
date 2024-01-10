// import React, { useState } from "react";
// import Modal from "react-modal";
// import Textinput from "./Textinput";
// import CustomButton from "./CustomButton";
// import SelectBox from "./SelectBox";
// import styled from "styled-components";
// import axios from "axios";
// import swal from "sweetalert";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "../store";
// import userSlice from "../slice/user";
// Modal.setAppElement("#root");

// const customStyles = {
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     zIndex: "1000",
//   },
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     padding: "0",
//     borderRadius: "5px",
//     height: "900px",
//     width: "360px",
//     maxWidth: "90%",
//     maxHeight: "90%",
//     overflowY: "scroll",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: "50px",
//     fontWeight: 600,
//     fontSize: "20px",
//     padding: "0 20px",
//   },
//   closeButton: {
//     border: "none",
//     background: "none",
//     cursor: "pointer",
//   },
//   closeButtonImage: {
//     width: "26px",
//     height: "26px",
//   },
//   body: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     margin: 60,
//     border: "1px solid #E9EAEE",
//   },
// };

// const ReplyModal = ({
//   isOpen,
//   closeModal,
//   title,
//   questionno,
//   setLoading,
//   loading,
//   setShowModal,
// }) => {
//   const [answerValue, setAnswerValue] = useState("");
//   const [newState, setNewState] = useState(null);
//   const accesstoken = useSelector((state) => state.user.accesstoken);
//   const dispatch = useAppDispatch();

//   const insertAnswer = async (qnano, reply, state) => {
//     try {
//       await axios.post(
//         `${"http://localhost:2500"}/admin/qna/reply`,
//         { qnano, reply, state },
//         {
//           headers: {
//             accesstoken: accesstoken,
//           },
//           withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//         }
//       );
//       swal("등록되었습니다!", { icon: "success" });
//       setAnswerValue("");
//       setNewState(null);
//       setLoading(!loading);
//       setShowModal(false);
//     } catch (error) {
//       const response = await axios.get(
//         `${"http://localhost:2500"}/admin/refresh`,
//         {
//           headers: {
//             accesstoken: localStorage.getItem("accessToken"),
//           },
//           withCredentials: true,
//         }
//       );
//       if (response.data.popdata.poptext) {
//         swal(response.data.popdata.poptext, { icon: "error" });
//         return;
//       }
//       const newAct = response.data.data.accesstoken;
//       localStorage.setItem("accessToken", newAct);
//       dispatch(
//         userSlice.actions.updateAccessToken({
//           accesstoken: localStorage.getItem("accessToken"),
//         })
//       );
//       const response_2 = await axios.post(
//         `${
//           process.env.NODE_ENV == "development"
//             ? "http://localhost:2500"
//             : "https://dplanitp.dplawnit.co.kr"
//         }/admin/qna/reply`,
//         { qnano, reply, state },
//         {
//           headers: {
//             accesstoken: localStorage.getItem("accessToken"),
//           },
//           withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//         }
//       );
//       if (response_2.data.popdata.poptext) {
//         swal(response_2.data.popdata.poptext, { icon: "error" });
//         return;
//       }
//       swal("등록되었습니다!", { icon: "success" });
//       setAnswerValue("");
//       setNewState(null);
//       setLoading(!loading);
//       setShowModal(false);
//     }
//   };
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={closeModal}
//       style={customStyles}
//       contentLabel="Modal"
//     >
//       <div style={customStyles.header}>
//         <div></div>
//         <h3>{title}</h3>
//         <button style={customStyles.closeButton} onClick={closeModal}>
//           <img
//             style={customStyles.closeButtonImage}
//             src={process.env.PUBLIC_URL + "/ico_close_black.png"}
//             alt="close"
//           />
//         </button>
//       </div>
//       <div style={customStyles.body}>
//         <AnswerBody
//           placeholder="답변"
//           value={answerValue}
//           onChange={(e) => setAnswerValue(e.target.value)}
//         />
//         <CustomButton
//           title={"답변 등록"}
//           onAnser={() => {
//             insertAnswer(questionno, answerValue, newState);
//           }}
//         />
//         <SelectBox
//           key={questionno}
//           selectedOption={newState}
//           setSelectedOption={setNewState}
//         />
//       </div>
//     </Modal>
//   );
// };

// export default ReplyModal;
// const AnswerBody = styled.textarea`
//   margin-top: 10px;
//   display: flex;
//   width: 90%;
//   height: 77px;
//   background: #ffffff;
//   border: 1px solid #e9eaee;
//   resize: vertical; /* optional - allows user to resize vertically */
// `;
