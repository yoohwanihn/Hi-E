// import React, { useEffect, useRef, useState } from "react";
// import { useHistory } from "react-router-dom";
// import Layout from "./Layout";
// import styled, { css, keyframes } from "styled-components";
// import axios from "axios";
// import CustomButton from "./CustomButton";
// import "../App.css";
// import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "../store";
// import userSlice from "../slice/user";
// export default function MemberInfoo(props) {
//   const [list, setList] = useState([]);
//   const [allow, setAllow] = useState([]);
//   const dispatch = useAppDispatch();
//   const accesstoken = useSelector((state) => state.user.accesstoken);

//   const List = async (no) => {
//     try {
//       await axios
//         .post(
//           `${"http://localhost:2500"}/admin/member/etc`,
//           { userno: no },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           setList(res.data.data.data);
//           setAllow(res.data.data.allow);
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
//           `${"http://localhost:2500"}/admin/member/etc`,
//           { userno: no },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           setList(res.data.data.data);
//           setAllow(res.data.data.allow);
//         });
//     }
//   };
//   useEffect(() => {
//     List(props.no);
//     return;
//   }, [accesstoken]);

//   const navigation = useNavigate();
//   const handleNavigate_member = (no) => {
//     navigation("/member/etc", { state: { no: no } });
//   };

//   return (
//     <>
//       <Container>
//         <ContainerItem>
//           <text>동의내역</text>
//           <TableContainer>
//             <Table>
//               <thead>
//                 <tbody>
//                   <React.Fragment>
//                     <tr>
//                       <td
//                         style={{ width: "230px", backgroundColor: "#E9EAEE" }}
//                       >
//                         서비스 이용약관
//                       </td>
//                       <td style={{ width: "159px" }}>동의</td>
//                     </tr>
//                     <tr>
//                       <td
//                         style={{ width: "230px", backgroundColor: "#E9EAEE" }}
//                       >
//                         개인정보 처리 방침
//                       </td>
//                       <td style={{ width: "159px" }}>동의</td>
//                     </tr>
//                     <tr>
//                       <td
//                         style={{ width: "230px", backgroundColor: "#E9EAEE" }}
//                       >
//                         민감정보 처리 방침
//                       </td>
//                       <td style={{ width: "159px" }}>동의</td>
//                     </tr>
//                     <tr>
//                       <td
//                         style={{ width: "230px", backgroundColor: "#E9EAEE" }}
//                       >
//                         마케팅 수신
//                       </td>
//                       {allow.length === 4 ? (
//                         <td style={{ width: "159px" }}>동의</td>
//                       ) : (
//                         <td style={{ width: "159px" }}>미동의</td>
//                       )}
//                     </tr>
//                   </React.Fragment>
//                 </tbody>
//               </thead>
//             </Table>
//           </TableContainer>
//         </ContainerItem>
//         <ContainerItem>
//           <text>접속 apk 정보</text>
//           <TableContainer>
//             <Table2>
//               <thead>
//                 <tbody>
//                   {list &&
//                     list.map((k, index) => (
//                       <React.Fragment>
//                         <tr>
//                           <td
//                             style={{
//                               width: "230px",
//                               backgroundColor: "#E9EAEE",
//                             }}
//                           >
//                             운영체제
//                           </td>
//                           <td style={{ width: "159px" }}>{k.os}</td>
//                         </tr>
//                         <tr>
//                           <td
//                             style={{
//                               width: "230px",
//                               backgroundColor: "#E9EAEE",
//                             }}
//                           >
//                             버전
//                           </td>
//                           <td style={{ width: "159px" }}>{k.ver}</td>
//                         </tr>
//                       </React.Fragment>
//                     ))}
//                 </tbody>
//               </thead>
//             </Table2>
//           </TableContainer>
//         </ContainerItem>
//         <ContainerItem>
//           <text>활동 정보</text>
//           <TableContainer>
//             <Table2>
//               <thead>
//                 <tbody>
//                   {list &&
//                     list.map((k, index) => (
//                       <React.Fragment>
//                         <tr>
//                           <td
//                             style={{
//                               width: "230px",
//                               backgroundColor: "#E9EAEE",
//                             }}
//                           >
//                             가입일
//                           </td>
//                           <td style={{ width: "187px" }}>{k.createdate}</td>
//                         </tr>
//                         <tr>
//                           <td
//                             style={{
//                               width: "230px",
//                               backgroundColor: "#E9EAEE",
//                             }}
//                           >
//                             최종로그인
//                           </td>
//                           <td style={{ width: "187px" }}>{k.createdate}</td>
//                         </tr>
//                       </React.Fragment>
//                     ))}
//                 </tbody>
//               </thead>
//             </Table2>
//           </TableContainer>
//         </ContainerItem>
//       </Container>
//     </>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex: 3;
//   padding: 30px 60px 30px 60px;
// `;

// const ContainerItem = styled.div`
//   display: flex;
//   background-color: #fff;
//   flex-direction: column; /* Add this to make the child elements stack vertically */
//   margin-right: 40px;
// `;

// const TableContainer = styled.div`
//   font-size: 16px;
//   display: flex;
//   margin-top: 30px;
// `;

// const Table = styled.table`
//   border-collapse: collapse;
//   width: 100%;

//   th,
//   td {
//     border: 1px solid #e9eaee;
//     padding: 8px;
//     text-align: center;
//     height: 28px;
//   }

//   th {
//     background-color: #f2f2f2;
//     height: 28px;
//     font-weight: 400;
//   }
//   grid-column: 1 / span 6;
// `;
// const Table2 = styled.table`
//   border-collapse: collapse;
//   width: 100%;

//   th,
//   td {
//     border: 1px solid #e9eaee;
//     padding: 8px;
//     text-align: center;
//     height: 28px;
//   }

//   th {
//     background-color: #f2f2f2;
//     height: 28px;
//     font-weight: 400;
//   }
//   grid-column: 1 / span 6;
// `;
