import MyCalendar from "components/MyCalender";
import 'styles/basic.css';

const CalendarPage = () => {
  return (
    <div className="container mt-5"> 
      <div className="card mt-4">
        <div className="card-header">
          <h5>일정관리</h5>
        </div>
        <div className="card-body">
          <div className="col-md-12">  
            <MyCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
