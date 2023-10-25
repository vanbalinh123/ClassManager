import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Page, Title } from "../../../generalCss/shared.styles";
import generalStyles from "../../../generalCss/general.styles";

import moment from "moment/moment";

const StudentSchedule = () => {
    const localizer = momentLocalizer(moment);
  
    const events = [
      {
        title: "Sự kiện 1",
        start: new Date(2023, 10, 25, 7, 0),
        end: new Date(2023, 10, 25, 9, 30),
      },
      {
        title: "Sự kiện 2",
        start: new Date(2023, 10, 25, 19, 0),
        end: new Date(2023, 10, 25, 21, 0),
      },
    ];
  
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
        <Title style={{paddingBottom: '30px'}}>Schedule</Title>
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
  
  export default StudentSchedule;