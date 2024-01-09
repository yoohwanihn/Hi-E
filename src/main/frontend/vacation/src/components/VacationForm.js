import React , { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * 휴가 신청 양식 컴퍼넌트입니다.
 * @param vacationDate
 * @param setFormData 저장된 입력값을 담은 변수
 */
const VacationForm = () => {
  const [vacationType, setVacationType] = useState('');
  const [holidayStart, setHolidayStart] = useState('');
  const [holidayEnd, setHolidayEnd] = useState('');
  const [reason, setReason] = useState('');

  const handleType = (event) => {
    event.preventDefault();
    setVacationType(event.target.value);
  };

  const handleHolidayStart = (event) => {
    event.preventDefault();
    setHolidayStart(event.target.value);
  };

  const handleHolidayEnd = (event) => {
    event.preventDefault();
    setHolidayEnd(event.target.value);
  };

  const handleReason = (event) => {
    event.preventDefault();
    setReason(event.target.value);
  };

  // const handleChange = e => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  const submitHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    alert(JSON.stringify(formData, null, 2));
    
    formData.append("vacationType", vacationType);
    formData.append("holidayStart", holidayStart);
    formData.append("holidayEnd", holidayEnd);
    formData.append("reason", reason);

    axios
      .post('http://localhost:8484/api/vacation', formData) 
      .then((res) => {
        console.log(res);
        if (res.data) {
            //success
            console.log("데이터 저장 성공");
        } else {
            //err
            console.log("데이터 저장 실패");
        }
      })
      .catch((err) => {
          //err
          alert("에러 발생 : "+ err);
     });
  }

  /**
   * 신청취소를 누르면 예 누를시 작성한 데이터가 reset
   */
  const handleReset = () => {
    window.confirm('신청을 취소하시겠습니까? 취소하시면 이전으로 돌아갑니다.')
  }

  return (
    <form className="vacationForm" onSubmit={submitHandler} method="post" action="/api/vacation">
      <input type="reset" value="신청취소" onClick={handleReset}/>
      <table>
        <tr>
          <td>
              휴가구분
              <select className="vacationType" onChange={handleType}>
                {/* <!-- -선택- 눌렀을 때 정보 안 넘어오는거 예외처리 --> */}
                <option value=""> —선택— </option>
                <option value="MonthlyLeave"> 월차 </option>
                <option value="HalfDay"> 반차 </option>
                <option value="AnnualLeave"> 연차 </option>
                <option value="FamilyLeave"> 경조휴가 </option>
                <option value="SickLeave"> 병가 </option>
                <option value="Other"> 기타 </option>
              </select>
            </td>
        </tr>
        <tr>
          <td>휴가 기간
            <input type="date" name="holidayStart" required onChange={handleHolidayStart}/> ~
            <input type="date" name="holidayEnd" required onChange={handleHolidayEnd}/>
          </td>
      </tr>
      <tr>
      </tr>
      <tr>
      </tr>
        <td colSpan='3'>
          (비고)사유 : <textarea name="reason"
            placeholder="휴가 사유를 입력하세요." 
            onChange={handleReason}></textarea>
        </td>
      </table>
      <input type="submit" value="신청완료" />
    </form>
  );
};

export default VacationForm;