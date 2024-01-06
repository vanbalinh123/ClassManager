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

import { PageAttendance, Input, DivBtn, Btn } from "./attendance.styles";

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

  console.log("lesson TOday", lessonToday);

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
          // lesson: lessonToday?.id,
        });
      }
      console.log("abc", newAttendanceValues);
      return newAttendanceValues;
    });
  };

  useEffect(() => {
    if (lessonToday && lessonToday.Attendance_set.length !== 0) {
      const initialAttendanceValues = lessonToday.Attendance_set.map(
        (item) => ({
          student: item.student,
          is_present: item.is_present,
          date: lessonToday.class_session,
          // lesson: lessonToday.id,
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

  const handleSubmitAttendance = async () => {
    if (attendanceValues.length !== infoClass?.students.length) {
      return toastError("Không được để trống");
    }
    
    const formData = new FormData();

    formData.append("class_info", lessonToday?.class_info);
    formData.append("class_session", lessonToday?.class_session);
    formData.append("content", lessonToday?.content);
    formData.append("id", lessonToday?.id);

    attendanceValues.forEach((item, index) => {
      formData.append(`Attendance_set[${index}][student]`, item.student);
      formData.append(`Attendance_set[${index}][is_present]`, item.is_present);
      formData.append(`Attendance_set[${index}][date]`, item.date);
      // formData.append(`Attendance_set[${index}][lesson]`, item.lesson);
    });

    formData.append("File", lessonToday?.File);

    const convertToJSON = (formData) => {
      const jsonData = [];
      for (var pair of formData.entries()) {
        const [key, value] = pair;
        const match = key.match(/Attendance_set\[(\d+)\]\[([^\]]+)\]/);

        if (match) {
          const index = match[1];
          const property = match[2];

          if (!jsonData[index]) {
            jsonData[index] = {};
          }

          jsonData[index][property] = value;
        }
      }
      return jsonData;
    };
    console.log("FormData as JSON: ", convertToJSON(formData));

    try {
      const response = await updateLessonContent(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("ádasd", response);
      toastSuccess("Điểm danh thành công");
    } catch (err) {
      toastError("Điểm danh thất bại");
    }
  };

  const handleUpdateAttendance = async () => {
    const formData = new FormData();

    formData.append("class_info", lessonToday?.class_info);
    formData.append("class_session", lessonToday?.class_session);
    formData.append("content", lessonToday?.content);
    formData.append("id", lessonToday?.id);

    attendanceValues.forEach((item, index) => {
      formData.append(`Attendance_set[${index}][student]`, item.student);
      formData.append(`Attendance_set[${index}][is_present]`, item.is_present);
      formData.append(`Attendance_set[${index}][date]`, item.date);
      formData.append(`Attendance_set[${index}][lesson]`, item.lesson);
    });

    lessonToday?.File.forEach((file, index) => {
      formData.append(`File[${index}][file]`, file.file);
      formData.append(`File[${index}][lesson]`, file.lesson);
    });

    try {
      const response = await updateLessonContent(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toastSuccess("Cập nhật thành công");
    } catch (err) {
      toastError("Cập nhật thất bại");
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
