import React , { useState, useEffect }from 'react';
// import '../../utils/css/sb-admin-2.css';

const Attendance = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    // useEffect를 사용하여 현재 시간을 갱신합니다.
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        // 컴포넌트가 언마운트되면 clearInterval을 호출하여 setInterval을 정리합니다.
        return () => clearInterval(intervalId);
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 합니다.
    
    const handleClockIn = () => {
        // 출근 기능을 수행할 코드를 추가합니다.
        console.log('출근했습니다.');
    };

    const handleClockOut = () => {
        // 퇴근 기능을 수행할 코드를 추가합니다.
        console.log('퇴근했습니다.');
    };

    return (
        <>
            {/* 여기에 현재 접속한 사원이름 출력과 연차현황 출력 */}
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">출퇴근/근태현황</h1>
            </div>
            <div class="col-xl-8 col-lg-5">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">출퇴근 시스템</h6>
                    </div>
                    <div class="card-body">
                        <div>
                            <header>
                                <div>
                                    <h1>현재 시간: {currentTime.toLocaleTimeString()}</h1>
                                    <button onClick={handleClockIn}>출근하기</button><br/>
                                    <button onClick={handleClockOut}>퇴근하기</button>
                                </div>
                            </header>
                            {/* 나머지 컴포넌트 및 내용을 추가하세요. */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Attendance;
