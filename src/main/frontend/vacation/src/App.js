import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from 'components/layout/nav'
import CalendarPage from 'pages/CalendarPage'
import 'styles/Font.css'
import Vacation from 'pages/Vacation';

const App = () => {
  // useEffect(()=>{
  //   axios.get('http://localhost:8484/api/event')
  //   .then(response => setMessage(response.data))
  // })
  
  return (
    <div className='App'>
      <BrowserRouter>
        {/* <Header /> */}
          <Nav /> 
          <Routes>
            {/* <Route path="/" element={<Main/>}></Route> */}
            <Route path="/calendar" element={<CalendarPage/>}></Route>
            <Route path="/vacation" element={<Vacation/>}></Route>
            {/* <Route path="/vacation" element={<Vacation/>}></Route> 휴가 리스트 페이지*/}
          </Routes>
            {/* <Main /> */}
        {/* <Footer /> */}
      </BrowserRouter>
  </div>
  );
}




export default App;
