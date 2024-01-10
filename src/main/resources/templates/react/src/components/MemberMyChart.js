// import React, { useEffect, useRef, useState } from "react";
// import Layout from "../components/Layout";
// import styled, { css, keyframes } from "styled-components";
// import axios from "axios";
// import Pagenation from "../components/Pagenation";
// import "../App.css";
// import { useNavigate } from "react-router";
// import swal from "sweetalert";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "../store";
// import userSlice from "../slice/user";

// export default function MemberInfoo(props) {
//   const [weight, setWeight] = useState([]);
//   const [symptom, setSymptom] = useState([]);
//   const [sugar, setSugar] = useState([]);
//   const [press, setPress] = useState([]);
//   const [img, setImg] = useState([]);
//   const [move, setMove] = useState([]);
//   const [pain, setPain] = useState([]);
//   const [page, setPage] = useState(1);
//   const [presspage, setPresspage] = useState(1);
//   const [sugarpage, setSugarpage] = useState(1);
//   const [sympage, setSympage] = useState(1);
//   const [imgpage, setImgpage] = useState(1);
//   const [movepage, setMovepage] = useState(1);
//   const [painpage, setPainpage] = useState(1);
//   const itemsPerPage = 10;
//   const [number, setNumber] = useState(0);
//   const [pressnumber, setPressnumber] = useState(0);
//   const [sugarnumber, setSugarnumber] = useState(0);
//   const [symnumber, setSymnumber] = useState(0);
//   const [imgnumber, setImgnumber] = useState(0);
//   const [movenumber, setMovenumber] = useState(0);
//   const [painnumber, setPainnumber] = useState(0);
//   const [count, setCount] = useState(0);
//   const [presscount, setPresscount] = useState(0);
//   const [ShowModal, setShowModal] = useState(false);
//   const [modalInfo, setmodalInfo] = useState("");
//   const modalRef = useRef(null);
//   const [isChecked, setIsChecked] = useState({});
//   const [isImageLoaded, setIsImageLoaded] = useState(false);
//   const [moveData, setMoveData] = useState([]);
//   const [grothData, setGrothData] = useState([]);
//   const [isImgChecked, setIsImgChecked] = useState({});
//   const dispatch = useAppDispatch();

//   const [loading, setLoading] = useState(false);
//   const topRef = useRef(null);
//   const accesstoken = useSelector((state) => state.user.accesstoken);

//   const handlePageChange = (page) => {
//     setPage(page);
//   };
//   const handlePressPageChange = (presspage) => {
//     setPresspage(presspage);
//   };
//   const handleSugarPageChange = (sugarpage) => {
//     setSugarpage(sugarpage);
//   };
//   const handleSymPageChange = (sympage) => {
//     setSympage(sympage);
//   };
//   const handleImgPageChange = (imgpage) => {
//     setImgpage(imgpage);
//   };
//   const handleMovePageChange = (movepage) => {
//     setMovepage(movepage);
//   };
//   const handlePainPageChange = (painpage) => {
//     setPainpage(painpage);
//   };
//   const handleVodgeLoad = () => {
//     setIsImageLoaded(true);
//   };

