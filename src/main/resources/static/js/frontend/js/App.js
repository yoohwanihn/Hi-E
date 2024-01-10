import MyCalendar from "./components/MyCalender";
import VacationForm from "./components/vacationForm";
import Footer from "./inc/footer";
import Sidebar from "./inc/sidebar";
import Topbar from "./inc/topbar";
import './utils/css/sb-admin-2.css';

function App() {
  return (
    <div id="wrapper">
        
        {/* 여기에 sidebar 컴포넌트를 렌더링하는 코드 추가 */}
          <Sidebar />
        
        {/* 여기에 content-wrapper와 topbar 컴포넌트를 렌더링하는 코드 추가 */}
        <div id="content-wrapper" class="d-felx flex-column">
        
        {/* User Information 에 이름 출력하게하기 */}
        <div>
          <Topbar />
        </div>
        
        {/* 여기에 현재 접속한 사원이름 출력과 연차현황 출력 */}
        <h3>2023 (주)Acorn 인사팀 {}사원, 사용연차현황</h3>
      
      <div className="container-fluid">

        {/* Calendar 컴포넌트 추가   */}
            <MyCalendar />
        
        <h1 className="h3 mb-0 text-gray-800">휴가신청</h1>
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
              <VacationForm />
              <hr/>
              <input type="submit" class="btn btn-primary btn-icon-split" value="추가신청"/>
              <input type="submit" class="btn btn-success btn-icon-split" value="신청완료"/>
              <input type="submit" class="btn btn-danger btn-icon-split" value="삭제"/>
            </form> 
          </div>
          <br/><br/>
          {/* 여기에 application 컴포넌트를 렌더링하는 코드 추가 */}
        </div>
            <div>
              <Footer />
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
