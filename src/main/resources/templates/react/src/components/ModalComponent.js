// import React from "react";
// import Modal from "react-modal";

// Modal.setAppElement("#root"); // 모달이 포함된 컴포넌트를 지정해야합니다.

// const customStyles = {
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     zIndex: "1000"
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
//     height: "600px", // 모달창 높이 조절
//     width: "800px", // 모달창 너비 조절
//     maxWidth: "90%",
//     maxHeight: "90%",
//     overflow: "hidden"
//   },
//   headerText: {

//   },

// };

// const ModalComponent = ({ isOpen, closeModal, image }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={closeModal}
//       style={customStyles}
//       contentLabel="Image Preview Modal"
//     >
//       <div className="modal-header" style={{margin:"50px"}}>
//         <div style={{display: "flex",justifyContent: "space-between"}}>
//         <h3 className="modal-title" style={{fontWeight:600,fontSize:"20px"}}>이미지 미리보기</h3>
//         <button className="modal-close" onClick={closeModal} style={{backgroundColor:"#fff",borderStyle:"none"}}>
//         <img src={process.env.PUBLIC_URL + '/ico_close_black.png'} style={{width:"26px",height:"26px"}}/>
//         </button>
//         </div>
//         <hr/>
//       </div>
//       <div className="modal-body" style={{ display: "flex", justifyContent: "center" }}>
//         {image &&<img src={image} alt="이미지" style={{height: "397px", width: "680px"}}/>}
//       </div>
//     </Modal>
//   );
// };

// export default ModalComponent;