//   const Weight = async (no, offset) => {
//     try {
//       await axios
//         .post(
//           `${"http://localhost:2500"}/admin/member/weight`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           setWeight(res.data.data.date);
//           setNumber(res.data.data.cnt);
//           setCount((page - 1) * itemsPerPage + 1);
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
//           `${"http://localhost:2500"}/admin/member/weight`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           setWeight(res.data.data.date);
//           setNumber(res.data.data.cnt);
//           setCount((page - 1) * itemsPerPage + 1);
//         });
//     }
//   };
//   const symptomList = async (no, offset) => {
//     try {
//       await axios
//         .post(
//           `${"http://localhost:2500"}/admin/member/symptom`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           setSymptom(res.data.data.data);
//           setSymnumber(res.data.data.cnt);
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
//           `${"http://localhost:2500"}/admin/member/symptom`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           setSymptom(res.data.data.data);
//           setSymnumber(res.data.data.cnt);
//         });
//     }
//   };
//   const bloodsugarList = async (no, offset) => {
//     try {
//       await axios
//         .post(
//           `${"http://localhost:2500"}/admin/member/bloodsugar`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           setSugar(res.data.data.data);
//           setSugarnumber(res.data.data.cnt);
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
//           `${"http://localhost:2500"}/admin/member/bloodsugar`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           setSugar(res.data.data.data);
//           setSugarnumber(res.data.data.cnt);
//         });
//     }
//   };
//   const bloodpressList = async (no, offset) => {
//     try {
//       await axios
//         .post(
//           `${"http://localhost:2500"}/admin/member/bloodpress`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           // setWeight(res.data.data.data);
//           setPress(res.data.data.data);
//           setPressnumber(res.data.data.cnt);
//           setPresscount((presspage - 1) * itemsPerPage + 1);
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
//           `${"http://localhost:2500"}/admin/member/bloodpress`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           // setWeight(res.data.data.data);
//           setPress(res.data.data.data);
//           setPressnumber(res.data.data.cnt);
//           setPresscount((presspage - 1) * itemsPerPage + 1);
//         });
//     }
//   };
//   const imgList = async (no, offset) => {
//     try {
//       await axios
//         .post(
//           `${"http://localhost:2500"}/admin/member/babygroth`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           // setWeight(res.data.data.data);
//           setImg(res.data.data.data);
//           setGrothData(res.data.data.data);
//           setImgnumber(res.data.data.cnt);
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
//           `${"http://localhost:2500"}/admin/member/babygroth`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           // setWeight(res.data.data.data);
//           setImg(res.data.data.data);
//           setGrothData(res.data.data.data);
//           setImgnumber(res.data.data.cnt);
//         });
//     }
//   };
//   const moveList = async (no, offset) => {
//     try {
//       await axios
//         .post(
//           `${"http://localhost:2500"}/admin/member/babymove`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           // setWeight(res.data.data.data);
//           setMove(res.data.data.data);
//           setMoveData(res.data.data.data);
//           setMovenumber(res.data.data.cnt);
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
//           `${"http://localhost:2500"}/admin/member/babymove`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           // setWeight(res.data.data.data);
//           setMove(res.data.data.data);
//           setMoveData(res.data.data.data);
//           setMovenumber(res.data.data.cnt);
//         });
//     }
//   };
//   const painList = async (no, offset) => {
//     try {
//       await axios
//         .post(
//           `${"http://localhost:2500"}/admin/member/paintime`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           // setWeight(res.data.data.data);
//           setPain(res.data.data.data);
//           setPainnumber(res.data.data.cnt);
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
//           `${"http://localhost:2500"}/admin/member/paintime`,
//           { userno: no, offset },
//           {
//             headers: {
//               accesstoken: localStorage.getItem("accessToken"),
//             },
//             withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//           }
//         )
//         .then((res) => {
//           // setWeight(res.data.data.data);
//           setPain(res.data.data.data);
//           setPainnumber(res.data.data.cnt);
//         });
//     }
//   };

//   const handleCheck = (e, id) => {
//     const newChecked = { ...isChecked }; // 현재 isChecked 객체 복사
//     newChecked[id] = e.target.checked;
//     setIsChecked(newChecked);
//   };

//   const handleImgCheck = (e, id) => {
//     const newChecked = { ...isImgChecked }; // 현재 isChecked 객체 복사
//     newChecked[id] = e.target.checked;
//     setIsImgChecked(newChecked);
//   };

//   const handleMoveCheckAll = (e) => {
//     const newChecked = {};
//     moveList.forEach((k) => {
//       newChecked[k.vodno] = e.target.checked;
//     });
//     setIsChecked(newChecked); // 복사한 isChecked 객체를 업데이트
//   };
//   const handleCheckAll = (e) => {
//     const newChecked = {};
//     moveData.forEach((k) => {
//       newChecked[k.vodno] = e.target.checked;
//     });
//     setIsChecked(newChecked); // 복사한 isChecked 객체를 업데이트
//   };
//   const handleCheckAllImg = (e) => {
//     const newChecked = {};
//     grothData.forEach((k) => {
//       newChecked[k.imgno] = e.target.checked;
//     });
//     setIsImgChecked(newChecked); // 복사한 isChecked 객체를 업데이트
//   };
//   const getModalInfo = async (vodno) => {
//     const response = await axios.get(
//       `${"http://localhost:2005"}/admin/member/babymove/vod/${vodno}`,
//       {
//         headers: {
//           accesstoken: accesstoken,
//         },
//         withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//       }
//     );
//     setmodalInfo(response.data.data.data[0].vod);
//     return response.data;
//   };

