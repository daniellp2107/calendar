import { useState } from 'react';
import { Calendar} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar, CalendarEvent, CalendarModal } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
  const {openDateModal} = useUiStore();
  const {events, setActiveEvent,} = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  
  const eventStyleGetter = (event, start, end, isSelected)=>{
    // console.log(event, start, end, isSelected);

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity:0.8,
      color:'white'
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    // console.log({doubleClick: event});
    openDateModal();
  };
  
  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    console.log({viewChanged: event});
  }
  
  
  return (
    <>
      <Navbar />

      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />

    <CalendarModal />
    </>
  );
};