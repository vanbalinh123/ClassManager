import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useListInforClassQuery } from "../../../../../redux/api/teacher/class-information-api.js";
import { useListSchedulesQuery } from "../../../../../redux/api/leader/schedule-api.slice.js";
import { useListTeachersQuery } from "../../../../../redux/api/leader/list-users-api.slice.js";
import { useListParentsQuery } from "../../../../../redux/api/leader/list-users-api.slice.js";
import { useListStudentsQuery } from "../../../../../redux/api/leader/list-users-api.slice.js";

import Pagination from "../../../../../components/paginate/paginate.js";

import { ListClass } from "./listClassesOfChild.styles";
import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../../generalCss/shared.styles";

const ListClassOfChild = ({ listClasses }) => {
  const navigate = useNavigate();
  const { data: listParents } = useListParentsQuery();
  const { data: listClassInfo } = useListInforClassQuery();
  const { data: listSchedules } = useListSchedulesQuery();
  const { data: listTeachers } = useListTeachersQuery();
  const { data: listStudents } = useListStudentsQuery();
  const userCode = JSON.parse(localStorage.getItem("user_code"));

  const userCodes = listParents?.find(
    (item) => item.usercode === userCode
  )?.student;

  const arrayClassOfStudent =
    listClassInfo
      ?.filter((item) => userCodes?.some((code) => item.students.includes(code)))
      .map((item) => item.class_info) || [];

  const listClassOfStudent = listClasses?.filter((item) =>
    arrayClassOfStudent.includes(item.class_code)
  );

  const teacherMap = {};

  listSchedules?.forEach((item) => {
    teacherMap[item.class_code] = item.teacher_code;
  });

  const findTeacherName = (userCode) => {
    const foundTeacher = listTeachers?.find(
      (teacher) => teacher.usercode === userCode
    );

    return foundTeacher ? foundTeacher.full_name : null;
  };

  const findStudentInClass = (classCode) => {
    const listStdInCls = listClassInfo?.find(item => item.class_info === classCode)?.students;
    const student =  listStdInCls?.find(item => userCodes?.includes(item));
    const studentName = listStudents?.find(item => item.usercode === student)?.full_name
    
    return studentName;
  }

  const findStudentCodeInClass = (classCode) => {
    const listStdInCls = listClassInfo?.find(item => item.class_info === classCode)?.students;
    const student =  listStdInCls?.find(item => userCodes?.includes(item));
    return student
  }


  const handleItemClick = (classCode) => {
    const studentCode = findStudentCodeInClass(classCode);
    navigate(`/parents/listClassesOfChild/${studentCode}/${classCode}`);
  };

  //paginate
  const itemsPerPage = 10;
  const totalItems = listClassOfStudent?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const customListClasses = listClassOfStudent?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  //paginate

  return (
    <ListClass>
      <Header>
        <TitleList>Class Code</TitleList>
        <TitleList>Class Name</TitleList>
        <TitleList>Teacher Name</TitleList>
        {/* <TitleList>Course</TitleList> */}
        <TitleList>Student</TitleList>
      </Header>
      <Section>
        {customListClasses?.map((item, index) => (
          <DivItem onClick={() => handleItemClick(item.class_code)} key={index}>
            <Item>{item.class_code}</Item>
            <Item>{item.class_name}</Item>
            <Item>{findTeacherName(teacherMap[item.class_code])}</Item>
            {/* <Item>{item.course}</Item> */}
            <Item>{findStudentInClass(item.class_code)}</Item>
          </DivItem>
        ))}
      </Section>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </ListClass>
  );
};

export default ListClassOfChild;
