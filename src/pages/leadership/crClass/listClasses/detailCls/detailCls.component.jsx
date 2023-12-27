import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useListStudentsQuery } from "../../../../../redux/api/leader/list-users-api.slice";
import { useInforClassQuery } from "../../../../../redux/api/teacher/class-information-api";
import { useUpdateInfoClassMutation } from "../../../../../redux/api/teacher/class-information-api";
import { useListLessonContentsQuery } from "../../../../../redux/api/teacher/lesson-content-api.slice";
import { useListAttendanceQuery } from "../../../../../redux/api/teacher/attendance-api.slice";
import { useListTestsQuery } from "../../../../../redux/api/teacher/test-api";

import {
  ToastCtn,
  toastError,
  toastWarn,
  toastSuccess,
} from "../../../../../components/toast/toast";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../generalCss/table.styles";

import { Page, Title } from "../../../../../../src/generalCss/shared.styles";

import StudentDetail from "../../../../teacher/classManager/classDetail/students/listStudents/studentDetail/studentDetail.component";

import {
  Div,
  DivBtn,
  Btn,
  DivInput,
  Input,
} from "./detailCls.styles";

const DetailCls = () => {
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

  const handleAddNewStudent = async () => {
    if (!studentCode) {
      toastError("Please enter a student code.");
      return;
    }

    const checkExist = infoClass.students.find((item) => item === studentCode);

    if (checkExist) {
      toastWarn("Students attended class!");
      return;
    }

    const newListStudent = [...infoClass.students, studentCode];

    const dataUpdate = {
      class_info: infoClass.class_info,
      Teachers: infoClass.Teachers,
      students: newListStudent,
    };
    const response = await updateInfoClass(dataUpdate);
    if (response.data) {
      setStudentCode("");
      findStudent(studentCode);
      toastSuccess("The student has been successfully added to the class!!");
      return;
    }

    if (response.error) {
      toastError("Student code does not exist.");
      return;
    }
  };

  return (
    <Page>
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
      <Title>Chi tiết lớp học {classCode}</Title>
      <DivBtn>
        <DivInput>
          <Input
            placeholder="Nhập mã học sinh..."
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
          />
        </DivInput>
        <Btn onClick={() => handleAddNewStudent()}>
          <AiOutlineUserAdd size="15px" />
          Thêm
        </Btn>
      </DivBtn>
      <Div>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th style={{ flex: 0.5 }}>STT</Th>
                <Th>Mã học sinh</Th>
                <Th>Tên học sinh</Th>
                <Th style={{ flex: 0.5 }}>Vắng mặt</Th>
                {listTestsOfThisClass?.map((item, index) => {
                  if (item.scores.length > 0) {
                    return (
                      <Th style={{ flex: 0.5 }} key={index}>
                        {item.quiz_name}
                      </Th>
                    );
                  }
                })}
              </tr>
            </thead>
            <tbody>
              {infoClass?.students.map((usercode, index) => {
                const listScore = findListScoreOfSt(usercode);

                return (
                  <tr
                    onClick={() => handleItemClick(usercode)}
                    key={index}
                  >
                    <Td style={{ flex: 0.5 }}>{index + 1}</Td>
                    <Td>{usercode}</Td>
                    <Td>{findStudent(usercode)?.full_name}</Td>
                    <Td style={{ flex: 0.5 }}>
                      {countAttendance(usercode)}
                    </Td>
                    {listScore.length > 0 &&
                      listScore?.map((item2, index2) => (
                        <Td style={{ flex: 0.5 }} key={index2}>
                          {item2.score}
                        </Td>
                      ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableWrapper>
        <ToastCtn />
      </Div>
    </Page>
  );
};

export default DetailCls;
