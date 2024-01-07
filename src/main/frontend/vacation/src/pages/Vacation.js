import VacationForm from "../components/VacationForm";

const Vacation = () => {
    return (
      <>
        {/* 여기에 현재 접속한 사원이름 출력과 연차현황 출력 */}
        <div class="d-sm-flex align-items-center justify-content-between mb-4"> 
          <h1 class="h3 mb-0 text-gray-800">휴가신청</h1> 
        </div>
          <h3>2023 (주)Acorn 인사팀 {}사원, 사용연차현황 </h3>
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
                <VacationForm />
              {/* 휴가신청을 하면 목록 컴퍼넌트가 여기에 와야함 */}
              {/* <input type="submit" class="btn btn-primary btn-icon-split" value="추가신청"/>
              <input type="submit" class="btn btn-success btn-icon-split" value="신청완료"/>
              <input type="submit" class="btn btn-danger btn-icon-split" value="삭제"/> */}
            </form> 
          </div>
        </div>
      </>
  );
}

export default Vacation;