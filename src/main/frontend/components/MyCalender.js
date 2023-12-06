import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Mycalendar.css'

class MyCalendar extends Component {
    render() {
        return (
          <div className="App">
            <FullCalendar 
              defaultView="dayGridMonth" 
              plugins={[ dayGridPlugin ]}
              events={[
                { title: 'event 1', date: '2023-12-10' },
                { title: 'event 2', date: '2023-12-24' }
            ]}
            />
          </div>
        );
    }
}
export default MyCalendar;