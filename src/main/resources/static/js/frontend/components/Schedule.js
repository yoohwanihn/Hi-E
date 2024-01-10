import MyCalendar from "../components/Vacation&Calendar/MyCalender";
import Layout from "../components/Layout";
// import '../utils/css/sb-admin-2.css'; // 기존 hie CSS

/**
 * 일정관리 페이지
 * 아직 일정등록은 기능 구현 전
 */

const Schedule = () => {
  // const [event, setEvent] = useState("");

  // useEffect(()=>{
  //   axios.post("/api/events").then((response)=>{
  //       console.log(response.data);
  //       setEvent(response.data)
  //     }
  //   );
  // }, []);
  

  return (
    <Layout >
      <div id="page-top">
        <div id="wrapper">

          {/* 여기에 sidebar 컴포넌트를 렌더링하는 코드 추가
            <Sidebar /> */}
          
          {/* 여기에 content-wrapper와 topbar 컴포넌트를 렌더링하는 코드 추가 */}
          <div id="content-wrapper" class="d-felx flex-column">
            
          {/* User Information 에 이름 출력하게하기 */}
          {/* <div id="content">
            <Topbar />
          </div> */}
          
        <div className="container-fluid">
          {/* 여기에 현재 접속한 사원이름 출력과 연차현황 출력 */}
          <div class="d-sm-flex align-items-center justify-content-between mb-4"> 
            <h1 class="h3 mb-0 text-gray-800">일정관리</h1> 
          </div>

          {/* Calendar 컴포넌트 추가   */}
          <div class="row">
              <div class="col-xl-8 col-lg-7">
                <MyCalendar />
              </div>

          <div class="col-xl-4 col-lg-5">
            <div class="card shadow mb-4">
              <div class="card-body">일정등록</div>
            </div>
          </div>

            <br/><br/>
          </div>
          {/* row 클래스 끝 */}
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

export default Schedule;
