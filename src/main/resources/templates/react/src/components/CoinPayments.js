// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import CustomButton from "./CustomButton";

// export default function CoinPayments(props) {
//   const { reason, setReason } = props;
//   const { value, setValue } = props;

//   const canGoNext = reason && value;

//   const handleValueChange = (e) => {
//     const inputValue = e.target.value;
//     setValue(inputValue);
//   };
//   const handleReasonChange = (e) => {
//     const inputValue = e.target.value;
//     setReason(inputValue);
//   };

//   return (
//     <CoinContainer>
//       <CoinTitle style={{ marginBottom: "15px" }}>코인</CoinTitle>
//       <CoinBody
//         style={{ marginBottom: "19px" }}
//         placeholder="00"
//         type="text"
//         onChange={handleValueChange}
//         value={value}
//         canGoNext={canGoNext}
//       />
//       <CoinReason
//         placeholder={props.type ? "지급사유" : "회수사유"}
//         type="text"
//         onChange={handleReasonChange}
//         value={reason}
//       />
//       <CustomButton
//         title={props.type ? "지급" : "회수"}
//         color={canGoNext ? (props.type ? "#4674FE" : "#FF4D43") : "#E9EAEE"}
//         onCoin={props.onCoin}
//       />
//     </CoinContainer>
//   );
// }

// const CoinContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   border: 1px solid #e9eaee;
//   padding: 20px;
//   margin-right: 20px;
// `;
// const CoinTitle = styled.text`
//   font-size: 16px;
//   font-weight: 600;
//   line-height: 18px;
//   letter-spacing: 0em;
//   text-align: left;
// `;
// const CoinBody = styled.input`
//   font-size: 40px;
//   font-weight: 400px;
//   line-height: 46px;
//   letter-spacing: 0em;
//   border-width: 0;
//   width: 80px;
//   text-align: center;
//   &::placeholder {
//     font-size: 40px;
//     text-align: center;
//   }
//   color: ${(props) =>
//     props.canGoNext ? (props.type ? "#4674FE" : "#FF4D43") : "#E9EAEE"};
// `;
// const CoinReason = styled.input`
//   height: 32px;
//   width: 162px;
//   border: 1px solid #e9eaee;
//   border-radius: 0px;
//   margin-bottom: 20px;
//   text-align: center;
//   &::placeholder {
//     text-align: center;
//   }
// `;
