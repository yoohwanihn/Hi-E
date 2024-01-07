import './App.css';
import CalendarPage from '../src/pages/CalendarPage'

const App = () => {
  // useEffect(()=>{
  //   axios.get('http://localhost:8484/api/event')
  //   .then(response => setMessage(response.data))
  // })
  
  return (
    <div>
    	<CalendarPage/>
    </div>
  );
}

/* 정석방법
<div>
      <BrowserRouter>
        <AuthProvider>
          <HttpHeadersProvider>
            <Header />
            	<Nav /> 
            <Main />
            <Footer />
          </HttpHeadersProvider>
        </AuthProvider>
      </BrowserRouter>
</div>
*/

export default App;
