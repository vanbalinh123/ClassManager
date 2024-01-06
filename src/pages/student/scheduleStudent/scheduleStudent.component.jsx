import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useListInforClassQuery } from "../../../redux/api/teacher/class-information-api";
import { useListSchedulesQuery } from "../../../redux/api/leader/schedule-api.slice";

import { Page, Title } from "../../../generalCss/shared.styles";
import generalStyles from "../../../generalCss/general.styles";

import moment from "moment/moment";

const StudentSchedule = () => {
  const localizer = momentLocalizer(moment);

  const { data: listSchedule } = useListSchedulesQuery();
  const { data: listInfoClass } = useListInforClassQuery();
  const userCode = JSON.parse(localStorage.getItem("user_code"));

  const listClassofStudent =
    listInfoClass
      ?.filter((item) => item.students.includes(userCode))
      .map((item) => item.class_info) || [];

  const mySchedule =
    listSchedule?.filter((item) =>
      listClassofStudent.includes(item.class_code)
    ) || [];

  const events = mySchedule?.reduce((allEvents, schedule) => {
    const classEvents = schedule.class_sessions_set.map((session) => ({
      title: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
          }}
        >
          Mã lớp: {schedule.class_code}
          <br />
          Phòng: {session.room}
        </div>
      ),
      start: new Date(session.day + " " + session.start_time),
      end: new Date(session.day + " " + session.end_time),
    }));
    return [...allEvents, ...classEvents];
  }, []);

  // const events = [
  //   {
  //     title: "Sự kiện 1",
  //     start: new Date(2023, 10, 25, 7, 0),
  //     end: new Date(2023, 10, 25, 9, 30),
  //   },
  //   {
  //     title: "Sự kiện 2",
  //     start: new Date(2023, 10, 25, 19, 0),
  //     end: new Date(2023, 10, 25, 21, 0),
  //   },
  // ];

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: `${generalStyles.bgc}`,
        border: "none",
        padding: "10px",
        gap: "10px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
      },
    };
  };

  return (
    <Page>
      <Title style={{ paddingBottom: "30px" }}>Lịch học</Title>
      <Calendar
        style={{ flex: 1, minHeight: "90vh" }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        eventPropGetter={eventStyleGetter}
      />
    </Page>
  );
};

export default StudentSchedule;
