import React , { useState, useEffect } from 'react';

const VacationForm = () => {
    const [formData, setFormData] = useState({
        vacationtype: '',
        startday: '',
        endday: '',
        startTime: '09:00', // 기본값
        endTime: '18:00', // 기본값
        currentTime: '',
        reason: '',
      });
    const [vacationDate, setVacationDate] = useState(0);

    // 폼 제출을 처리하는 함수
    const submitHandler = (e) => {
        e.preventDefault();

        alert(JSON.stringify(formData, null, 2));
    };
    
    // input 변경을 처리하는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        calculateVacationDate();
      };


    // 휴가 기간에 따라 신청일수를 계산하는 함수
    const calculateVacationDate = () => {
        const { startday, endday } = formData;
        if (startday && endday) {
            const startDate = new Date(startday);
            const endDate = new Date(endday);
            const timeDiff = endDate - startDate;
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            setVacationDate(daysDiff);
        } else {
            setVacationDate(0);
        }
    };
    
    useEffect(() => {
        // 컴포넌트가 마운트될 때와 formData의 변경 시마다 현재 시간 업데이트
        const intervalId = setInterval(() => {
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, '0');
          const minutes = now.getMinutes().toString().padStart(2, '0');
          const currentTime = `${hours}:${minutes}`;
          setFormData((prevData) => ({
            ...prevData,
            currentTime,
          }));
        }, 1000);
    
        // 컴포넌트가 언마운트될 때 clearInterval 호출하여 메모리 누수 방지
        return () => clearInterval(intervalId);
      }, [])


    return (
      <div className="card-body">
        <form method="post" action="/HieVacation/vac">
          <input type="reset" value="신청취소" />

          {/* <!-- hidden 태그로 값 전달 --> */}
          <input type="hidden" name="command" value="CONFIRM" />

          <table>
            <tr>
                <td>
                    휴가구분
                        <select name="vacationtype" value={formData.vacationtype} onChange={handleChange}>
                        {/* <!-- -선택- 눌렀을 때 정보 안 넘어오는거 예외처리 --> */}
                        <option value=""> —선택— </option>
                        <option value="Monthly leave"> 월차 </option>
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
	        		<input type="date" name="startday" required onChange={handleChange}/> ~
	        		<input type="date" name="endday" required onChange={handleChange}/>
	        	</td>
                
                {/* 사용자가 기간 입력하면 계산해서 출력 */}
	        	<td>신청일수 {vacationDate}일</td>
	        </tr>

	      	<tr>
	        	<td>휴가 시작 / 종료시간
                    {/* 15분 단위로만 입력이 가능하게 */}
	            	<input type="time" 
                    name="startTime" 
                    value={formData.startTime} 	
                    min="09:00" 
                    max="18:00" 
                    step="900" 
                    onChange={handleChange}/> ~

                    {/* 종료시간 */}
	            	<input type="time" 
                    name="endTime" 
                    value={formData.endTime} 
                    min="09:00" 
                    max="18:00" 
                    step="900" 
                    onChange={handleChange}/>
	            </td>
            </tr>

                <td>신청시간
                    {/* 신청시간은 사용자가 별도로 입력 할 수 없다 */}
                    <input type="time" id="currentTime" name="currentTime"
                        value={formData.currentTime} 
                        style={{ width: '120px' }}
                        readOnly/>
                </td>

                <td>
                    첨부 파일 : <input type="file" />
                </td>

                <tr>
	                <td colspan='3'>휴가현황</td>
	            </tr>
	                <td colspan='3'>잔여휴가 0 일 0 시간</td>
	         	
                <td colspan='3'>
	                (비고)사유 : <textarea name="reason"
                        placeholder="휴가 사유를 입력하세요."></textarea>
				</td>
          </table>
          
          <input type="submit" onSubmit={submitHandler} value="신청완료" />
        
        </form>
        {/* <!-- 휴가신청란 끝 --> */}
      </div>
    );
  };
  
  export default VacationForm;