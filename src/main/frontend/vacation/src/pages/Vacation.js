import VacationForm from "components/VacationForm";

const Vacation = () => {
  return (
    <div className="container mt-5"> 
      <div className="card mt-4">
        <div className="card-header">
          <h5>휴가신청</h5>
        </div>
        <div className="card-body">
          <VacationForm />
        </div>
      </div>
    </div>
  );
}

export default Vacation;