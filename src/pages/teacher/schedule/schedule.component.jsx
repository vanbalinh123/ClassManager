import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useListSchedulesQuery } from "../../../redux/api/leader/schedule-api.slice";

import { Page, Title } from "../../../generalCss/shared.styles";
import generalStyles from "../../../generalCss/general.styles";

import moment from "moment";

const TeacherSchedule = () => {
  const localizer = momentLocalizer(moment);
  const userCode = JSON.parse(localStorage.getItem("user_code"));

  const {data: listSchedule} = useListSchedulesQuery();
  
  const mySchedule = listSchedule?.filter(item => item.teacher_code === userCode);

  console.log(mySchedule)

  // const events = [
  //   {
  //     title: "Sự kiện 1",
  //     start: new Date(2023, 8, 24, 7, 0),
  //     end: new Date(2023, 8, 24, 9, 30),
  //   },
  //   {
  //     title: "Sự kiện 2",
  //     start: new Date(2023, 8, 24, 19, 0),
  //     end: new Date(2023, 8, 24, 21, 0),
  //   },
  // ];

  const events = mySchedule?.reduce((allEvents, schedule) => {
    const classEvents = schedule.class_sessions_set.map(session => ({
      title: `${schedule.class_code} - ${session.room}`,
      start: new Date(session.day + ' ' + session.start_time),
      end: new Date(session.day + ' ' + session.end_time),
    }));
    return [...allEvents, ...classEvents];
  }, []);

  console.log(mySchedule)

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: `${generalStyles.bgc}`,
        border: 'none',
        padding: '10px',
        gap: '10px',
      },
    };
  };

  return (
    <Page>
      <Title style={{paddingBottom: '30px'}}>Lịch dạy</Title>
      <Calendar
        style={{ flex: 1, minHeight: "90vh" }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        eventPropGetter={eventStyleGetter}
        
      />
    </Page>
  );
};

export default TeacherSchedule;
