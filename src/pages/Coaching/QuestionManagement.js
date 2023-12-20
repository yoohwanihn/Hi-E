// import React, { useEffect, useState } from "react";
// import Layout from "../../components/Layout";
// import styled from "styled-components";
// import QuestionContainer from "../../components/Question/QuestionContainer";
// import Pagenation from "../../components/Pagenation";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "../../store";
// import swal from "sweetalert";
// import userSlice from "../../slice/user";

// const ITEMSPERPAGE = 10;
// export default function QuestionManagement() {
//   const [page, setPage] = useState(1);
//   const [questionList, setQuestionList] = useState([]);
//   const [count, setCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useAppDispatch();
//   const accesstoken = useSelector((state) => state.user.accesstoken);
//   const getQuestionList = async (offset) => {
//     try {
//       await axios
//         .post(
//           `${"http://localhost:2500"}/admin/qna/list`,
//           { offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )

//         .then((res) => {
//           setQuestionList(res.data.data.data);
//           setCount(res.data.data.cnt[0].cnt);
//         });
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
//       const newAct = response.data.data.accesstoken;
//       localStorage.setItem("accessToken", newAct);
//       dispatch(
//         userSlice.actions.updateAccessToken({
//           accesstoken: localStorage.getItem("accessToken"),
//         })
//       );
//       await axios
//         .post(
//           `${"http://localhost:2500"}/admin/qna/list`,
//           { offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )

//         .then((res) => {
//           setQuestionList(res.data.data.data);
//           setCount(res.data.data.cnt[0].cnt);
//         });
//     }
//   };
//   useEffect(() => {
//     getQuestionList((page - 1) * ITEMSPERPAGE);
//   }, [page, loading, accesstoken]);
//   const handlePageChange = (page) => {
//     setPage(page);
//   };
//   return (
//     <Layout>
//       <HomeContainer>
//         <HorizontalContainer>
//           <text style={{ fontSize: "30px", fontWeight: 600 }}>질문권 관리</text>
//           <CurrentPlaceContainer>
//             <div style={{ display: "flex", justifyContent: "center" }}>
//               <text style={{ color: "#888" }}>홈 &nbsp;&nbsp;</text>
//               <img
//                 src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
//                 style={{ width: "19px", height: "19px" }}
//               />
//               <text style={{ color: "#888" }}>
//                 &nbsp;&nbsp;코칭 및 질문권&nbsp;&nbsp;
//               </text>
//               <img
//                 src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
//                 style={{ Width: "19px", height: "19px" }}
//               />
//               <text>&nbsp;&nbsp;질문권 관리</text>
//             </div>
//           </CurrentPlaceContainer>
//         </HorizontalContainer>
//         <div style={{ padding: "50px 60px 30px 60px" }}>
//           <div>
//             총 <b style={{ color: "#FF7D3B" }}>{count}</b>건
//           </div>
//           <div style={{ marginTop: "30px" }}>
//             <hr style={{ border: "1px solid #E9EAEE" }} />
//           </div>
//           {questionList &&
//             questionList.map((item, idx) => (
//               <QuestionContainer
//                 key={item.qnano}
//                 qnano={item.qnano}
//                 title={item.title}
//                 state={item.state}
//                 userName={item.nick}
//                 writeDate={item.replydate}
//                 userDate={item.birth}
//                 text={item.content}
//                 answer={item.reply}
//                 setLoading={setLoading}
//                 loading={loading}
//               />
//             ))}
//           <Pagenation
//             page={page}
//             itemsPerPage={10}
//             number={count}
//             handlePageChange={handlePageChange}
//           />
//         </div>
//       </HomeContainer>
//     </Layout>
//   );
// }
// const HomeContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   grid-template-rows: repeat(1, 1fr);
//   grid-gap: 10px;

//   > * {
//     background-color: #fff;
//     padding: 20px;
//     box-sizing: border-box;
//   }

//   @media screen and (max-width: 768px) {
//     grid-template-columns: repeat(1, 1fr);
//     grid-template-rows: repeat(1, 1fr);
//   }
// `;
// const HorizontalContainer = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: space-between;
//   padding: 30px 60px 30px 60px;
// `;
// const CurrentPlaceContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;
// const TitleText = styled.text`
//   font-weight: 600;
// `;
