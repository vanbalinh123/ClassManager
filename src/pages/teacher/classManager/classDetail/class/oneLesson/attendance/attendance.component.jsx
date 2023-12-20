import { RiSaveLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInforClassQuery } from "../../../../../../../redux/api/teacher/class-information-api";
import { useListStudentsQuery } from "../../../../../../../redux/api/leader/list-users-api.slice";
import { useListLessonContentsQuery } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import { useUpdateLessonContentMutation } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import { ToastCtn, toastSuccess, toastError } from "../../../../../../../components/toast/toast";

import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../../../../generalCss/shared.styles";

import { PageAttendance, Span, Input, DivBtn, Btn } from "./attendance.styles";

const Attendance = () => {
  const { idSession, classCode } = useParams();
  const [attendanceValues, setAttendanceValues] = useState([]);

  const { data: infoClass } = useInforClassQuery(classCode);
  const { data: listStudent } = useListStudentsQuery();
  const { data: listLessonContent } = useListLessonContentsQuery();
  const [ updateLessonContent ] = useUpdateLessonContentMutation();

  const lessonToday = listLessonContent?.find(
    (item) => item.class_session === Number(idSession)
  );

  useEffect(() => {
    if (lessonToday && lessonToday.Attendance_set.length !== 0) {
      const initialAttendanceValues = lessonToday.Attendance_set.map(
        (item) => ({
          student: item.student,
          is_present: item.is_present,
          date: lessonToday.class_session,
          lesson: lessonToday.id,
        })
      );
      setAttendanceValues(initialAttendanceValues);
    } else {
      setAttendanceValues([]);
    }
  }, [lessonToday]);

  const findStudent = (userCode) => {
    return listStudent?.find((item) => item.usercode === userCode);
  };

  const handleAttendanceChange = (usercode, value) => {
    setAttendanceValues((prevValues) => {
      const newAttendanceValues = [...prevValues];

      const existingIndex = newAttendanceValues.findIndex(
        (item) => item.student === usercode
      );

      if (existingIndex !== -1) {
        newAttendanceValues[existingIndex].is_present = value;
      } else {
        newAttendanceValues.push({
          student: usercode,
          is_present: value,
          date: lessonToday?.class_session,
          lesson: lessonToday?.id,
        });
      }

      return newAttendanceValues;
    });
  };

  const handleSubmitAttendance = async () => {
    if (attendanceValues.length !== infoClass?.students.length) {
      return toastError('Not enough students have been enrolled!')
    }

    const data = {
      class_info: lessonToday?.class_info,
      class_session: lessonToday?.class_session,
      content: lessonToday?.content,
      id: lessonToday?.id,
      Attendance_set: attendanceValues,
    };

    try {
      const response = await updateLessonContent(data);
      toastSuccess('Attendance successful!!')
    } catch (err) {
      toastError('Attendance failed!!')
    }
  };

  const handleUpdateAttendance = async () => {
    const data = {
      class_info: lessonToday?.class_info,
      class_session: lessonToday.class_session,
      content: lessonToday?.content,
      id: lessonToday?.id,
      Attendance_set: attendanceValues,
    };

    try {
      const response = await updateLessonContent(data);
      toastSuccess('Attendance updated successful!!')
    } catch (err) {
      toastError('Attendance updated failed!!')
    }
  }

  return (
    <PageAttendance>
      <Header>
        <TitleList style={{ flex: "0.5" }}>Index</TitleList>
        <TitleList>Student Code</TitleList>
        <TitleList>Student Name</TitleList>
        <TitleList style={{ display: "flex", justifyContent: "center" }}>
          <Span>Present</Span>
          <Span>Absent</Span>
        </TitleList>
      </Header>
      <Section>
        {infoClass?.students.map((usercode, index) => (
          <DivItem key={index}>
            <Item style={{ flex: "0.5" }}>{index + 1}</Item>
            <Item>{usercode}</Item>
            <Item>{findStudent(usercode).full_name}</Item>
            <Item style={{ display: "flex", justifyContent: "center" }}>
              <Input
                type="radio"
                name={`attendance_${usercode}`}
                style={{ flex: "1" }}
                value="present"
                checked={attendanceValues.some(
                  (item) =>
                    item.student === usercode && item.is_present === "present"
                )}
                onChange={() => handleAttendanceChange(usercode, "present")}
              />
              <Input
                type="radio"
                name={`attendance_${usercode}`}
                style={{ flex: "1" }}
                value="absent"
                checked={attendanceValues.some(
                  (item) =>
                    item.student === usercode && item.is_present === "absent"
                )}
                onChange={() => handleAttendanceChange(usercode, "absent")}
              />
            </Item>
          </DivItem>
        ))}
        <DivBtn>
          {(lessonToday?.Attendance_set.length === 0 && (
            <Btn onClick={handleSubmitAttendance}>
              <RiSaveLine size="15px" />
              Save
            </Btn>
          )) || (
            <Btn onClick={handleUpdateAttendance}>
              <RiSaveLine size="15px" />
              Update
            </Btn>
          )}
        </DivBtn>
      </Section>
      <ToastCtn />
    </PageAttendance>
  );
};

export default Attendance;