//   const closeModal = (e) => {
//     if (modalRef.current === e.target) {
//       setShowModal(false);
//     }
//   };
//   const openModal = async (vodno) => {
//     const data = getModalInfo(vodno);
//     setmodalInfo(data.data);
//     setShowModal(true);
//     topRef.current.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     const offset = (page - 1) * itemsPerPage;
//     Weight(props.no, offset);
//   }, [page, accesstoken]);

//   useEffect(() => {
//     const offset = (presspage - 1) * itemsPerPage;
//     bloodpressList(props.no, offset);
//   }, [presspage, accesstoken]);
//   useEffect(() => {
//     const offset = (sympage - 1) * itemsPerPage;
//     symptomList(props.no, offset);
//   }, [sympage, accesstoken]);
//   useEffect(() => {
//     const offset = (sugarpage - 1) * itemsPerPage;
//     bloodsugarList(props.no, offset);
//   }, [sugarpage, accesstoken]);
//   useEffect(() => {
//     const offset = (imgpage - 1) * itemsPerPage;
//     imgList(props.no, offset);
//   }, [imgpage, loading, accesstoken]);
//   useEffect(() => {
//     const offset = (movepage - 1) * itemsPerPage;
//     moveList(props.no, offset);
//   }, [movepage, loading, accesstoken]);
//   useEffect(() => {
//     const offset = (painpage - 1) * itemsPerPage;
//     painList(props.no, offset);
//   }, [painpage, accesstoken]);

//   // useEffect(() => {
//   //   const offset = (page - 1) * itemsPerPage;
//   //   Weight(offset);
//   // }, [page]);

//   const handleDelete = () => {
//     const checkedMoveNos = [];
//     Object.keys(isChecked).forEach((key) => {
//       if (isChecked[key]) {
//         const move = moveData.find((move) => move.vodno === Number(key));
//         checkedMoveNos.push(move.vodno);
//       }
//     });
//     swal({
//       title: "정말 삭제하시겠습니까?",
//       text: "삭제된 게시물은 복구할 수 없습니다!",
//       icon: "warning",
//       buttons: ["취소", "삭제"],
//       dangerMode: true,
//     }).then((willDelete) => {
//       if (willDelete) {
//         axios
//           .post(
//             `${"http://localhost:2005"}/admin/member/babymove/delete`,
//             { vodno: checkedMoveNos },
//             {
//               headers: {
//                 accesstoken: localStorage.getItem("accessToken"),
//               },
//               withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//             }
//           )
//           .then((response) => {
//             setLoading(!loading);
//             swal("삭제되었습니다!", {
//               icon: "success",
//             });
//             setMoveData((prevMoveList) => ({
//               ...prevMoveList,
//               data: prevMoveList.filter(
//                 (move) => !checkedMoveNos.includes(move.vodno)
//               ),
//             }));
//             setIsChecked({});
//           })
//           .catch((err) => {
//             swal("삭제에 실패했습니다.", {
//               icon: "error",
//             });
//           });
//       } else {
//         swal("취소되었습니다.");
//       }
//     });
//   };
//   const handleDeleteImg = () => {
//     const checkedgrothNos = [];
//     Object.keys(isImgChecked).forEach((key) => {
//       if (isImgChecked[key]) {
//         const img = grothData.find((img) => img.imgno === Number(key));
//         checkedgrothNos.push(img.imgno);
//       }
//     });
//     swal({
//       title: "정말 삭제하시겠습니까?",
//       text: "삭제된 게시물은 복구할 수 없습니다!",
//       icon: "warning",
//       buttons: ["취소", "삭제"],
//       dangerMode: true,
//     }).then((willDelete) => {
//       if (willDelete) {
//         axios
//           .post(
//             `${"http://localhost:2005"}/admin/member/babygroth/delete`,
//             { imgno: checkedgrothNos },
//             {
//               headers: {
//                 accesstoken: localStorage.getItem("accessToken"),
//               },
//               withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
//             }
//           )
//           .then((response) => {
//             setLoading(!loading);
//             swal("삭제되었습니다!", {
//               icon: "success",
//             });
//             setGrothData((prevGrothList) => ({
//               ...prevGrothList,
//               data: prevGrothList.filter(
//                 (img) => !checkedgrothNos.includes(img.imgno)
//               ),
//             }));
//             setIsImgChecked({});
//           })
//           .catch((err) => {
//             swal("삭제에 실패했습니다.", {
//               icon: "error",
//             });
//           });
//       } else {
//         swal("취소되었습니다.");
//       }
//     });
//   };

