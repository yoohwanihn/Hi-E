// import React, { useEffect, useRef, useState } from "react";
// import { useHistory } from "react-router-dom";
// import Layout from "./Layout";
// import styled, { css, keyframes } from "styled-components";
// import axios from "axios";
// import CustomButton from "./CustomButton";
// import "../App.css";
// import { useNavigate } from "react-router";
// import swal from "sweetalert";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "../store";
// import userSlice from "../slice/user";
// export default function MemberInfoo(props) {
//   const [list, setList] = useState([]);
//   const [risk, setRisk] = useState([]);
//   const [treat, setTreat] = useState([]);
//   const [diag, setDiag] = useState([]);
//   const [memo, setMemo] = useState([]);
//   const [userno, setUserno] = useState([]);
//   const [newMemo, setNewMemo] = useState("");
//   const dispatch = useAppDispatch();
//   const accesstoken = useSelector((state) => state.user.accesstoken);
//   const List = async (no) => {
//     try {
//       await axios
//         .post(
//           `${"http://localhost:2500"}/admin/member/info`,
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
//           setDiag(res.data.data.diagdata);
//           setRisk(res.data.data.riskdata);
//           setTreat(res.data.data.treatedata);
//           setMemo(res.data.data.memo[0].memo);
//           setUserno(res.data.data.data[0].userno);
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
//           `${"http://localhost:2500"}/admin/member/info`,
//           { userno: no },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true,
//           }
//         )
//         .then((res) => {
//           setList(res.data.data.data);
//           setDiag(res.data.data.diagdata);
//           setRisk(res.data.data.riskdata);
//           setTreat(res.data.data.treatedata);
//           setMemo(res.data.data.memo[0].memo);
//           setUserno(res.data.data.data[0].userno);
//         });
//     }
//   };
//   const handleMemo = async (newMemo, no) => {
//     try {
//       const response = await axios.post(
//         `${"http://localhost:2500"}/admin/member/memo`,
//         { memo: memo, userno: no, type: 0 },
//         {
//           headers: {
//             accesstoken: localStorage.getItem("accessToken"),
//           },
//           withCredentials: true,
//         }
//       );
//       setMemo(memo);
//       swal("저장되었습니다");
//     } catch (error) {
//       await axios.get(`${"http://localhost:2500"}/admin/refresh`, {
//         headers: {
//           accesstoken: localStorage.getItem("accessToken"),
//         },
//         withCredentials: true,
//       });
//       const newAct = response.data.data.accesstoken;
//       localStorage.setItem("accessToken", newAct);
//       dispatch(
//         userSlice.actions.updateAccessToken({
//           accesstoken: localStorage.getItem("accessToken"),
//         })
//       );
//       const response = await axios.post(
//         `${"http://localhost:2500"}/admin/member/memo`,
//         { memo: memo, userno: no, type: 0 },
//         {
//           headers: {
//             accesstoken: localStorage.getItem("accessToken"),
//           },
//           withCredentials: true,
//         }
//       );
//       setMemo(memo);
//       swal("저장되었습니다");
//     }
//   };

//   useEffect(() => {
//     List(props.no);
//     // handlememo(props.no)
//     return;
//   }, [props.no, accesstoken]);

