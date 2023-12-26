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

import {
  Div,
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
  DivBtn,
  Btn,
  DivInput,
  Input,
} from "./listStudent.styles";

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
      <Header>
        <TitleList style={{ flex: 0.5 }}>STT</TitleList>
        <TitleList>Mã học sinh</TitleList>
        <TitleList>Tên học sinh</TitleList>
        <TitleList style={{ flex: 0.5 }}>Vắng mặt</TitleList>
        {listTestsOfThisClass?.map((item, index) => {
          if (item.scores.length > 0) {
            return (
              <TitleList style={{ flex: 0.5 }} key={index}>
                {item.quiz_name}
              </TitleList>
            );
          }
        })}
      </Header>
      <Section>
        {infoClass?.students.map((usercode, index) => {
          const listScore = findListScoreOfSt(usercode);

          return (
            <DivItem onClick={() => handleItemClick(usercode)} key={index}>
              <Item style={{ flex: 0.5 }}>{index + 1}</Item>
              <Item>{usercode}</Item>
              <Item>{findStudent(usercode)?.full_name}</Item>
              <Item style={{ flex: 0.5 }}>{countAttendance(usercode)}</Item>
              {listScore.length > 0 &&
                listScore?.map((item2, index2) => (
                  <Item style={{ flex: 0.5 }} key={index2}>
                    {item2.score}
                  </Item>
                ))}
            </DivItem>
          );
        })}
      </Section>
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
      <ToastCtn />
    </Div>
  );
};

export default ListStudents;