//   const navigation = useNavigate();
//   const handleNavigate_member = (no) => {
//     navigation("/member/etc", { state: { no: no } });
//   };
//   return (
//     <>
//       <Container ref={topRef}>
//         <ContainerSub>
//           <ContainerItem>
//             <div>
//               <div>
//                 <text style={{ fontFamily: "NanumBarunGothicOTF" }}>체중</text>
//               </div>
//               <hr />

//               <Table>
//                 <thead>
//                   <tr>
//                     <th>기록일</th>
//                     <th>채중</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {weight &&
//                     weight.map((k, n) => (
//                       <tr key={k.id}>
//                         <td>{k.date.split(" ")[0].replace(/-/g, "-")}</td>
//                         <td>{k.weight / 10}</td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </Table>
//               <Pagenation
//                 page={page}
//                 itemsPerPage={itemsPerPage}
//                 number={number} // 총 아이템 갯수
//                 handlePageChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
//               />
//             </div>
//           </ContainerItem>

//           <ContainerItem>
//             <div>
//               <div>
//                 <text style={{ fontFamily: "NanumBarunGothicOTF" }}>혈압</text>
//               </div>
//               <hr />
//               <Table>
//                 <thead>
//                   <tr>
//                     <th>기록일</th>
//                     <th>혈압</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {press &&
//                     press.map((k, n) => (
//                       <tr key={k.id}>
//                         <td>{k.date.split(" ")[0].replace(/-/g, "-")}</td>
//                         <td>
//                           {k.high} / {k.low}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </Table>
//               <Pagenation
//                 page={presspage}
//                 itemsPerPage={itemsPerPage}
//                 number={pressnumber} // 총 아이템 갯수
//                 handlePageChange={handlePressPageChange} // 페이지 변경을 핸들링하는 함수
//               />
//             </div>
//           </ContainerItem>
//         </ContainerSub>
//         <ContainerSub>
//           <ContainerItem>
//             <div>
//               <text style={{ fontFamily: "NanumBarunGothicOTF" }}>혈당</text>
//               <br />
//               <hr />
//               <Table>
//                 <thead>
//                   <tr>
//                     <th>기록일</th>
//                     <th>혈당</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sugar &&
//                     sugar.map((k, n) => (
//                       <tr key={k.id}>
//                         <td>{k.date.split(" ")[0].replace(/-/g, "-")}</td>
//                         <td>
//                           {k.time0}/{k.time1}/{k.time2}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </Table>
//               <Pagenation
//                 page={sugarpage}
//                 itemsPerPage={itemsPerPage}
//                 number={sugarnumber} // 총 아이템 갯수
//                 handlePageChange={handleSugarPageChange} // 페이지 변경을 핸들링하는 함수
//               />
//             </div>
//           </ContainerItem>
//           <ContainerItem>
//             <div>
//               <text style={{ fontFamily: "NanumBarunGothicOTF" }}>증상</text>