//   const navigation = useNavigate();
//   const handleNavigate_member = (no) => {
//     navigation("/member/mychart", { state: { no: no } });
//   };

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           padding: "30px 60px 30px 60px",
//         }}
//       >
//         <text>임신 정보</text>
//         <div style={{ marginTop: "20px", marginBottom: "30px" }}>
//           <hr
//             style={{
//               border: "0.5px solid #E6E7EB",
//             }}
//           />
//         </div>
//         <TableContainer>
//           <Table>
//             <thead>
//               <tbody>
//                 {list &&
//                   list.map((k) => (
//                     <React.Fragment>
//                       <tr>
//                         {/* <div style={{flexDirection: 'row'}}> */}
//                         <td>이름</td> <td>{k.name}</td>
//                         {/* </div> */}
//                         {/* <div style={{flexDirection: 'row'}}> */}
//                         <td>닉네임</td> <td>{k.nickname}</td>
//                         {/* </div> */}
//                       </tr>
//                       <tr>
//                         {/* <div style={{flexDirection: 'row'}}> */}
//                         <td>임신 주수</td> <td>{k.met}</td>
//                         {/* </div> */}
//                         {/* <div style={{flexDirection: 'row'}}> */}
//                         <td>생년월일</td>{" "}
//                         <td>
//                           {k.userbirth} ({k.age}세)
//                         </td>
//                         {/* </div> */}
//                       </tr>
//                       <tr>
//                         {/* <div style={{flexDirection: 'row'}}> */}
//                         <td>출산예정일</td> <td>{k.babybirth}</td>
//                         {/* </div> */}
//                         {/* <div style={{flexDirection: 'row'}}> */}
//                         <td>태명</td> <td>{k.babyname}</td>
//                         {/* </div> */}
//                       </tr>
//                       <tr>
//                         {/* <div style={{flexDirection: 'row'}}> */}
//                         <td>병원명</td> <td>{k.hospital}</td>
//                         {/* </div> */}
//                         {/* <div style={{flexDirection: 'row'}}> */}
//                         <td>병원 전화번호</td> <td>{k.hospitalph}</td>
//                         {/* </div> */}
//                       </tr>
//                     </React.Fragment>
//                   ))}
//               </tbody>
//             </thead>
//           </Table>
//         </TableContainer>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           padding: "30px 60px 30px 60px",
//         }}
//       >
//         <text>고위험 임신 정보</text>
//         <div style={{ marginTop: "20px", marginBottom: "30px" }}>
//           <hr
//             style={{
//               border: "0.5px solid #E6E7EB",
//             }}
//           />
//         </div>
//         <TableContainer>
//           <Table2>
//             <thead>
//               <tbody>
//                 {diag &&
//                   diag.map((d, index) => (
//                     <React.Fragment>
//                       <tr>
//                         <td>산과력</td>
//                         <td>
//                           {risk[0].riskcount}-{risk[1].riskcount}-
//                           {risk[2].riskcount}-{risk[3].riskcount}
//                         </td>
//                         <td>난임 시술 이력</td>
//                         <td>
//                           {treat[0].treatcount}-{treat[1].treatcount}
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>진단명</td>
//                         <td>{d.diagnosis.join(",")}</td>
//                         <td></td>
//                         <td></td>
//                       </tr>
//                     </React.Fragment>
//                   ))}
//               </tbody>
//             </thead>
//           </Table2>
//         </TableContainer>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           padding: "30px 60px 30px 60px",
//         }}
//       >
//         <text>메모</text>
//         <div style={{ marginTop: "20px" }}>
//           <hr
//             style={{
//               border: "0.5px solid #E6E7EB",
//             }}
//           />
//         </div>

//         {!props.state && (
//           <>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <AnserBody
//                 placeholder={"메모를 입력하세요"}
//                 value={memo}
//                 onChange={(e) => setMemo(e.target.value)}
//               ></AnserBody>
//               <MemoButton onClick={() => handleMemo(memo, props.no)}>
//                 답변하기
//               </MemoButton>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// const HomeContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   grid-template-rows: repeat(1, 1fr);
//   grid-gap: 10px;
//   margin-top: 10px;
//   margin-left: 10px;

//   > * {
//     background-color: #fff;
//     border: 1px solid #ddd;
//     padding: 20px;
//     box-sizing: border-box;
//   }

//   @media screen and (max-width: 768px) {
//     grid-template-columns: repeat(1, 1fr);
//     grid-template-rows: repeat(2, 1fr);
//   }
// `;
// const HorizontalContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-content: center;
// `;
// const CurrentPlaceContainer = styled.div`
//   display: flex;
// `;
// const PastText = styled.div`
//   font-size: 14px;
//   color: #888888;
// `;
// const PastsText = styled.div`
//   font-size: 14px;
//   color: #888888;
// `;
// const MemoContainer = styled.div`
//   //font-family: "NanumBarunGothicOTF";
//   //display: grid;
//   line-height: 43px;
//   border-width: 1;
//   height: 104px;
//   width: 1405px;
//   left: 0px;
//   top: 0px;
//   border-radius: 44px;
//   justify-content: center;
//   align-content: center;
//   flex-direction: row;
// `;
// const TableContainer = styled.div`
//   font-family: "NanumBarunGothicOTF";
//   font-size: 16px;
//   display: flex;
// `;

