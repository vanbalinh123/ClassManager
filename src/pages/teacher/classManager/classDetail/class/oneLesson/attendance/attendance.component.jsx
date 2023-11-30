import { RiSaveLine } from "react-icons/ri";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useInforClassQuery } from "../../../../../../../redux/api/teacher/class-information-api";
import { useListStudentsQuery } from "../../../../../../../redux/api/leader/list-users-api.slice";

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

  const findStudent = (userCode) => {
    return listStudent?.find((item) => item.usercode === userCode);
  };

  const handleAttendanceChange = (usercode, value) => {
    setAttendanceValues((prevValues) => {
      const newAttendanceValues = [...prevValues];

      const existingIndex = newAttendanceValues.findIndex(
        (item) => item.usercode === usercode
      );

      if (existingIndex !== -1) {
        newAttendanceValues[existingIndex].status = value;
      } else {
        newAttendanceValues.push({ usercode, status: value });
      }

      return newAttendanceValues;
    });
  };

  console.log(attendanceValues);

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
                    item.usercode === item.usercode && item.status === "present"
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
                    item.usercode === item.usercode && item.status === "absent"
                )}
                onChange={() => handleAttendanceChange(usercode, "absent")}
              />
            </Item>
          </DivItem>
        ))}
        <DivBtn>
          <Btn>
            <RiSaveLine size="15px" />
            Save
          </Btn>
        </DivBtn>
      </Section>
    </PageAttendance>
  );
};

export default Attendance;