//               <br />
//               <hr />
//               <Table>
//                 <thead>
//                   <tr>
//                     <th>기록일</th>
//                     <th>증상</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {symptom &&
//                     symptom.map((k, n) => (
//                       <tr key={k.id}>
//                         <td>{k.date.split(" ")[0].replace(/-/g, "-")}</td>
//                         <td>{k.symptom.join(",")}</td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </Table>
//               <Pagenation
//                 page={sympage}
//                 itemsPerPage={itemsPerPage}
//                 number={symnumber} // 총 아이템 갯수
//                 handlePageChange={handleSymPageChange} // 페이지 변경을 핸들링하는 함수
//               />
//             </div>
//           </ContainerItem>
//         </ContainerSub>
//       </Container>
//       <div style={{ padding: "30px 60px 30px 60px" }}>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <text>정밀 초음파</text>
//           <div>
//             <ColorButton
//               style={{
//                 background: "#fff",
//                 color: "#FF4D43",
//                 borderColor: "#FF4D43",
//               }}
//               onClick={handleDeleteImg}
//             >
//               <text>선택삭제</text>
//             </ColorButton>
//           </div>
//         </div>
//         <div>
//           <hr
//             style={{
//               border: "0.5px solid #E6E7EB",
//               marginBottom: "30px",
//               marginTop: "30px",
//             }}
//           />
//           <Table>
//             <thead>
//               <tr>
//                 <th style={{ width: "50px" }}>
//                   <input type="checkbox" onChange={handleCheckAllImg} />
//                 </th>
//                 <th>초음파 사진</th>
//                 <th>기록일</th>
//                 <th>임신주수</th>
//                 <th>아기체중</th>
//                 <th>아기체중 순위</th>
//               </tr>
//             </thead>
//             <tbody>
//               {img &&
//                 img.map((k, n) => (
//                   <tr key={k.id}>
//                     <td style={{ width: "50px" }}>
//                       <input
//                         type="checkbox"
//                         checked={isImgChecked[k.imgno]}
//                         onChange={(e) => handleImgCheck(e, k.imgno)}
//                       />
//                     </td>
//                     <td>
//                       <img src={`https://media.dplanit.co.kr${k.img}`} />
//                     </td>
//                     <td>{k.date.split(" ")[0].replace(/-/g, "-")}</td>
//                     <td>
//                       {k.week}주차{k.day}일
//                     </td>
//                     <td>{k.weight}</td>
//                     <td>{k.rank_num}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </Table>
//           <Pagenation
//             page={imgpage}
//             itemsPerPage={itemsPerPage}
//             number={imgnumber} // 총 아이템 갯수
//             handlePageChange={handleImgPageChange} // 페이지 변경을 핸들링하는 함수
//           />
//         </div>
//       </div>

//       <div style={{ padding: "30px 60px 30px 60px" }}>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <text>태동 관리</text>
//           <div>
//             <ColorButton
//               style={{
//                 background: "#fff",
//                 color: "#FF4D43",
//                 borderColor: "#FF4D43",
//               }}
//               onClick={handleDelete}
//             >
//               <text>선택삭제</text>
//             </ColorButton>
//           </div>
//         </div>
//         <hr
//           style={{
//             border: "0.5px solid #E6E7EB",
//             marginBottom: "30px",
//             marginTop: "30px",
//           }}
//         />

