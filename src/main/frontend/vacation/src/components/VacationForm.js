import React , { useState, useEffect } from 'react';

/**
 * 휴가 신청 양식 컴퍼넌트입니다.
 * @param vacationDate
 * @param setFormData 저장된 입력값을 담은 변수
 */
const VacationForm = () => {
  const [formData, setFormData] = useState({
      vacationType: '',
      startDay: '',
      endDay: '',
      startTime: '09:00', // 기본값 : 오전 9시부터
      endTime: '18:00',   // 기본값 : 오후 6시까지
      currentTime: '',
      reason: '',
      vacFile: ''
    }
  );

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = e => {
    e.preventDefault()
    alert(JSON.stringify(formData, null, 2))

    axios.post('http://localhost:8484/api/vacation')
    .then(response => setMessage(response.setFormData))
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
              <select name="vacationType" value={formData.vacationType} onChange={handleChange}>
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
            <input type="date" name="startDay" required 
              value={formData.startDay} onChange={handleChange}/> ~
            <input type="date" name="endDay" required 
              value={formData.endDay} onChange={handleChange}/>
          </td>
      </tr>
      <tr>
        <td>휴가 시작 / 종료시간
          {/* 15분 단위로만 입력이 가능합니다. */}
          <input type="time" 
              name="startTime" 
              value={formData.startTime} 
              min="09:00" 
              max="18:00" 
              step="900" 
              onChange={handleChange}
              /> ~
              {/* 종료시간 */}
          <input type="time" 
              name="endTime" 
              value={formData.endTime} 
              min="09:00" 
              max="18:00" 
              step="900" 
              onChange={handleChange}
              />
        </td>
      </tr>
        <td>
            첨부 파일 : <input type="file" value={formData.vacFile} onChange={handleChange}/>
        </td>
      <tr>
      </tr>
        <td colSpan='3'>
          (비고)사유 : <textarea name="reason"
            placeholder="휴가 사유를 입력하세요." value={formData.reason} 
            onChange={handleChange}></textarea>
        </td>
      </table>
      <input type="submit" value="신청완료" />
    </form>
  );
};

export default VacationForm;