import { RiSaveLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInforClassQuery } from "../../../../../../../redux/api/teacher/class-information-api";
import { useListStudentsQuery } from "../../../../../../../redux/api/leader/list-users-api.slice";
import { useListLessonContentsQuery } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import { useUpdateLessonContentMutation } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import {
  ToastCtn,
  toastSuccess,
  toastError,
} from "../../../../../../../components/toast/toast";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../../../generalCss/table.styles";

import { PageAttendance, Span, Input, DivBtn, Btn } from "./attendance.styles";

const Attendance = () => {
  const { idSession, classCode } = useParams();
  const [attendanceValues, setAttendanceValues] = useState([]);

  const { data: infoClass } = useInforClassQuery(classCode);
  const { data: listStudent } = useListStudentsQuery();
  const { data: listLessonContent } = useListLessonContentsQuery();
  const [updateLessonContent] = useUpdateLessonContentMutation();

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
      return toastError("Not enough students have been enrolled!");
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
      toastSuccess("Attendance successful!!");
    } catch (err) {
      toastError("Attendance failed!!");
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
      toastSuccess("Attendance updated successful!!");
    } catch (err) {
      toastError("Attendance updated failed!!");
    }
  };

  return (
    <PageAttendance>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>STT</Th>
              <Th>Mã học sinh</Th>
              <Th>Tên học sinh</Th>
              <Th>Hiện diện</Th>
              <Th>Vắng Mặt</Th>
            </tr>
          </thead>
          <tbody>
            {infoClass?.students.map((usercode, index) => (
              <tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{usercode}</Td>
                <Td>{findStudent(usercode).full_name}</Td>
                <Td>
                  <Input
                    type="radio"
                    name={`attendance_${usercode}`}
                    style={{ flex: "1" }}
                    value="present"
                    checked={attendanceValues.some(
                      (item) =>
                        item.student === usercode &&
                        item.is_present === "present"
                    )}
                    onChange={() => handleAttendanceChange(usercode, "present")}
                  />
                </Td>
                <Td>
                  <Input
                    type="radio"
                    name={`attendance_${usercode}`}
                    style={{ flex: "1" }}
                    value="absent"
                    checked={attendanceValues.some(
                      (item) =>
                        item.student === usercode &&
                        item.is_present === "absent"
                    )}
                    onChange={() => handleAttendanceChange(usercode, "absent")}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <DivBtn>
        {(lessonToday?.Attendance_set.length === 0 && (
          <Btn onClick={handleSubmitAttendance}>
            <RiSaveLine size="15px" />
            Lưu
          </Btn>
        )) || (
          <Btn onClick={handleUpdateAttendance}>
            <RiSaveLine size="15px" />
            Cập nhật
          </Btn>
        )}
      </DivBtn>
      <ToastCtn />
    </PageAttendance>
  );
};

export default Attendance;
