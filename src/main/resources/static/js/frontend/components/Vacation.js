import VacationForm from "../components/Vacation&Calendar/vacationForm";
import MyCalendar from "../components/Vacation&Calendar/MyCalender";
import Layout from "../components/Layout";

const Vacation = () => {
    return (
      <Layout>
        <div id="page-top">
          <div id="wrapper">

            {/* 여기에 content-wrapper와 topbar 컴포넌트를 렌더링하는 코드 추가 */}
            <div id="content-wrapper" class="d-felx flex-column">
            
            {/* User Information 에 이름 출력하게하기 */}
            
          <div className="container-fluid">
            {/* 여기에 현재 접속한 사원이름 출력과 연차현황 출력 */}
            <div class="d-sm-flex align-items-center justify-content-between mb-4"> 
              <h1 class="h3 mb-0 text-gray-800">휴가신청</h1> 
            </div>
              
              <h3>2023 (주)Acorn 인사팀 {}사원, 사용연차현황 </h3>
    
            {/* Calendar 컴포넌트 추가   */}
              <div class="col-xl-8 col-md-10">
                    <MyCalendar />
              </div>
            
            <div className="row">
              <div className="col-xl-8 col-lg-7">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary"> 신청정보 </h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form method="post" action="/HieVacation/vac">
                  <h1 className="h3 mb-0 text-gray-800">휴가신청</h1>
                    
                    {/* 휴가 신청 양식 컴퍼넌트 */}
                    <VacationForm />
    
                  {/* 휴가신청을 하면 목록 컴퍼넌트가 여기에 와야함 */}
    
                  <input type="submit" class="btn btn-primary btn-icon-split" value="추가신청"/>
                  <input type="submit" class="btn btn-success btn-icon-split" value="신청완료"/>
                  <input type="submit" class="btn btn-danger btn-icon-split" value="삭제"/>

                </form> 
              </div>
              <br/><br/>
              {/* 여기에 application 컴포넌트를 렌더링하는 코드 추가 */}
            </div>
          </div>
          {/* container fluid 끝 */}
        </div>
        {/* content wrapper 끝 */}
      </div>
      {/* wrapper 끝 */}
    </div>
  </Layout> 
  );
}

export default Vacation;