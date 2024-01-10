// import React from "react";
// import Modal from "react-modal";
// import { decode } from "html-entities";

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
//     height: "901.5px",
//     width: "300px",
//     maxWidth: "90%",
//     maxHeight: "90%",
//     overflowY: "scroll",
//     overflowX: "hidden", // 가로 스크롤이 발생하지 않도록 함
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
//     wordBreak: "break-word", // 긴 글자를 단어 중간에서도 자동으로 줄 바꿈되도록 함
//   },
// };

// const PreviewModal = ({ isOpen, closeModal, content, title }) => {
//   const decodedHtml = decode(content);
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
//       <div
//         style={{ ...customStyles.body }}
//         dangerouslySetInnerHTML={{ __html: decodedHtml }}
//       ></div>
//     </Modal>
//   );
// };

// export default PreviewModal;
