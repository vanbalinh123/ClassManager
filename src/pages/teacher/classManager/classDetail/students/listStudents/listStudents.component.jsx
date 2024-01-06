import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useListStudentsQuery } from "../../../../../../redux/api/leader/list-users-api.slice";
import { useInforClassQuery } from "../../../../../../redux/api/teacher/class-information-api";
import { useUpdateInfoClassMutation } from "../../../../../../redux/api/teacher/class-information-api";
import { useListLessonContentsQuery } from "../../../../../../redux/api/teacher/lesson-content-api.slice";
import { useListAttendanceQuery } from "../../../../../../redux/api/teacher/attendance-api.slice";
import {
  toastSuccess,
  ToastCtn,
  toastError,
  toastWarn,
} from "../../../../../../components/toast/toast";
import { useListTestsQuery } from "../../../../../../redux/api/teacher/test-api";

import StudentDetail from "./studentDetail/studentDetail.component";

import { Div, DivBtn, Btn, DivInput, Input } from "./listStudent.styles";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../../generalCss/table.styles";
import * as XLSX from "xlsx";

const ListStudents = () => {
  const [detail, setDetail] = useState(false);
  const { classCode } = useParams();
  const [studentCode, setStudentCode] = useState("");
  const [studentDetail, setStudentDetail] = useState(null);
  const { data: infoClass } = useInforClassQuery(classCode);
  const [updateInfoClass] = useUpdateInfoClassMutation();
  const { data: listStudent } = useListStudentsQuery();
  const { data: listTests } = useListTestsQuery();
  const { data: listLessonContent } = useListLessonContentsQuery();
  const { data: listAttendance } = useListAttendanceQuery();

  const listTestsOfThisClass = listTests?.filter(
    (item) => item.class_info === classCode
  );
  const findStudent = (userCode) => {
    return listStudent?.find((item) => item.usercode === userCode);
  };

  const listLessonOfClass = listLessonContent?.filter(
    (item) => item.class_info === classCode
  );
  const countAttendance = (usercode) => {
    let sum = 0;
    let arrID = [];
    listLessonOfClass?.forEach((item) => arrID.push(item.id));
    const listAttendanceOfClass = listAttendance?.filter((item) =>
      arrID.includes(item.lesson)
    );

    listAttendanceOfClass?.forEach((item) => {
      if (item.student === usercode && item.is_present === "absent") sum += 1;
    });

    return sum;
  };

  const findListScoreOfSt = (usercode) => {
    let arr = [];
    listTestsOfThisClass?.map((item) => {
      const student = item.scores.find((item2) => item2.student === usercode);
      if (student) {
        arr.push(student);
      }
    });
    return arr;
  };

  const handleItemClick = (usercode) => {
    setStudentDetail(findStudent(usercode));
    setDetail(true);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      infoClass.students.map((usercode, index) => {
        const listScore = findListScoreOfSt(usercode);

        const row = {
          "STT": index + 1,
          "Mã lớp": classCode, 
          "Mã học sinh": usercode,
          "Tên học sinh": findStudent(usercode)?.full_name,
          "Vắng mặt": countAttendance(usercode),
        };

        listTestsOfThisClass?.forEach((test, testIndex) => {
          const score = listScore.find(
            (item) => item.test_and_quiz === test.id
          );
          row[test.quiz_name] = score ? score.score : "#";
        });

        return row;
      })
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Students");
    XLSX.writeFile(wb, `Kết quả học tập lớp ${classCode}.xlsx`);
  };

  return (
    <Div>
      <StudentDetail
        detail={detail}
        setDetail={setDetail}
        studentDetail={studentDetail}
        infoClass={infoClass}
        updateInfoClass={updateInfoClass}
        toastSuccess={toastSuccess}
        toastError={toastError}
        countAttendance={countAttendance}
        findListScoreOfSt={findListScoreOfSt}
        listTestsOfThisClass={listTestsOfThisClass}
        listLessonOfClass={listLessonOfClass}
        listAttendance={listAttendance}
      />
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th style={{ flex: 0.5 }}>STT</Th>
              <Th>Mã học sinh</Th>
              <Th>Tên học sinh</Th>
              <Th style={{ flex: 0.5 }}>Vắng mặt</Th>
              {listTestsOfThisClass?.map((item, index) => (
                <Th style={{ flex: 0.5 }} key={index}>
                  {item.quiz_name}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {infoClass?.students.map((usercode, index) => {
              const listScore = findListScoreOfSt(usercode);

              return (
                <tr onClick={() => handleItemClick(usercode)} key={index}>
                  <Td style={{ flex: 0.5 }}>{index + 1}</Td>
                  <Td>{usercode}</Td>
                  <Td>{findStudent(usercode)?.full_name}</Td>
                  <Td style={{ flex: 0.5 }}>{countAttendance(usercode)}</Td>
                  {listTestsOfThisClass?.map((test, testIndex) => {
                    const score = listScore.find(
                      (item) => item.test_and_quiz === test.id
                    );

                    return (
                      <Td style={{ flex: 0.5 }} key={testIndex}>
                        {score ? (
                          score.score
                        ) : (
                          <span style={{ color: "red" }}>#</span>
                        )}
                      </Td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>
      <DivBtn>
        <Btn onClick={handleExportToExcel}>
          Xuất Excel
        </Btn>
      </DivBtn>
      <ToastCtn />
    </Div>
  );
};

export default ListStudents;
