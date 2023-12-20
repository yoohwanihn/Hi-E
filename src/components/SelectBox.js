// import React from "react";
// import styled from "styled-components";

// const Select = styled.select`
//   margin-left: 5px;
//   border: 1px solid #4674FE;
//   border-radius: 10px;
//   color: #4674FE;
//   font-weight: bold;
//   padding: 0.5rem;
//   height: 34px;
//   width: 101px;
//   border-radius: 20px;
//   cursor: pointer;
// `;

// function SelectBox(props) {
//   const options = [
//     { value: null, label: "-- Select an option --" },
//     { value: 0, label: "미답변" },
//     { value: 1, label: "답변완료" },
//     { value: 2, label: "답변보류" },
//     { value: 3, label: "답변거부" },
//   ];

//   const { selectedOption, setSelectedOption } = props;

//   const handleSelect = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   return (
//     <div>
//       <Select value={selectedOption} onChange={handleSelect}>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </Select>
//     </div>
//   );
// }

// export default SelectBox;
