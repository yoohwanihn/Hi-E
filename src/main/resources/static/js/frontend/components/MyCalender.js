import React, { Component } from 'react';
// import FullCalendar from '@fullcalendar/react'; 일단 막아둠
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
import Axios from "axios";
import './Mycalendar.css'

/**
 * FullCalendar API 사용
 * npm 으로 설치해줘야함
 * npm install --save @fullcalendar/react @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/timegrid
 * npm install style-loader css-loader sass-loader node-sass --save
 * @param dateClick 날짜를 눌러서 일정등록 (현재는 날짜누르면 알림창만 구현함)
 * @param eventClick 일정 상세보기
 * @param sendEventToServer 일정을 axios로 서버에 보내는 메서드
 * @param events 일정
 * @returns 
 */

const MyCalendar = ()=> {
  const dateClick = (info) => {
    alert(info.dateStr)
  }

  const eventClick = (info) => {
    const eventTitle = info.event.title;
    alert(`Clicked on event: ${eventTitle}`);

    sendEventToServer(eventTitle);
  };

  const sendEventToServer = (eventTitle) => {
    Axios.post('/api/saveEventTitle', { eventTitle })
      .then(response => {
        console.log('Server response:', response.data);
      })
      .catch(error => {
        console.error('값이 넘어오지 않았습니다.', error);
      });
  }

  return( 
        <div className="App">
          {/* <FullCalendar 
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={'dayGridMonth'}
            headerToolbar={{
              start: 'today', 
              center: 'title',
              end: 'prev,next' 
            }}
            height={"85vh"}
            dateClick={dateClick}
            eventClick={eventClick}
            events={[
              { title: '창립기념일', date: '2023-12-10' },
              { title: '워크샵', date: '2023-12-24' }
          ]}

          // events: '/api/demo-feeds/events.json'
          /> */}
        </div>
    )
}
export default MyCalendar;