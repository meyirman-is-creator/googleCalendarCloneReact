import './App.css';
import React,{useState,useContext, useEffect} from 'react';
import {getMonth} from './util'
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import EventModal from './components/EventModal';
import GlobalContext from './context/GlobalContext';
function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {monthIndex, showEventModal} = useContext(GlobalContext);
  useEffect(()=>{
    setCurrentMonth(getMonth(monthIndex))
  },[monthIndex]);
  return (
    
    <React.Fragment>
      {showEventModal && <EventModal/>}
      <div className='h-screen flex flex-col'>
        <CalendarHeader/>
        <div className="flex flex-1">
          <Sidebar/>
          <Month month = {currentMonth}/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
