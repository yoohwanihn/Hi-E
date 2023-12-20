// import { useRef, useState } from "react";
// import styled from "styled-components";
// import ModalComponent from "./ModalComponent";
// function ImageSelector(props) {
//   const { image, setImage } = props;
//   const { data, setData } = props;
//   const [ModalOpen, setModalOpen] = useState(false);
//   const inputRef = useRef();
//   const handleChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // 파일이 있는 경우에만 처리
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         setImage(reader.result);
//         setData(file);
//       };
//     }
//   };
//   const closeModal = () => {
//     setModalOpen(false);
//   };
//   return (
//     <div>
//       {ModalOpen && (
//         <ModalComponent
//           closeModal={closeModal}
//           title="이미지 미리보기"
//           image={image}
//           isOpen={ModalOpen}
//         />
//       )}
//       <input
//         type="file"
//         onChange={handleChange}
//         hidden
//         ref={inputRef}
//         accept="image/jpeg, image/png,image/jpg,"
//       />
//       {image && (
//         <ImageWrapper>
//           <Image src={image} alt="selected" />
//           <SubButtonsWrapper>
//             <SubButton
//               onClick={() => {
//                 setModalOpen(!ModalOpen);
//               }}
//             >
//               <img
//                 src={process.env.PUBLIC_URL + "/ico_search_white.png"}
//                 style={{ width: "26px", height: "26px" }}
//               />
//             </SubButton>
//             <SubButton
//               onClick={() => {
//                 inputRef.current.click();
//               }}
//             >
//               <img
//                 src={process.env.PUBLIC_URL + "/ico_ pencil_white.png"}
//                 style={{ width: "26px", height: "26px" }}
//               />
//             </SubButton>
//             <SubButton
//               onClick={() => {
//                 setImage(null);
//               }}
//             >
//               <img
//                 src={process.env.PUBLIC_URL + "/ico_close_white.png"}
//                 style={{ width: "26px", height: "26px" }}
//               />
//             </SubButton>
//           </SubButtonsWrapper>
//           {/* <SubButton onClick={() => inputRef.current.click()}>Change</SubButton> */}
//         </ImageWrapper>
//       )}
//       {/* {image && <Image src={image} alt="selected" />} */}
//       {!image && (
//         <InputButton
//           style={{ width: props.width, height: props.height }}
//           onClick={() => {
//             inputRef.current.click();
//           }}
//         >
//           <img src={process.env.PUBLIC_URL + "/ico_plus_gray.png"}></img>
//         </InputButton>
//       )}
//     </div>
//   );
// }

// export default ImageSelector;
// const InputButton = styled.button`
//   background: #ffffff;
//   border: 1px dashed #c4c4c4;
//   height: 145px;
//   width: 288px;
//   left: 441px;
//   top: 433px;
//   border-radius: 0px;
//   cursor: pointer;
// `;
// const Image = styled.img`
//   height: 145px;
//   width: 288px;
//   position: relative;
//   z-index: 1;
// `;
// const SubButtonsWrapper = styled.div`
//   position: absolute;
//   display: flex;
//   justify-content: flex-end;
//   background-color: rgba(0, 0, 0, 0.6);
//   width: 100%;
//   bottom: 0;
//   left: 0;
//   z-index: 2;
// `;

// const SubButton = styled.button`
//   padding: 8px 12px;
//   font-size: 14px;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.01);
//   border: none;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: rgba(0, 0, 0, 0.8);
//   }
// `;

// const ImageWrapper = styled.div`
//   height: 145px;
//   width: 288px;
//   position: relative;

//   &:hover ${SubButton} {
//     opacity: 1;
//   }
// `;