// const Table = styled.table`
//   border-collapse: collapse;
//   width: 100%;

//   tr {
//     display: grid;
//     grid-template-columns: 160px 4fr 160px 4fr 4fr 4fr;
//     flex-direction: row;
//   }

//   th,
//   td {
//     border: 1px solid #e9eaee;
//     padding-left: 20px;
//     padding-top: 15px;
//     padding-bottom: 15px;
//     text-align: left;
//   }

//   th {
//     background-color: #f2f2f2;
//     text-align: center;
//     grid-column: 1 / span 6;
//   }

//   td:nth-child(1),
//   td:nth-child(3) {
//     background-color: #f2f2f2;
//   }
// `;
// const Table2 = styled.table`
//   border-collapse: collapse;
//   width: 100%;

//   tr {
//     display: grid;
//     grid-template-columns: 160px 4fr 160px 4fr;
//     flex-direction: row;
//   }

//   th,
//   td {
//     border: 1px solid #e9eaee;
//     padding: 8px;
//     text-align: left;
//   }

//   th {
//     background-color: #f2f2f2;
//     text-align: center;
//     grid-column: 1 / span 6;
//   }

//   td:nth-child(1),
//   td:nth-child(3) {
//     background-color: #f2f2f2;
//   }

//   td:nth-child(3):last-of-type {
//     grid-row-end: span 2;
//   }

//   td:nth-child(3):last-of-type {
//     background-color: #ffff;
//   }
// `;
// const ButtonContainer = styled.button`
//   margin-right: 50px;
//   padding: 5px 10px;
//   box-shadow: none;
//   background: rgba(255, 255, 255, 0.0001);
//   /* border: 1px solid #4674FE;
//   border-radius: 20px;
//   cursor: pointer; */
//   height: 34px;
//   width: 101px;
//   /* border-radius: 20px; */
//   margin-top: 20px;
//   flex-direction: row;
//   border: none;
//   padding-top: 13px;
// `;
// const DateText = styled.text`
//   font-size: 16px;
//   font-weight: 400;
//   line-height: 18px;
// `;
// const BodyText = styled.div`
//   margin-left: 24px;
//   margin-top: 15px;
//   margin-bottom: 15px;
// `;
// const BodyContainer = styled.div`
//   display: block;
//   width: 100%;
//   height: 98px;
//   background: #f5f5f5;
//   overflow: auto;
// `;
// const AnserBody = styled.textarea`
//   margin-top: 10px;
//   display: flex;
//   width: 100%;
//   height: 77px;
//   background: #ffffff;
//   border: 1px solid #e9eaee;
//   resize: vertical; /* optional - allows user to resize vertically */
// `;
// const Text = styled.div`
//   font-size: 30px;
//   font-family: NanumBarunGothicOTF;
//   font-weight: 600;
// `;
// const Tab = styled.div`
//   font-size: 30px;
//   font-family: NanumBarunGothicOTF;
//   font-weight: 600;
//   margin-left: 10px;
//   box-sizing: border-box;
//   //position: absolute;
//   right: 67.41%;
//   left: 0%;
//   bottom: 0%;
//   background-color: #ffff;
//   border: 2px solid #000000;
//   border-radius: 4px;
//   width: 174.06px;
//   height: 54.43px;
//   text-align: center;
//   align-content: center;
// `;
// const TabContainer = styled.div`
//   font-family: "NanumBarunGothicOTF";
//   font-size: 16px;
//   display: flex;
//   margin-top: 10px;
//   margin-left: 10px;
//   align-content: center;
// `;
// const MemoButton = styled.button`
//   margin-left: 10px;
//   padding: 5px 10px;
//   box-shadow: none;
//   background: rgba(255, 255, 255, 0.0001);
//   border: 1px solid #4674fe;
//   color: #4674fe;
//   font-size: 16px;
//   border-radius: 20px;
//   cursor: pointer;
//   height: 34px;
//   width: 101px;
//   border-radius: 20px;
// `;