//         <Table>
//           <thead>
//             <tr>
//               <th style={{ width: "50px" }}>
//                 <input type="checkbox" onChange={handleCheckAll} />
//               </th>
//               <th>태동 영상</th>
//               <th>기록일</th>
//               <th>임신주수</th>
//             </tr>
//           </thead>
//           <tbody>
//             {move &&
//               move.map((k, n) => (
//                 <tr key={k.id}>
//                   <td style={{ width: "50px" }}>
//                     <input
//                       type="checkbox"
//                       checked={isChecked[k.vodno]}
//                       onChange={(e) => handleCheck(e, k.vodno)}
//                     />
//                   </td>
//                   <td
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       openModal(k.vodno);
//                     }}
//                     onLoad={handleVodgeLoad}
//                   >
//                     <img src={`https://media.dplanit.co.kr${k.thum}`} />
//                   </td>
//                   <td>{k.date.split(" ")[0].replace(/-/g, "-")}</td>
//                   <td>
//                     {k.week}주차{k.day}일
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </Table>
//         <Pagenation
//           page={movepage}
//           itemsPerPage={itemsPerPage}
//           number={movenumber} // 총 아이템 갯수
//           handlePageChange={handleMovePageChange} // 페이지 변경을 핸들링하는 함수
//         />
//       </div>
//       <div>
//         {ShowModal && (
//           <Modal onClick={closeModal} ref={modalRef}>
//             <ModalContent>
//               <ModalClose onClick={() => setShowModal(false)}>×</ModalClose>
//               <ModalTitle>영상</ModalTitle>
//               <ModalBody>
//                 <div>
//                   <div>
//                     <video
//                       src={`https://media.dplanit.co.kr` + modalInfo}
//                       autoPlay
//                     />
//                   </div>
//                 </div>
//               </ModalBody>
//               <ModalFooter></ModalFooter>
//             </ModalContent>
//           </Modal>
//         )}
//       </div>
//       <div style={{ padding: "30px 60px 30px 60px" }}>
//         <text>진통 관리 </text>
//         <hr
//           style={{
//             border: "0.5px solid #E6E7EB",
//             marginBottom: "30px",
//             marginTop: "30px",
//           }}
//         />
//         <Table>
//           <thead>
//             <tr>
//               <th>기록일</th>
//               <th>진통 주기</th>
//               <th>진통 강도</th>
//               <th>진통 시간</th>
//               <th>휴식 시간</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pain &&
//               pain.map((k, n) => (
//                 <tr key={k.id}>
//                   <td>{k.date.split(" ")[0].replace(/-/g, "-")}</td>
//                   <td>
//                     {k.totaltime.split(":")[1] +
//                       "분 " +
//                       k.totaltime.split(":")[2] +
//                       "초"}
//                   </td>
//                   <td>{k.painstrong}</td>
//                   <td>
//                     {k.paintime.split(":")[1] +
//                       "분 " +
//                       k.paintime.split(":")[2] +
//                       "초"}
//                   </td>
//                   <td>
//                     {k.breaktime.split(":")[1] +
//                       "분 " +
//                       k.breaktime.split(":")[2] +
//                       "초"}
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </Table>
//         <Pagenation
//           page={painpage}
//           itemsPerPage={itemsPerPage}
//           number={painnumber} // 총 아이템 갯수
//           handlePageChange={handlePainPageChange} // 페이지 변경을 핸들링하는 함수
//         />
//       </div>
//     </>
//   );
// }

// const Table = styled.table`
//   border-collapse: collapse;
//   width: 100%;
//   height: 48px;

//   th,
//   td {
//     border: 1px solid #e9eaee;
//     padding: 8px;
//     text-align: center;
//     width: 402px;
//   }

//   th {
//     background-color: #f2f2f2;
//   }
//   grid-column: 1 / span 6;
// `;

// const Modal = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalContent = styled.div`
//   position: relative;
//   background-color: #fff;
//   width: 1300px;
//   padding: 20px;
//   border-radius: 5px;
// `;

// const ModalClose = styled.span`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   font-size: 20px;
//   cursor: pointer;
// `;

// const ModalTitle = styled.h3`
//   margin-top: 0px;
// `;

// const ModalBody = styled.div`
//   margin-bottom: 20px;
//   overflow-y: scroll; /* 세로 스크롤바 표시 */
//   max-height: 100%; /* 모달 창의 최대 높이 */
// `;

// const ModalFooter = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `;
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 2;
//   background-color: #f5f5f5;
//   border-color: #f5f5f5;
// `;
// const ContainerSub = styled.div`
//   display: flex;
//   margin-bottom: 10px;
//   flex: 1;
//   background-color: #f5f5f5;
//   margin-left: -10px;
//   margin-top: -10px;
// `;
// const ContainerItem = styled.div`
//   display: flex;
//   background-color: #fff;
//   margin: 10px;
//   flex: 1;
//   padding: 30px 60px 30px 60px;
//   margin-right: 1px;
//   height: 550px;
// `;
// const ColorButton = styled.button`
//   padding: 5px 10px;
//   box-shadow: none;
//   background: rgba(255, 255, 255, 0.0001);
//   border: 1px solid #4674fe;
//   border-radius: 20px;
//   cursor: pointer;
//   height: 34px;
//   width: 101px;
//   border-radius: 20px;
// `;
// const CurrentPlaceContainer = styled.div`
//   display: flex;
//   margin-top: 0.5px;
// `;
// const HorizontalContainer = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: space-between;
//   padding: 30px 60px 30px 60px;
// `;
